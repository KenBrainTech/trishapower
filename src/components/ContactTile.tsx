import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

export function ContactTile({ icon, label, value, href, external }: { icon: ReactNode; label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex min-w-0 items-center gap-4 rounded-xl border border-steel-100 bg-white p-4 transition hover:border-electric-300 hover:shadow-lg hover:shadow-navy-900/5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-400 transition group-hover:bg-electric-600 group-hover:text-white">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs font-medium tracking-wide text-steel-500 uppercase">{label}</span>
        <span className="block truncate font-display font-semibold text-navy-900">{value}</span>
      </span>
      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-steel-500 transition group-hover:translate-x-1 group-hover:text-electric-600" aria-hidden />
    </a>
  )
}
