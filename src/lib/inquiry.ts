/**
 * Inquiry submission — the single integration point for the contact and quote forms.
 *
 * The forms never pretend to send a message. Submission works like this:
 *  - If VITE_INQUIRY_ENDPOINT is set (see .env.example), the inquiry is POSTed there
 *    as JSON. Any endpoint that accepts JSON works: your own API, Formspree,
 *    Getform, Web3Forms, a serverless function, etc.
 *  - If it is not set, `submitInquiry` returns { status: 'not-configured' } and the
 *    form offers to send the same details by WhatsApp or email instead.
 */

import { site } from '../config/site'

export type InquiryKind = 'contact' | 'quote'

export type Inquiry = {
  kind: InquiryKind
  name: string
  company: string
  phone: string
  email: string
  service: string
  message: string
  // Quote-only fields
  location?: string
  timeline?: string
  /** Honeypot — must stay empty. */
  website?: string
}

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string }

const endpoint = (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined)?.trim()

export const isInquiryBackendConfigured = Boolean(endpoint)

export async function submitInquiry(data: Inquiry): Promise<SubmitResult> {
  if (data.website) return { status: 'sent' } // silently drop bots
  if (!endpoint) return { status: 'not-configured' }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...data,
        website: undefined,
        _subject: `${data.kind === 'quote' ? 'Quote request' : 'Website enquiry'} — ${data.service || 'General'} — ${data.name}`,
        source: typeof window !== 'undefined' ? window.location.href : site.url,
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) return { status: 'error', message: `The server responded with status ${res.status}.` }
    return { status: 'sent' }
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === 'AbortError'
    return {
      status: 'error',
      message: aborted ? 'The request timed out. Please check your connection.' : 'We could not reach the server.',
    }
  }
}

/** Plain-text version of an inquiry, used for WhatsApp and email fallbacks. */
export function formatInquiry(data: Inquiry): string {
  const rows = [
    data.kind === 'quote' ? 'Quote Request' : 'Website Enquiry',
    '',
    `Name: ${data.name}`,
    data.company ? `Company: ${data.company}` : undefined,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    data.service ? `Service: ${data.service}` : undefined,
    data.location ? `Project location: ${data.location}` : undefined,
    data.timeline ? `Timeline: ${data.timeline}` : undefined,
    '',
    data.message,
  ]
  return rows.filter((r): r is string => typeof r === 'string').join('\n')
}

export type FieldErrors = Partial<Record<keyof Inquiry, string>>

export function validateInquiry(data: Inquiry): FieldErrors {
  const errors: FieldErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Please enter your name.'
  const digits = data.phone.replace(/\D/g, '')
  if (!data.phone.trim()) errors.phone = 'Please enter a phone number.'
  else if (digits.length < 10 || digits.length > 13) errors.phone = 'Please enter a valid phone number.'
  if (!data.email.trim()) errors.email = 'Please enter an email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!data.service) errors.service = 'Please select a service.'
  if (data.message.trim().length < 10) errors.message = 'Please add a few details (at least 10 characters).'
  return errors
}
