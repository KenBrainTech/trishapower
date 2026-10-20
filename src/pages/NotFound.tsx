import { Home, Zap } from 'lucide-react'
import { ButtonLink, PageHero } from '../components/ui'
import { useSeo } from '../lib/hooks'

export default function NotFound() {
  useSeo({ title: 'Page Not Found', description: 'The page you are looking for could not be found.', path: '/404' })
  return (
    <>
      <PageHero title="Page not found" crumbs={[{ label: 'Home', to: '/' }, { label: '404' }]} />
      <section className="py-20">
        <div className="container-x flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-600">
            <Zap className="h-8 w-8" aria-hidden />
          </span>
          <p className="mt-6 max-w-md text-steel-500">The page you’re looking for doesn’t exist or may have moved.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/" variant="secondary"><Home className="h-4 w-4" aria-hidden /> Back to home</ButtonLink>
            <ButtonLink to="/services" variant="outline">View services</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
