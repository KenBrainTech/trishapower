import { Phone } from 'lucide-react'
import { ButtonA, ButtonLink } from './ui'
import { WhatsAppIcon } from './WhatsAppButton'
import { links, site } from '../config/site'

export function CtaBand({ title = 'Have an electrical panel or project requirement?', text = 'Share your specifications, load details or drawings — our team will review your requirement and get back to you with a suitable solution and quotation.' }: { title?: string; text?: string }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <div className="reveal blueprint relative overflow-hidden rounded-2xl bg-navy-900 px-6 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -top-24 -left-10 h-72 w-72 rounded-full bg-electric-500/25 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl leading-tight font-bold text-white sm:text-3xl">{title}</h2>
            <p className="mt-3 text-white/70">{text}</p>
          </div>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0 lg:flex-col xl:flex-row">
            <ButtonLink to="/quote">Request a Quote</ButtonLink>
            <ButtonA href={links.tel} variant="outline-light">
              <Phone className="h-4 w-4" aria-hidden /> {site.contact.phone.display}
            </ButtonA>
            <ButtonA href={links.whatsapp()} variant="outline-light" external>
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </ButtonA>
          </div>
        </div>
      </div>
    </section>
  )
}
