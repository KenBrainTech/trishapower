type Props = { className?: string; light?: boolean; showText?: boolean }

/** Vector recreation of the Trisha Power "T" mark from the business card. */
export function LogoMark({ className = 'h-10 w-10', light = false }: { className?: string; light?: boolean }) {
  const navy = light ? '#ffffff' : '#102a52'
  return (
    <svg viewBox="0 0 64 56" className={className} aria-hidden="true">
      <path d="M4 3h34v7H22v43h-7V13.5C15 11.5 13.5 10 11.5 10H4z" fill={navy} />
      <path d="M26 15h7v38h-7z" fill={navy} />
      <path d="M41 3h20l-2.5 7H41z" fill="#f7ad1f" />
      <path d="M41 15h15l-2.5 6.5H41z" fill="#f7ad1f" />
    </svg>
  )
}

export function Logo({ className = '', light = false, showText = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-10 shrink-0" light={light} />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-lg font-bold tracking-wide ${light ? 'text-white' : 'text-navy-900'}`}>
            Trisha Power
          </span>
          <span className={`mt-1 font-display text-[0.62rem] font-semibold tracking-[0.2em] uppercase ${light ? 'text-electric-300' : 'text-electric-600'}`}>
            and Automation
          </span>
        </span>
      )}
    </span>
  )
}
