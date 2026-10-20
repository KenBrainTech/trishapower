import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { links, site } from '../config/site'

type State = { error: Error | null }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page error:', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    // A failed lazy chunk (e.g. after a new deploy) is fixed by a reload.
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 pb-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-gold-600">
          <AlertTriangle className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Something went wrong loading this page</h1>
        <p className="mt-3 max-w-md text-steel-500">
          Please try again. If the problem continues, call us on{' '}
          <a href={links.tel} className="font-semibold text-electric-600">{site.contact.phone.display}</a>.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-electric-600 px-5 py-3 font-display text-sm font-semibold text-white hover:bg-electric-500"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Reload page
        </button>
      </div>
    )
  }
}
