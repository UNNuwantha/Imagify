import Stripe from 'stripe'
import userModel from '../models/userModel.js'
import Transaction from '../models/transactionModel.js'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY in server environment. Add it to your .env file.')
}

const stripe = new Stripe(stripeSecretKey)

const plans = {
  Basic: { price: 10, credits: 100 },
  Advanced: { price: 50, credits: 500 },
  Business: { price: 250, credits: 5000 },
}

export const createCheckoutSession = async (req, res) => {
  try {
    const { planId } = req.body
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    if (!planId || !plans[planId]) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' })
    }

    const plan = plans[planId]
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(plan.price * 100),
            product_data: {
              name: `${planId} Credit Pack`,
              description: `Buy ${plan.credits} credits for ${planId}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        planId,
        credits: plan.credits,
      },
      success_url: `${clientUrl}/buy?checkout_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/buy`,
    })

    res.json({ success: true, url: session.url })
  } catch (error) {
    console.error('Stripe checkout session error:', error)
    res.status(500).json({ success: false, message: 'Failed to create Stripe checkout session' })
  }
}

export const finalizeCheckout = async (req, res) => {
  try {
    const { sessionId } = req.body
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' })
    }

    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Missing session ID' })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || session.payment_status !== 'paid') {
      return res.status(400).json({ success: false, message: 'Payment not completed yet' })
    }

    const metadata = session.metadata || {}

    if (!metadata.userId || metadata.userId !== userId) {
      return res.status(403).json({ success: false, message: 'Session does not belong to this user' })
    }

    const planId = metadata.planId
    const credits = Number(metadata.credits || 0)
    const amount = Number(session.amount_total || 0) / 100

    if (!planId || credits <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid session metadata' })
    }

    const existingTransaction = await Transaction.findOne({ stripeSessionId: sessionId })

    if (existingTransaction) {
      const user = await userModel.findById(userId)
      return res.json({ success: true, message: 'Purchase already applied', creditBalance: user.creditBalance })
    }

    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    user.creditBalance += credits
    await user.save()

    await Transaction.create({
      userId,
      planId,
      credits,
      amount,
      stripeSessionId: sessionId,
      status: 'completed',
    })

    res.json({ success: true, message: 'Purchase completed', creditBalance: user.creditBalance })
  } catch (error) {
    console.error('Stripe checkout finalize error:', error)
    res.status(500).json({ success: false, message: 'Failed to finalize purchase' })
  }
}
