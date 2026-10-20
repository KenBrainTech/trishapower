/**
 * Vercel serverless function: POST /api/inquiry
 *
 * Emails website enquiries to the sales inbox using Resend (https://resend.com).
 * Enable it by setting these Vercel environment variables (see DEPLOYMENT.md):
 *   RESEND_API_KEY       — required
 *   INQUIRY_TO_EMAIL     — optional, defaults to sales.trishapower@gmail.com
 *   INQUIRY_FROM_EMAIL   — optional, e.g. "Trisha Power Website <website@trishapower.in>"
 *   VITE_INQUIRY_ENDPOINT=/api/inquiry  — tells the website forms to use this function
 * Without RESEND_API_KEY it returns 503, and the form offers WhatsApp/email instead.
 */

const TO = process.env.INQUIRY_TO_EMAIL || 'sales.trishapower@gmail.com'
const FROM = process.env.INQUIRY_FROM_EMAIL || 'Trisha Power Website <onboarding@resend.dev>'

type Payload = Record<string, unknown>

const str = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return json(503, { error: 'Email delivery is not configured.' })

  let data: Payload
  try {
    data = (await request.json()) as Payload
  } catch {
    return json(400, { error: 'Invalid JSON.' })
  }

  if (str(data.website)) return json(200, { ok: true }) // honeypot: drop bots silently

  const name = str(data.name, 120)
  const phone = str(data.phone, 30)
  const email = str(data.email, 200)
  const message = str(data.message, 5000)
  if (name.length < 2 || phone.replace(/\D/g, '').length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 10) {
    return json(422, { error: 'Missing or invalid fields.' })
  }

  const kind = data.kind === 'quote' ? 'Quote request' : 'Website enquiry'
  const service = str(data.service, 200) || 'General'
  const rows: [string, string][] = [
    ['Name', name],
    ['Company', str(data.company, 200)],
    ['Phone', phone],
    ['Email', email],
    ['Service', service],
    ['Project location', str(data.location, 200)],
    ['Timeline', str(data.timeline, 100)],
    ['Page', str(data.source, 300)],
  ]
  const text = `${kind}\n\n${rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${message}\n`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: `${kind} — ${service} — ${name}`, text }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return json(502, { error: 'Email provider rejected the message.' })
  }
  return json(200, { ok: true })
}
