import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
import { PageLoader } from './ui'
import { ErrorBoundary } from './ErrorBoundary'

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only z-[60] rounded bg-gold-500 px-4 py-2 font-semibold text-navy-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<div className="pt-24"><PageLoader /></div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
