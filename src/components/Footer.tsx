import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Logo } from './Logo'
import { services } from '../data/services'
import { links, site } from '../config/site'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="blueprint relative bg-navy-950 text-white/70">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-electric-400 via-electric-300 to-gold-500" />
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:py-16">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Electrical panel manufacturer, supplier, service provider and exporter — PCC, MCC, PLC, APFC, AMF and DG panels, electrical AMC, cable laying and turnkey projects.
          </p>
          <Link to="/quote" className="mt-6 inline-flex rounded-md bg-gold-500 px-4 py-2.5 font-display text-sm font-semibold text-navy-900 transition hover:bg-gold-400">
            Request a Quote
          </Link>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ['/', 'Home'],
              ['/about', 'About Us'],
              ['/services', 'Services'],
              ['/projects', 'Projects / Gallery'],
              ['/contact', 'Contact Us'],
              ['/quote', 'Request a Quote'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-gold-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="transition hover:text-gold-400">
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Get in touch</h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li>
              <a href={links.tel} className="flex gap-3 transition hover:text-gold-400">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                <span><span className="block text-white">{site.contact.phone.display}</span>{site.contact.person}, {site.contact.designation}</span>
              </a>
            </li>
            <li>
              <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition hover:text-gold-400">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                <span>WhatsApp: {site.contact.whatsapp.display}</span>
              </a>
            </li>
            <li>
              <a href={links.mailto()} className="flex gap-3 break-all transition hover:text-gold-400">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                {site.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
              <address className="not-italic">{site.address.lines.join(' ')}</address>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  )
}
