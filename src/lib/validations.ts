import { z } from 'zod'

// Checkout form validation schema
export const checkoutFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  address: z.string().min(5, 'Please enter a valid address').max(200, 'Address is too long'),
  city: z.string().min(2, 'Please enter a valid city').max(100, 'City name is too long'),
  state: z.string().min(2, 'Please enter a valid state').max(50, 'State name is too long'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
})

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>

// Create payment intent request schema
export const createPaymentIntentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  email: z.string().email('Invalid email address'),
  metadata: z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    items: z.string(), // JSON string of cart items
  }),
})

export type CreatePaymentIntentData = z.infer<typeof createPaymentIntentSchema>
