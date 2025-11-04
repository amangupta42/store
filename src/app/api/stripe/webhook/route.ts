import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Extract metadata
        const {
          email,
          firstName,
          lastName,
          address,
          city,
          state,
          zipCode,
          items: itemsJson,
        } = paymentIntent.metadata

        // Parse cart items
        const items = JSON.parse(itemsJson)

        // Calculate totals (amount is in cents)
        const total = paymentIntent.amount / 100
        const subtotal = items.reduce(
          (sum: number, item: { price: number; quantity: number }) =>
            sum + item.price * item.quantity,
          0
        )
        const tax = total - subtotal

        // Create order in database
        const order = await prisma.order.create({
          data: {
            email,
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            subtotal,
            tax,
            total,
            status: 'paid',
            stripePaymentId: paymentIntent.id,
            items: {
              create: items.map(
                (item: {
                  id: string
                  name: string
                  price: number
                  quantity: number
                }) => ({
                  productId: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                })
              ),
            },
          },
          include: {
            items: true,
          },
        })

        // Decrement stock for each item
        for (const item of items) {
          await prisma.product.update({
            where: { id: item.id },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          })
        }

        console.log('Order created:', order.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('Payment failed:', paymentIntent.id)
        // You could create a failed order record here if needed
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
