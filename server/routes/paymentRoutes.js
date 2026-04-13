import express from 'express'
import userAuth from '../middlewares/auth.js'
import { createCheckoutSession, finalizeCheckout } from '../controllers/paymentController.js'

const paymentRouter = express.Router()

paymentRouter.post('/checkout-session', userAuth, createCheckoutSession)
paymentRouter.post('/checkout-success', userAuth, finalizeCheckout)

export default paymentRouter
