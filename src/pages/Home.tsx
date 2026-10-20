import {
  ArrowRight,
  BadgeCheck,
  Cog,
  Factory,
  HardHat,
  Mail,
  Phone,
  Wrench,
} from 'lucide-react'
import { PanelArt } from '../components/PanelArt'
import { ServiceCard } from '../components/ServiceCard'
import { InquiryForm } from '../components/InquiryForm'
import { ButtonA, ButtonLink, SectionHeading } from '../components/ui'
import { WhatsAppIcon } from '../components/WhatsAppButton'
import { services } from '../data/services'
import { company, hasStats } from '../config/company'
import { links, site } from '../config/site'
import { useReveal, useSeo } from '../lib/hooks'
import { processSteps, whyChooseUs } from '../data/highlights'
import { ContactTile } from '../components/ContactTile'

export default function Home() {
  useSeo({
    title: site.name,
    description:
      'Trisha Power and Automation, Pune — manufacturer and supplier of PCC, MCC, PLC, APFC, AMF and DG control panels, electrical AMC, cable laying and turnkey electrical projects.',
    path: '/',
  })
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="blueprint relative overflow-hidden bg-navy-900 pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
        <div className="pointer-events-none absolute top-0 right-0 h-[480px] w-[480px] translate-x-1/3 -translate-y-1/4 rounded-full bg-electric-500/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-electric-400 via-electric-300 to-gold-500" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-gold-500" />
              Electrical Panels · Automation · Turnkey Projects
            </p>
            <h1 className="mt-6 animate-fade-up text-4xl leading-[1.08] font-extrabold text-white [animation-delay:80ms] sm:text-5xl lg:text-6xl">
              Powering Industries with <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">Precision</span> and{' '}
              <span className="bg-gradient-to-r from-electric-300 to-electric-400 bg-clip-text text-transparent">Reliability</span>
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:160ms]">
              Complete Electrical Panel Solutions, Industrial Automation, and Turnkey Electrical Project Services.
            </p>
            <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
              <ButtonLink to="/services" variant="secondary">
                Explore Our Services <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink to="/quote">Request a Quote</ButtonLink>
              <ButtonLink to="/contact" variant="outline-light">Contact Us</ButtonLink>
            </div>
            <div className="mt-10 flex animate-fade-up flex-wrap gap-x-8 gap-y-3 text-sm text-white/70 [animation-delay:320ms]">
              <a href={links.tel} className="flex items-center gap-2 hover:text-gold-400">
                <Phone className="h-4 w-4 text-gold-500" aria-hidden /> {site.contact.phone.display}
              </a>
              <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-400">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp {site.contact.whatsapp.display}
              </a>
            </div>
          </div>
          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="absolute inset-6 rounded-3xl border border-electric-300/20" />
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-6">
              <PanelArt variant="hero" title="Illustration of an LT electrical panel line-up with incomers, feeder modules and a PLC/HMI section" className="w-full" />
              <div className="mt-2 grid grid-cols-3 gap-2 text-center sm:gap-3">
                {['PCC / MCC', 'PLC / HMI', 'APFC / AMF'].map((t) => (
                  <div key={t} className="rounded-lg border border-white/10 bg-navy-950/50 px-2 py-2.5 font-display text-[0.7rem] font-semibold tracking-wide text-white/85 sm:text-xs">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capability strip */}
      <section className="border-b border-steel-100 bg-white">
        <div className="container-x grid grid-cols-2 divide-steel-100 py-2 md:grid-cols-4 md:divide-x">
          {[
            { icon: Factory, t: 'Panel Manufacturing', d: 'PCC, MCC, APFC, AMF, DG' },
            { icon: Cog, t: 'Industrial Automation', d: 'PLC panels & development' },
            { icon: Wrench, t: 'Electrical AMC', d: 'Preventive maintenance' },
            { icon: HardHat, t: 'Site Execution', d: 'Cabling & turnkey projects' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="reveal flex items-center gap-3 px-2 py-5 md:px-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-electric-100 text-electric-600">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-navy-900">{t}</p>
                <p className="text-xs text-steel-500">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About Trisha Power"
              title="Your partner for electrical panels and industrial electrical projects"
              intro={`${site.name} manufactures, supplies and services electrical control panels — and executes the site work that goes with them. From PCC and MCC panels to PLC automation, power factor correction, DG changeover, maintenance contracts, cable laying and complete turnkey projects, we support industries with practical, well-engineered electrical solutions.`}
            />
            <ul className="reveal mt-8 grid gap-3 sm:grid-cols-2">
              {['Panel design & manufacturing', 'PLC programming & HMI', 'Electrical AMC services', 'On-site cable laying', 'Turnkey project execution', 'Supply & export'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-gold-500" aria-hidden /> {item}
                </li>
              ))}
            </ul>
            <div className="reveal mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/about" variant="secondary">More about us</ButtonLink>
              <ButtonLink to="/projects" variant="outline">View our work</ButtonLink>
            </div>
          </div>
          <div className="reveal">
            {hasStats() ? (
              <div className="grid grid-cols-2 gap-4">
                {company.stats.filter((s) => s.value).map((s) => (
                  <div key={s.label} className="rounded-xl border border-steel-100 bg-steel-50 p-6">
                    <p className="font-display text-4xl font-extrabold text-navy-900">{s.value}</p>
                    <p className="mt-1 text-sm text-steel-500">{s.label}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-2 shadow-2xl shadow-navy-900/20">
                <div className="blueprint rounded-xl">
                  <PanelArt variant="turnkey" title="Illustration of a transformer, PCC, MCC, PLC and APFC panels connected by overhead cable tray" className="w-full" />
                </div>
                <div className="absolute right-5 bottom-5 left-5 rounded-lg bg-white/95 p-4 backdrop-blur sm:right-auto sm:max-w-xs">
                  <p className="font-display text-sm font-bold text-navy-900">From panel to power-on</p>
                  <p className="mt-1 text-xs text-steel-500">Manufacturing, cabling, installation and commissioning under one roof.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-steel-50 py-20 sm:py-24" id="services">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Our Services" title="Electrical panel and project services" intro="Nine core services covering manufacturing, automation, maintenance and on-site execution." />
            <ButtonLink to="/services" variant="outline" className="reveal shrink-0">
              All services <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="blueprint relative overflow-hidden bg-navy-900 py-20 sm:py-24">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-electric-500/15 blur-3xl" />
        <div className="container-x relative">
          <SectionHeading align="center" light eyebrow="Why Choose Us" title="Engineering you can rely on" intro="What you can expect when you work with Trisha Power and Automation." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="reveal bg-navy-900 p-7 transition hover:bg-navy-800 sm:p-8" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/30">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="How We Work" title="A clear process from enquiry to commissioning" />
          <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            <div className="absolute top-7 right-[8%] left-[8%] hidden h-0.5 bg-gradient-to-r from-electric-300 via-electric-400 to-gold-500 lg:block" aria-hidden />
            {processSteps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal relative flex gap-4 lg:flex-col lg:items-center lg:text-center" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-navy-900 text-gold-400 shadow-lg ring-1 ring-steel-200">
                  <Icon className="h-6 w-6" aria-hidden />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 font-display text-[0.65rem] font-bold text-navy-900">{i + 1}</span>
                </span>
                <div>
                  <h3 className="font-display text-base font-bold lg:mt-4">{title}</h3>
                  <p className="mt-1 text-sm text-steel-500">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Inquiry */}
      <section className="bg-steel-50 py-20 sm:py-24" id="enquiry">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <SectionHeading eyebrow="Send an Enquiry" title="Tell us about your requirement" intro="Share the details of your panel, automation or electrical project. Our sales team will respond with the next steps." />
            <div className="reveal mt-8 space-y-4">
              <ContactTile icon={<Phone className="h-5 w-5" />} label="Call" value={site.contact.phone.display} href={links.tel} />
              <ContactTile icon={<WhatsAppIcon className="h-5 w-5" />} label="WhatsApp" value={site.contact.whatsapp.display} href={links.whatsapp()} external />
              <ContactTile icon={<Mail className="h-5 w-5" />} label="Email" value={site.contact.email} href={links.mailto()} />
            </div>
            <p className="reveal mt-6 text-sm text-steel-500">
              {site.contact.person} · {site.contact.designation}
            </p>
          </div>
          <div className="reveal rounded-2xl border border-steel-100 bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-x flex flex-col items-center justify-between gap-6 rounded-2xl border border-steel-100 p-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold">Need a detailed quotation?</h2>
            <p className="mt-1 text-steel-500">Send your specifications and we’ll prepare a quote for your panel or project.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/quote">Request a Quote</ButtonLink>
            <ButtonA href={links.tel} variant="outline">
              <Phone className="h-4 w-4" aria-hidden /> Call now
            </ButtonA>
          </div>
        </div>
      </section>
    </div>
  )
}
