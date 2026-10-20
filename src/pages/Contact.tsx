import { Clock, Mail, MapPin, Navigation, Phone, UserRound } from 'lucide-react'
import { ButtonA, ButtonLink, PageHero } from '../components/ui'
import { InquiryForm } from '../components/InquiryForm'
import { ContactTile } from '../components/ContactTile'
import { WhatsAppIcon } from '../components/WhatsAppButton'
import { links, site } from '../config/site'
import { useReveal, useSeo } from '../lib/hooks'

export default function Contact() {
  useSeo({
    title: 'Contact Us',
    description: `Contact ${site.name}, Tathawade, Pune. Call ${site.contact.phone.display}, WhatsApp ${site.contact.whatsapp.display} or email ${site.contact.email}.`,
    path: '/contact',
  })
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <PageHero
        title="Contact Us"
        intro="Call, WhatsApp or email our sales team — or send your enquiry using the form below."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
      />

      <section className="relative z-10 -mt-8">
        <div className="container-x grid gap-4 md:grid-cols-3">
          <ContactTile icon={<Phone className="h-5 w-5" />} label="Call us" value={site.contact.phone.display} href={links.tel} />
          <ContactTile icon={<WhatsAppIcon className="h-5 w-5" />} label="WhatsApp" value={site.contact.whatsapp.display} href={links.whatsapp()} external />
          <ContactTile icon={<Mail className="h-5 w-5" />} label="Email" value={site.contact.email} href={links.mailto()} />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="reveal rounded-2xl border border-steel-100 bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 mb-6 text-sm text-steel-500">Tell us what you need and how to reach you.</p>
            <InquiryForm />
          </div>

          <div className="space-y-6">
            <div className="reveal blueprint rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
              <h2 className="text-lg font-bold text-white">Sales contact</h2>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-navy-900">
                  <UserRound className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display font-semibold">{site.contact.person}</p>
                  <p className="text-sm text-white/65">{site.contact.designation}</p>
                </div>
              </div>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex gap-3">
                  <dt><Phone className="mt-0.5 h-4 w-4 text-gold-400" aria-label="Phone" /></dt>
                  <dd><a href={links.tel} className="hover:text-gold-400">{site.contact.phone.display}</a> <span className="text-white/50">(calls)</span></dd>
                </div>
                <div className="flex gap-3">
                  <dt><WhatsAppIcon className="mt-0.5 h-4 w-4 text-[#25D366]" /><span className="sr-only">WhatsApp</span></dt>
                  <dd><a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">{site.contact.whatsapp.display}</a> <span className="text-white/50">(WhatsApp)</span></dd>
                </div>
                <div className="flex gap-3">
                  <dt><Mail className="mt-0.5 h-4 w-4 text-gold-400" aria-label="Email" /></dt>
                  <dd className="break-all"><a href={links.mailto()} className="hover:text-gold-400">{site.contact.email}</a></dd>
                </div>
                <div className="flex gap-3">
                  <dt><MapPin className="mt-0.5 h-4 w-4 text-gold-400" aria-label="Address" /></dt>
                  <dd>
                    <address className="not-italic leading-relaxed text-white/85">
                      {site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}
                    </address>
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <ButtonLink to="/quote" className="flex-1">Request a Quote</ButtonLink>
                <ButtonA href={links.directions} variant="outline-light" external className="flex-1">
                  <Navigation className="h-4 w-4" aria-hidden /> Directions
                </ButtonA>
              </div>
            </div>
            <div className="reveal flex gap-3 rounded-xl border border-steel-100 bg-steel-50 p-5 text-sm text-steel-500">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-electric-600" aria-hidden />
              <p>For urgent breakdown or project requirements, calling <a href={links.tel} className="font-semibold text-navy-900">{site.contact.phone.display}</a> is the fastest way to reach us.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Map" className="pb-16 sm:pb-20">
        <div className="container-x">
          <div className="reveal overflow-hidden rounded-2xl border border-steel-100 shadow-lg shadow-navy-900/5">
            <iframe
              title={`Map showing ${site.name}, ${site.address.locality}`}
              src={links.mapEmbed}
              className="block h-[380px] w-full sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-center text-xs text-steel-500">
            Map location is approximate (near Bharat Petrol Pump, Navale Vasti, Tathawade).{' '}
            <a href={links.directions} target="_blank" rel="noopener noreferrer" className="font-semibold text-electric-600 hover:underline">Open in Google Maps</a>
          </p>
        </div>
      </section>
    </div>
  )
}
