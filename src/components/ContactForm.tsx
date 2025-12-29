import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import emailjs from '@emailjs/browser'
import { useState } from 'react'

// Client-side rate limiting (best-effort; not a security boundary)
// Policy: max 2 successful sends per 10 minutes, plus a 60s cooldown between successful sends.
const RATE_LIMIT_STORAGE_KEY = 'contact_form_success_timestamps_v1'
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_IN_WINDOW = 2
const COOLDOWN_MS = 60 * 1000

function safeReadTimestamps(): number[] {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((n) => typeof n === 'number' && Number.isFinite(n))
  } catch {
    return []
  }
}

function safeWriteTimestamps(timestamps: number[]) {
  try {
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(timestamps))
  } catch {
    // ignore storage failures (e.g. privacy mode / quota)
  }
}

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  if (minutes <= 0) return `${seconds}s`
  if (seconds === 0) return `${minutes}m`
  return `${minutes}m ${seconds}s`
}

// Define the form schema with Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setRateLimitMessage(null)

    try {
      // Read prior successful sends and enforce local (client-side) limits.
      const now = Date.now()
      const timestamps = safeReadTimestamps()
      const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

      // Cooldown: based on last successful send (prevents rapid repeats).
      const last = recent.length ? Math.max(...recent) : 0
      const cooldownRemaining = last ? COOLDOWN_MS - (now - last) : 0
      if (cooldownRemaining > 0) {
        setRateLimitMessage(`Please wait ${formatDuration(cooldownRemaining)} before sending another message.`)
        return
      }

      // Sliding window: max N successful sends in the last X minutes.
      if (recent.length >= RATE_LIMIT_MAX_IN_WINDOW) {
        const oldest = Math.min(...recent)
        const windowRemaining = RATE_LIMIT_WINDOW_MS - (now - oldest)
        setRateLimitMessage(
          `You’ve sent ${RATE_LIMIT_MAX_IN_WINDOW} messages recently. Please try again in ${formatDuration(windowRemaining)}.`
        )
        return
      }

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || 'Not provided',
          message: data.message,
        },
        publicKey
      )

      // Count only successful sends (per your request)
      const next = [...recent, now]
      safeWriteTimestamps(next)

      setSubmitStatus('success')
      reset() // Clear the form
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          NAME
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your phone number"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your message..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-800 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {rateLimitMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
          {rateLimitMessage}
        </div>
      )}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          Sorry, there was an error sending your message. Please try again or contact us directly.
        </div>
      )}
    </form>
  )
}