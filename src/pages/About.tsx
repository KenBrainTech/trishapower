import type { ReactNode } from 'react'
import { Award, BadgeCheck, Cpu, Factory, Building2, Wrench, Cable } from 'lucide-react'
import { PageHero, SectionHeading, ButtonLink, DevPlaceholder } from '../components/ui'
import { PanelArt } from '../components/PanelArt'
import { CtaBand } from '../components/CtaBand'
import { company, hasStats } from '../config/company'
import { whyChooseUs } from '../data/highlights'
import { site } from '../config/site'
import { useReveal, useSeo } from '../lib/hooks'

const expertise = [
  { icon: Factory, title: 'Panel Manufacturing', text: 'PCC, MCC, APFC, AMF and DG control panels engineered to your load schedule and site requirements.' },
  { icon: Cpu, title: 'Automation Capabilities', text: 'PLC control panels with logic development, HMI screens, drive integration and commissioning.' },
  { icon: Wrench, title: 'Maintenance Services', text: 'Electrical AMC with preventive maintenance, inspection and breakdown support.' },
  { icon: Cable, title: 'Site Execution', text: 'On-site cable laying, glanding, termination and testing for power and control circuits.' },
  { icon: Building2, title: 'Turnkey Projects', text: 'Coordinated supply, installation and commissioning of the complete electrical scope.' },
]

export default function About() {
  useSeo({
    title: 'About Us',
    description: `About ${site.name}, Pune — electrical panel manufacturing, PLC automation, electrical maintenance and turnkey electrical project services.`,
    path: '/about',
  })
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <PageHero
        title="Electrical engineering expertise, from panel to project"
        intro={`${site.name} is an electrical panel manufacturer, supplier, service provider and exporter based in Tathawade, Pune.`}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who We Are" title="Practical electrical solutions for industry" />
            <div className="reveal mt-6 space-y-4 leading-relaxed text-steel-500">
              {company.history ? (
                company.history.split('\n\n').map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <DevPlaceholder>
                  Add your company history (founding year, founders, growth) in <code>src/config/company.ts → history</code>. This box is hidden on the live site until then.
                </DevPlaceholder>
              )}
              <p>
                We design, manufacture and supply electrical control panels — Power Control Centers, Motor Control Centers, PLC automation panels, APFC panels, AMF panels and DG set control panels — and provide the services that keep electrical systems running: annual maintenance contracts, on-site cable laying and complete turnkey electrical project execution.
              </p>
              <p>
                Our approach is simple: understand the requirement properly, engineer a solution that fits it, build it carefully, and stay available for support after handover.
              </p>
            </div>
            <div className="reveal mt-8">
              <ButtonLink to="/services" variant="secondary">Explore our services</ButtonLink>
            </div>
          </div>
          <div className="reveal overflow-hidden rounded-2xl bg-navy-900 p-2 shadow-2xl shadow-navy-900/20">
            <div className="blueprint rounded-xl">
              <PanelArt variant="pcc" title="Illustration of a PCC panel line-up" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-steel-50 py-14">
        <div className="container-x">
          {hasStats() ? (
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {company.stats.filter((s) => s.value).map((s) => (
                <div key={s.label} className="reveal rounded-xl border border-steel-100 bg-white p-6 text-center">
                  <dt className="text-sm text-steel-500">{s.label}</dt>
                  <dd className="order-first font-display text-4xl font-extrabold text-navy-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <DevPlaceholder>
              Add verified figures — years of experience, completed projects, panels delivered, industries served — in <code>src/config/company.ts → stats</code>. The stats band appears automatically once values are filled in.
            </DevPlaceholder>
          )}
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Our Expertise" title="What we do" intro="Capabilities across the lifecycle of an industrial electrical installation." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {expertise.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="reveal rounded-xl border border-steel-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/5" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-400">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-base font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications, facilities & makes */}
      <section className="blueprint bg-navy-900 py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <InfoList title="Certifications" icon={<Award className="h-5 w-5" />} items={company.certifications} placeholder="Add only current, verifiable certifications in src/config/company.ts → certifications." />
          <InfoList title="Technical Capabilities" icon={<Factory className="h-5 w-5" />} items={company.facilities} placeholder="List facilities and equipment (fabrication, testing, programming) in src/config/company.ts → facilities." />
          <InfoList title="Makes We Work With" icon={<Cpu className="h-5 w-5" />} items={company.makesHandled} placeholder="List switchgear / PLC brands you regularly use in src/config/company.ts → makesHandled." />
          {company.certifications.length + company.facilities.length + company.makesHandled.length === 0 && !import.meta.env.DEV && (
            <div className="lg:col-span-3">
              <SectionHeading light align="center" eyebrow="Our Commitment" title="Quality, safety and service in every project" intro="We work to your specifications and applicable standards, with careful workmanship and clear communication from enquiry to handover." />
            </div>
          )}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Why Trisha Power" title="How we work with our customers" />
          <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {whyChooseUs.map(({ title, text }) => (
              <div key={title} className="reveal flex gap-4">
                <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-gold-500" aria-hidden />
                <div>
                  <h3 className="font-display text-base font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-steel-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}

function InfoList({ title, icon, items, placeholder }: { title: string; icon: ReactNode; items: string[]; placeholder: string }) {
  if (items.length === 0) {
    return import.meta.env.DEV ? (
      <div className="rounded-xl border-2 border-dashed border-gold-500/50 p-6 text-sm text-white/70">
        <p className="font-display font-semibold text-gold-400">{title} — placeholder (dev only)</p>
        <p className="mt-2">{placeholder}</p>
      </div>
    ) : null
  }
  return (
    <div className="reveal rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white">
        <span className="text-gold-400">{icon}</span> {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm text-white/75">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <BadgeCheck className="h-4 w-4 shrink-0 text-electric-300" aria-hidden /> {i}
          </li>
        ))}
      </ul>
    </div>
  )
}
