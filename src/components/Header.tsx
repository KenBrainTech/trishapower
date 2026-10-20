import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { Logo } from './Logo'
import { services } from '../data/services'
import { links, site } from '../config/site'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services', dropdown: true },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const [menuPath, setMenuPath] = useState(pathname)

  // Close the mobile menu on navigation.
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? 'bg-white/95 shadow-[0_1px_0_rgba(11,31,63,0.08),0_8px_30px_rgba(11,31,63,0.06)] backdrop-blur' : 'bg-transparent'}`}>
      <div className={`hidden border-b transition-colors lg:block ${solid ? 'border-steel-100 bg-navy-900' : 'border-white/10 bg-navy-950/40'}`}>
        <div className="container-x flex h-9 items-center justify-between text-xs text-white/75">
          <span>{site.tagline}</span>
          <div className="flex items-center gap-5">
            <a href={links.tel} className="hover:text-gold-400">Call: {site.contact.phone.display}</a>
            <a href={links.mailto()} className="hover:text-gold-400">{site.contact.email}</a>
          </div>
        </div>
      </div>
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link to="/" aria-label={`${site.name} — Home`} className="shrink-0">
          <Logo light={!solid} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.dropdown ? (
              <div key={item.to} className="group relative">
                <NavLink to={item.to} className={({ isActive }) => navClass(isActive, solid)}>
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden />
                </NavLink>
                <div className="invisible absolute top-full left-1/2 w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-xl border border-steel-100 bg-white p-3 shadow-2xl shadow-navy-900/15">
                    {services.map((s) => (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="flex items-center gap-3 rounded-lg p-2.5 text-sm text-navy-900 transition hover:bg-steel-50">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-electric-100 text-electric-600">
                          <s.icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="font-medium">{s.shortTitle}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => navClass(isActive, solid)}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a href={links.tel} className={`hidden h-10 w-10 items-center justify-center rounded-md border transition sm:flex lg:hidden ${solid ? 'border-steel-200 text-navy-900' : 'border-white/30 text-white'}`} aria-label={`Call ${site.contact.phone.display}`}>
            <Phone className="h-4 w-4" />
          </a>
          <Link to="/quote" className="hidden rounded-md bg-gold-500 px-4 py-2.5 font-display text-sm font-semibold text-navy-900 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 sm:inline-flex">
            Request a Quote
          </Link>
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-md lg:hidden ${solid ? 'text-navy-900' : 'text-white'}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div id="mobile-nav" className={`overflow-y-auto border-t border-steel-100 bg-white transition-[max-height] duration-300 lg:hidden ${open ? 'max-h-[calc(100dvh-4rem)]' : 'max-h-0 border-t-0'}`}>
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => `block rounded-md px-3 py-3 font-display font-semibold ${isActive ? 'bg-electric-100 text-electric-600' : 'text-navy-900'}`}>
                  {item.label}
                </NavLink>
                {item.dropdown && (
                  <ul className="mt-1 mb-2 ml-3 grid grid-cols-1 gap-0.5 border-l-2 border-steel-100 pl-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`} className="block rounded px-2 py-2 text-sm text-steel-700 hover:text-electric-600">
                          {s.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2 border-t border-steel-100 pt-4 sm:grid-cols-2">
            <Link to="/quote" className="rounded-md bg-gold-500 px-4 py-3 text-center font-display font-semibold text-navy-900">
              Request a Quote
            </Link>
            <a href={links.tel} className="flex items-center justify-center gap-2 rounded-md border border-steel-200 px-4 py-3 font-display font-semibold text-navy-900">
              <Phone className="h-4 w-4" /> {site.contact.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

function navClass(isActive: boolean, solid: boolean) {
  const color = solid
    ? isActive ? 'text-electric-600' : 'text-navy-900 hover:text-electric-600'
    : isActive ? 'text-gold-400' : 'text-white/90 hover:text-gold-400'
  return `flex items-center gap-1 rounded-md px-3.5 py-2 font-display text-sm font-semibold transition-colors ${color}`
}
