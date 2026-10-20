import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { services } from '../data/services'
import { links, site } from '../config/site'
import { formatInquiry, submitInquiry, validateInquiry, type FieldErrors, type Inquiry, type InquiryKind } from '../lib/inquiry'
import { WhatsAppIcon } from './WhatsAppButton'

type Status =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'sent' }
  | { type: 'handoff'; summary: string }
  | { type: 'error'; message: string; summary: string }

const timelines = ['Immediately', 'Within 1 month', '1–3 months', '3+ months', 'Just exploring']

export function InquiryForm({ kind = 'contact', defaultService = '' }: { kind?: InquiryKind; defaultService?: string }) {
  const empty: Inquiry = { kind, name: '', company: '', phone: '', email: '', service: defaultService, message: '', location: '', timeline: '', website: '' }
  const [data, setData] = useState<Inquiry>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const uid = useId()

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setData((d) => ({ ...d, [name]: value }))
    if (errors[name as keyof Inquiry]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateInquiry(data)
    setErrors(found)
    const firstKey = Object.keys(found)[0]
    if (firstKey) {
      document.getElementById(`${uid}-${firstKey}`)?.focus()
      return
    }
    setStatus({ type: 'submitting' })
    const summary = formatInquiry(data)
    const result = await submitInquiry(data)
    if (result.status === 'sent') {
      setStatus({ type: 'sent' })
      setData(empty)
    } else if (result.status === 'not-configured') {
      setStatus({ type: 'handoff', summary })
    } else {
      setStatus({ type: 'error', message: result.message, summary })
    }
  }

  if (status.type === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" aria-hidden />
        <h3 className="mt-4 text-xl font-bold">Thank you — your {kind === 'quote' ? 'quote request' : 'message'} has been sent</h3>
        <p className="mt-2 max-w-md text-steel-500">
          Our team will get back to you shortly. For urgent requirements, call{' '}
          <a href={links.tel} className="font-semibold text-electric-600">{site.contact.phone.display}</a>.
        </p>
        <button type="button" onClick={() => setStatus({ type: 'idle' })} className="mt-6 font-display text-sm font-semibold text-electric-600 hover:underline">
          Send another {kind === 'quote' ? 'request' : 'message'}
        </button>
      </div>
    )
  }

  if (status.type === 'handoff' || status.type === 'error') {
    const subject = `${kind === 'quote' ? 'Quote request' : 'Website enquiry'} — ${data.service || 'General'}`
    return (
      <div role="status" className="rounded-xl border border-steel-200 bg-steel-50 p-6 sm:p-8">
        {status.type === 'error' ? (
          <div className="flex gap-3 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div>
              <h3 className="font-bold text-red-700">Your message could not be sent</h3>
              <p className="mt-1 text-sm">{status.message} Your details are kept — you can try again, or send them directly:</p>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold">Almost done — choose how to send your {kind === 'quote' ? 'request' : 'message'}</h3>
            <p className="mt-2 text-sm text-steel-500">
              Your details are ready. Send them to our sales team on WhatsApp or by email — both open with your message pre-filled.
            </p>
          </div>
        )}
        <pre className="mt-5 max-h-52 overflow-auto rounded-lg border border-steel-200 bg-white p-4 font-sans text-sm whitespace-pre-wrap text-steel-700">{status.summary}</pre>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a href={links.whatsapp(status.summary)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-display text-sm font-semibold text-white transition hover:brightness-95">
            <WhatsAppIcon className="h-5 w-5" /> Send via WhatsApp
          </a>
          <a href={links.mailto(subject, status.summary)} className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-900 px-5 py-3 font-display text-sm font-semibold text-white transition hover:bg-navy-800">
            <Mail className="h-4 w-4" aria-hidden /> Send via Email
          </a>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <button type="button" onClick={() => setStatus({ type: 'idle' })} className="font-semibold text-electric-600 hover:underline">
            ← Edit details{status.type === 'error' ? ' / try again' : ''}
          </button>
          <span className="text-steel-500">
            Or call <a href={links.tel} className="font-semibold text-navy-900">{site.contact.phone.display}</a>
          </span>
        </div>
      </div>
    )
  }

  const submitting = status.type === 'submitting'

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-busy={submitting}>
      <Field id={`${uid}-name`} label="Full name" required error={errors.name}>
        <input id={`${uid}-name`} name="name" autoComplete="name" value={data.name} onChange={onChange} className={inputCls(errors.name)} {...aria(uid, 'name', errors.name)} />
      </Field>
      <Field id={`${uid}-company`} label="Company">
        <input id={`${uid}-company`} name="company" autoComplete="organization" value={data.company} onChange={onChange} className={inputCls()} />
      </Field>
      <Field id={`${uid}-phone`} label="Phone" required error={errors.phone}>
        <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" value={data.phone} onChange={onChange} className={inputCls(errors.phone)} {...aria(uid, 'phone', errors.phone)} />
      </Field>
      <Field id={`${uid}-email`} label="Email" required error={errors.email}>
        <input id={`${uid}-email`} name="email" type="email" autoComplete="email" value={data.email} onChange={onChange} className={inputCls(errors.email)} {...aria(uid, 'email', errors.email)} />
      </Field>
      <Field id={`${uid}-service`} label="Service required" required error={errors.service} full={kind !== 'quote'}>
        <select id={`${uid}-service`} name="service" value={data.service} onChange={onChange} className={inputCls(errors.service)} {...aria(uid, 'service', errors.service)}>
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Other / Not sure">Other / Not sure</option>
        </select>
      </Field>
      {kind === 'quote' && (
        <>
          <Field id={`${uid}-timeline`} label="Expected timeline">
            <select id={`${uid}-timeline`} name="timeline" value={data.timeline} onChange={onChange} className={inputCls()}>
              <option value="">Select…</option>
              {timelines.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field id={`${uid}-location`} label="Project / site location" full>
            <input id={`${uid}-location`} name="location" value={data.location} onChange={onChange} placeholder="City, state" className={inputCls()} />
          </Field>
        </>
      )}
      <Field id={`${uid}-message`} label={kind === 'quote' ? 'Requirement details' : 'Message'} required error={errors.message} full>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          value={data.message}
          onChange={onChange}
          placeholder={kind === 'quote' ? 'Load details, panel ratings, quantities, specifications or drawings available…' : 'How can we help?'}
          className={inputCls(errors.message)}
          {...aria(uid, 'message', errors.message)}
        />
      </Field>
      {/* Honeypot field for bots — hidden from people and assistive tech */}
      <div className="hidden" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={onChange} /></label>
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-steel-500">Fields marked <span className="text-red-600">*</span> are required. We use your details only to respond to this enquiry.</p>
        <button type="submit" disabled={submitting} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-display text-sm font-semibold text-navy-900 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-70">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {submitting ? 'Sending…' : kind === 'quote' ? 'Submit Quote Request' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}

function aria(uid: string, key: string, error?: string) {
  return { 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? `${uid}-${key}-error` : undefined, 'aria-required': true }
}

function inputCls(error?: string) {
  return `w-full rounded-md border bg-white px-3.5 py-2.5 text-navy-900 placeholder:text-steel-500/60 transition focus:outline-none focus:ring-2 ${
    error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-steel-200 focus:border-electric-500 focus:ring-electric-100'
  }`
}

function Field({ id, label, required, error, full, children }: { id: string; label: string; required?: boolean; error?: string; full?: boolean; children: ReactNode }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label} {required && <span className="text-red-600" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {error}
        </p>
      )}
    </div>
  )
}
