import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Info } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost-light'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-lg shadow-gold-500/20',
  secondary: 'bg-electric-600 text-white hover:bg-electric-500 shadow-lg shadow-electric-600/20',
  outline: 'border border-navy-900/15 text-navy-900 hover:border-electric-500 hover:text-electric-600 bg-white',
  'outline-light': 'border border-white/30 text-white hover:border-gold-400 hover:text-gold-400',
  'ghost-light': 'text-white/85 hover:text-gold-400',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-display text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60'

type BtnProps = { variant?: ButtonVariant; className?: string; children: ReactNode }

export function ButtonLink({ to, variant = 'primary', className = '', children }: BtnProps & { to: string }) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}

export function ButtonA({ href, variant = 'primary', className = '', children, external }: BtnProps & { href: string; external?: boolean }) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', light = false }: { eyebrow: string; title: ReactNode; intro?: ReactNode; align?: 'left' | 'center'; light?: boolean }) {
  return (
    <div className={`reveal max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${light ? 'text-electric-300' : ''} ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl leading-tight font-bold sm:text-4xl ${light ? 'text-white' : ''}`}>{title}</h2>
      {intro && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-white/70' : 'text-steel-500'}`}>{intro}</p>}
    </div>
  )
}

export type Crumb = { label: string; to?: string }

export function PageHero({ title, intro, crumbs, children }: { title: string; intro?: ReactNode; crumbs: Crumb[]; children?: ReactNode }) {
  return (
    <section className="blueprint relative overflow-hidden bg-navy-900 pt-28 pb-14 text-white sm:pt-32 sm:pb-20">
      <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-electric-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-electric-400 via-electric-300 to-gold-500" />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/60">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-gold-400">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/90">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-5 max-w-4xl animate-fade-up text-3xl leading-tight font-bold text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-white/75 [animation-delay:100ms] sm:text-lg">{intro}</p>}
        {children}
      </div>
    </section>
  )
}

/**
 * Dashed reminder box for content the business still needs to supply.
 * Rendered only in development (`npm run dev`) — hidden in the production build.
 */
export function DevPlaceholder({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null
  return (
    <div className="flex gap-3 rounded-lg border-2 border-dashed border-gold-500/70 bg-gold-100/60 p-4 text-sm text-navy-800">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
      <div>
        <strong className="font-semibold">Placeholder (visible in dev only): </strong>
        {children}
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-steel-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-electric-500 border-r-gold-500" />
        </div>
        <span className="font-display text-sm font-medium text-steel-500">Loading…</span>
      </div>
    </div>
  )
}
