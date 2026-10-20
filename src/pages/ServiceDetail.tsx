import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Factory, ListChecks, Mail, MessageSquareText, Phone, Sparkles } from 'lucide-react'
import { ButtonA, ButtonLink, PageHero, SectionHeading } from '../components/ui'
import { ServiceVisual } from '../components/PanelArt'
import { InquiryForm } from '../components/InquiryForm'
import { WhatsAppIcon } from '../components/WhatsAppButton'
import { getService, services } from '../data/services'
import { links, site } from '../config/site'
import { useReveal, useSeo } from '../lib/hooks'
import NotFound from './NotFound'

const inquirySteps = [
  { title: 'Share your requirement', text: 'Send load details, drawings, specifications or simply describe the application.' },
  { title: 'Technical discussion', text: 'Our team clarifies the scope, ratings and any site conditions with you.' },
  { title: 'Proposal & quotation', text: 'You receive a proposal with the configuration, scope and commercial terms.' },
  { title: 'Execution & support', text: 'On confirmation, we manufacture, deliver and support through commissioning.' },
]

export default function ServiceDetail() {
  const { slug = '' } = useParams()
  const service = getService(slug)
  if (!service) return <NotFound />
  return <ServiceDetailView key={service.slug} slug={service.slug} />
}

function ServiceDetailView({ slug }: { slug: string }) {
  const service = getService(slug)!
  useSeo({ title: service.title, description: service.seoDescription, path: `/services/${service.slug}` })
  const ref = useReveal<HTMLDivElement>()
  const Icon = service.icon
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 8)
  const whatsappText = `Hello Trisha Power and Automation, I would like to enquire about ${service.title}.`

  return (
    <div ref={ref}>
      <PageHero title={service.title} intro={service.summary} crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: service.shortTitle }]}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={`/quote?service=${service.slug}`}>Request a Quote</ButtonLink>
          <ButtonA href={links.whatsapp(whatsappText)} variant="outline-light" external>
            <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
          </ButtonA>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <div className="reveal overflow-hidden rounded-2xl shadow-xl shadow-navy-900/10">
              <div className="aspect-[16/9]">
                <ServiceVisual variant={service.variant} image={service.image} alt={`${service.title} illustration`} />
              </div>
            </div>

            <div className="reveal mt-10">
              <p className="eyebrow">Overview</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">About our {service.shortTitle}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-steel-500">
                {service.overview.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <DetailList icon={<Factory className="h-5 w-5" />} title="Applications" items={service.applications} />
              <DetailList icon={<Sparkles className="h-5 w-5" />} title="Benefits" items={service.benefits} />
              <div className="md:col-span-2">
                <DetailList icon={<ListChecks className="h-5 w-5" />} title="Typical scope & features" items={service.scope} columns />
                <p className="mt-3 text-xs text-steel-500">Exact configuration, ratings and makes are finalised as per your specification and approved drawings.</p>
              </div>
            </div>

            <div className="mt-14">
              <SectionHeading eyebrow="Inquiry Process" title="How to get started" />
              <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                {inquirySteps.map((s, i) => (
                  <li key={s.title} className="reveal flex gap-4 rounded-xl border border-steel-100 bg-steel-50 p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-gold-400">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-base font-bold">{s.title}</h3>
                      <p className="mt-1 text-sm text-steel-500">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div id="enquire" className="mt-14 scroll-mt-28 rounded-2xl border border-steel-100 bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <MessageSquareText className="h-6 w-6 text-electric-600" aria-hidden /> Enquire about {service.shortTitle}
              </h2>
              <p className="mt-2 mb-6 text-sm text-steel-500">Fill in your details and we’ll get back to you.</p>
              <InquiryForm kind="quote" defaultService={service.title} />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="blueprint overflow-hidden rounded-2xl bg-navy-900 p-6 text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500 text-navy-900">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-bold text-white">Talk to our sales team</h2>
              <p className="mt-1 text-sm text-white/65">{site.contact.person}, {site.contact.designation}</p>
              <div className="mt-5 space-y-2.5">
                <a href={links.tel} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15">
                  <Phone className="h-4 w-4 text-gold-400" aria-hidden /> {site.contact.phone.display}
                </a>
                <a href={links.whatsapp(whatsappText)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> {site.contact.whatsapp.display}
                </a>
                <a href={links.mailto(`Enquiry: ${service.title}`)} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold break-all transition hover:bg-white/15">
                  <Mail className="h-4 w-4 shrink-0 text-gold-400" aria-hidden /> {site.contact.email}
                </a>
              </div>
              <a href="#enquire" className="mt-5 flex w-full items-center justify-center rounded-md bg-gold-500 px-4 py-3 font-display text-sm font-semibold text-navy-900 transition hover:bg-gold-400">
                Send an enquiry
              </a>
            </div>

            <nav aria-label="Other services" className="rounded-2xl border border-steel-100 p-5">
              <h2 className="font-display text-sm font-bold tracking-wider uppercase">Other services</h2>
              <ul className="mt-3 divide-y divide-steel-100">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="group flex items-center justify-between gap-2 py-2.5 text-sm text-steel-700 hover:text-electric-600">
                      {s.title}
                      <ArrowRight className="h-4 w-4 shrink-0 text-steel-200 transition group-hover:translate-x-0.5 group-hover:text-electric-600" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>
    </div>
  )
}

function DetailList({ icon, title, items, columns }: { icon: ReactNode; title: string; items: string[]; columns?: boolean }) {
  return (
    <div className="reveal h-full rounded-xl border border-steel-100 p-6">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-bold">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-electric-100 text-electric-600">{icon}</span>
        {title}
      </h3>
      <ul className={`mt-4 gap-x-6 gap-y-2.5 text-sm text-steel-700 ${columns ? 'grid sm:grid-cols-2' : 'grid'}`}>
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden /> {i}
          </li>
        ))}
      </ul>
    </div>
  )
}
