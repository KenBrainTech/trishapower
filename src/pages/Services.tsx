import { PageHero, SectionHeading } from '../components/ui'
import { ServiceCard } from '../components/ServiceCard'
import { CtaBand } from '../components/CtaBand'
import { services } from '../data/services'
import { site } from '../config/site'
import { useReveal, useSeo } from '../lib/hooks'

export default function Services() {
  useSeo({
    title: 'Services',
    description: `PCC, PLC, MCC, APFC, AMF and DG control panels, electrical AMC, cable laying and turnkey electrical projects by ${site.name}, Pune.`,
    path: '/services',
  })
  const ref = useReveal<HTMLDivElement>()

  const groups = [
    { title: 'Electrical Control Panels', eyebrow: 'Manufacturing', items: services.filter((s) => ['pcc', 'mcc', 'apfc', 'amf', 'dg'].includes(s.variant)) },
    { title: 'Industrial Automation', eyebrow: 'Automation', items: services.filter((s) => s.variant === 'plc') },
    { title: 'Maintenance & Project Services', eyebrow: 'Services', items: services.filter((s) => ['amc', 'cable', 'turnkey'].includes(s.variant)) },
  ]

  return (
    <div ref={ref}>
      <PageHero
        title="Our Services"
        intro="Electrical panel manufacturing, industrial automation, electrical maintenance and on-site project execution — choose a service to see its applications, benefits and scope."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      >
        <nav aria-label="Service categories" className="mt-8 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a key={g.title} href={`#${g.eyebrow.toLowerCase()}`} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-gold-400 hover:text-gold-400">
              {g.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {groups.map((g, gi) => (
        <section key={g.title} id={g.eyebrow.toLowerCase()} className={`scroll-mt-24 py-16 sm:py-20 ${gi % 2 === 1 ? 'bg-steel-50' : ''}`}>
          <div className="container-x">
            <SectionHeading eyebrow={g.eyebrow} title={g.title} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
    </div>
  )
}
