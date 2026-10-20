import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Service } from '../data/services'
import { ServiceVisual } from './PanelArt'

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const Icon = service.icon
  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-xl border border-steel-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-electric-300/60 hover:shadow-xl hover:shadow-navy-900/10" style={index !== undefined ? { transitionDelay: `${(index % 3) * 70}ms` } : undefined}>
      <Link to={`/services/${service.slug}`} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden>
        <ServiceVisual variant={service.variant} image={service.image} alt="" className="transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500 text-navy-900 shadow-lg">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg leading-snug font-bold">
          <Link to={`/services/${service.slug}`} className="hover:text-electric-600">
            {service.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-steel-500">{service.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-steel-100 pt-4">
          <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-electric-600 hover:gap-2.5 transition-all" aria-label={`Learn more about ${service.title}`}>
            Learn more <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link to={`/quote?service=${encodeURIComponent(service.slug)}`} className="rounded-md bg-navy-900 px-3.5 py-2 font-display text-xs font-semibold text-white transition hover:bg-electric-600" aria-label={`Enquire about ${service.title}`}>
            Enquire
          </Link>
        </div>
      </div>
    </article>
  )
}
