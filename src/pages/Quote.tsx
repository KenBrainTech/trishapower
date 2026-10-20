import { useSearchParams } from 'react-router-dom'
import { ClipboardCheck, FileText, Phone, Timer } from 'lucide-react'
import { PageHero } from '../components/ui'
import { InquiryForm } from '../components/InquiryForm'
import { WhatsAppIcon } from '../components/WhatsAppButton'
import { getService } from '../data/services'
import { links, site } from '../config/site'
import { useSeo } from '../lib/hooks'

const tips = [
  'Single line diagram (SLD) or load list, if available',
  'Incoming supply details and panel ratings',
  'Number of feeders / motors and their ratings',
  'Preferred switchgear makes and enclosure requirements',
  'Site location and required delivery timeline',
]

export default function Quote() {
  useSeo({
    title: 'Request a Quote',
    description: `Request a quotation for PCC, MCC, PLC, APFC, AMF or DG panels, electrical AMC, cable laying or turnkey projects from ${site.name}, Pune.`,
    path: '/quote',
  })
  const [params] = useSearchParams()
  const preselected = getService(params.get('service') ?? '')

  return (
    <div>
      <PageHero
        title="Request a Quote"
        intro="Tell us about your panel, automation or electrical project requirement and we’ll prepare a quotation."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Request a Quote' }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-steel-100 bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <FileText className="h-6 w-6 text-electric-600" aria-hidden /> Quotation request
            </h2>
            <p className="mt-2 mb-6 text-sm text-steel-500">The more detail you share, the more accurate our quotation can be.</p>
            <InquiryForm key={preselected?.slug ?? 'none'} kind="quote" defaultService={preselected?.title ?? ''} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-steel-100 bg-steel-50 p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <ClipboardCheck className="h-5 w-5 text-gold-600" aria-hidden /> Helpful to include
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-steel-700">
                {tips.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-500" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-steel-500">Have drawings or a BOQ? Mention it in the form — we’ll ask you to share the files by email or WhatsApp.</p>
            </div>
            <div className="blueprint rounded-2xl bg-navy-900 p-6 text-white">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Timer className="h-5 w-5 text-gold-400" aria-hidden /> Prefer to talk?
              </h2>
              <p className="mt-2 text-sm text-white/65">Speak directly with {site.contact.person}, {site.contact.designation}.</p>
              <div className="mt-5 space-y-2.5">
                <a href={links.tel} className="flex items-center justify-center gap-2 rounded-md bg-gold-500 px-4 py-3 font-display text-sm font-semibold text-navy-900 hover:bg-gold-400">
                  <Phone className="h-4 w-4" aria-hidden /> Call {site.contact.phone.display}
                </a>
                <a href={links.whatsapp('Hello Trisha Power and Automation, I would like a quotation for:')} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 font-display text-sm font-semibold text-white hover:brightness-95">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp {site.contact.whatsapp.display}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
