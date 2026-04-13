import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "motion/react"

const BuyCredit = () => {
  const [searchParams] = useSearchParams()
  const [loadingPlan, setLoadingPlan] = useState(null)
  const [checkoutProcessing, setCheckoutProcessing] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const [checkoutHandled, setCheckoutHandled] = useState(false)
  const navigate = useNavigate()

  const { user, createCheckoutSession, finalizeCheckout, setShowLogin } = useContext(AppContext)

  useEffect(() => {
    const success = searchParams.get('checkout_success')
    const sessionId = searchParams.get('session_id')

    if (success === 'true' && sessionId && !checkoutHandled) {
      setCheckoutHandled(true)
      setCheckoutProcessing(true)
      finalizeCheckout(sessionId).then((data) => {
        if (data?.success) {
          setCheckoutMessage('Purchased successfully')
        }
      }).finally(() => {
        setCheckoutProcessing(false)
        navigate('/buy', { replace: true })
      })
    }
  }, [searchParams, checkoutHandled, finalizeCheckout, navigate])

  const handlePurchase = async (planId) => {
    if (!user) {
      setShowLogin(true)
      return
    }

    setLoadingPlan(planId)
    const url = await createCheckoutSession(planId)
    setLoadingPlan(null)

    if (url) {
      window.location.href = url
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plans</h1>
      <div className='text-center mb-6'>
        <p className='text-gray-700'>Current credits: <strong>{user?.creditBalance ?? 0}</strong></p>
        {checkoutProcessing && <p className='text-sm text-blue-600 mt-2'>Finalizing purchase...</p>}
        {checkoutMessage && <p className='text-sm text-green-600 mt-2'>{checkoutMessage}</p>}
      </div>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'><span className='text-3xl font-medium'>${item.price}</span> / {item.credits} credits</p>
            <button
              onClick={() => handlePurchase(item.id)}
              disabled={loadingPlan === item.id}
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 disabled:opacity-50'
            >
              {user ? (loadingPlan === item.id ? 'Redirecting...' : 'Purchase') : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default BuyCredit
