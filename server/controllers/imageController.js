import userModel from "../models/userModel.js"
import axios from "axios"

export const generateImage = async (req, res) => {
    try {

        const { prompt } = req.body
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' })
        }

        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Prompt is required' })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        const encodedPrompt = encodeURIComponent(prompt)
        const remoteImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`

        const response = await axios.get(remoteImageUrl, {
            responseType: 'arraybuffer',
            timeout: 30000
        })

        const contentType = response.headers['content-type'] || 'image/png'
        const base64Image = Buffer.from(response.data, 'binary').toString('base64')
        const resultImage = `data:${contentType};base64,${base64Image}`

        res.json({ success: true, message: "Image Generated", creditBalance: user.creditBalance, resultImage })

    } catch (error) {
        console.log('Image Generation Error:', error.message)
        console.log('Error Response:', error.response?.data)
        res.status(500).json({ success: false, message: 'Failed to generate image. Please try again.' })
    }
}


