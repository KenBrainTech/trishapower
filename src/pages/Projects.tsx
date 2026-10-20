import { useMemo, useState } from 'react'
import { MapPin } from 'lucide-react'
import { PageHero, DevPlaceholder } from '../components/ui'
import { ServiceVisual } from '../components/PanelArt'
import { CtaBand } from '../components/CtaBand'
import { projects, type Project } from '../data/projects'
import { site } from '../config/site'
import { useReveal, useSeo } from '../lib/hooks'

const filters = ['All', 'Panels', 'Automation', 'Site Work', 'Maintenance'] as const

export default function Projects() {
  useSeo({
    title: 'Projects & Gallery',
    description: `Electrical panel manufacturing, PLC automation, cable laying and maintenance work by ${site.name}, Pune.`,
    path: '/projects',
  })
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [active, setActive] = useState<Project | null>(null)
  const ref = useReveal<HTMLDivElement>()
  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter])
  const hasPhotos = projects.some((p) => p.image)

  return (
    <div ref={ref}>
      <PageHero
        title="Projects & Gallery"
        intro="A look at the types of electrical panels, automation systems and site work we deliver."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects / Gallery' }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-x">
          {!hasPhotos && (
            <div className="mb-8">
              <DevPlaceholder>
                These tiles use illustrations. Add real project photos and details in <code>src/data/projects.ts</code> (photos go in <code>public/images/projects/</code>). Only publish client names you have permission to show.
              </DevPlaceholder>
            </div>
          )}
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 font-display text-sm font-semibold transition ${filter === f ? 'bg-navy-900 text-white' : 'bg-steel-100 text-navy-900 hover:bg-steel-200'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <button
                key={p.title}
                type="button"
                onClick={() => setActive(p)}
                className="group overflow-hidden rounded-xl border border-steel-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ServiceVisual variant={p.variant} image={p.image} alt={p.title} className="transition duration-500 group-hover:scale-[1.04]" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 font-display text-xs font-semibold text-navy-900">{p.category}</span>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-bold">{p.title}</h2>
                  <p className="mt-1.5 text-sm text-steel-500">{p.description}</p>
                  {p.location && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-steel-500">
                      <MapPin className="h-3.5 w-3.5" aria-hidden /> {p.location}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && <Lightbox project={active} onClose={() => setActive(null)} />}

      <CtaBand title="Planning a similar project?" />
    </div>
  )
}

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-[16/10]">
          <ServiceVisual variant={project.variant} image={project.image} alt={project.title} />
        </div>
        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h2 className="mt-2 text-xl font-bold">{project.title}</h2>
            <p className="mt-2 text-sm text-steel-500">{project.description}</p>
            {project.client && <p className="mt-2 text-sm text-steel-700">Client: {project.client}</p>}
          </div>
          <button type="button" autoFocus onClick={onClose} className="shrink-0 rounded-md border border-steel-200 px-4 py-2 font-display text-sm font-semibold text-navy-900 hover:bg-steel-50">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
