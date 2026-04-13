import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

    useEffect(() => {
        if (token) {
            loadUserProfile()
        }
    }, [token])

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', {
                headers: { token }
            })

            if (data.success) {
                setUser(data.user)
            } else {
                localStorage.removeItem('token')
                setToken('')
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('token')
                setToken('')
            }
        }
    }

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

            if (data.success) {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
                toast.success('Login successful!')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
        }
    }

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

            if (data.success) {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
                toast.success('Registration successful!')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed')
        }
    }

    const logout = () => {
        setToken('')
        setUser(null)
        localStorage.removeItem('token')
        toast.success('Logged out successfully')
    }

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, {
                headers: { token }
            })

            if (data.success) {
                // Update user credit balance
                setUser(prev => prev ? { ...prev, creditBalance: data.creditBalance } : null)
                return data.resultImage
            } else {
                toast.error(data.message)
                return null
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Image generation failed')
            return null
        }
    }

    const value = {
        user, setUser, showLogin, setShowLogin,
        login, register, logout, generateImage, token
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider