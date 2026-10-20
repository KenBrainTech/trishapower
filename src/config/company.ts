/**
 * Company facts shown on the About page and homepage.
 *
 * IMPORTANT: Only publish facts the business can verify.
 * Every field below starts empty. Empty fields are hidden on the live site and
 * shown as dashed "placeholder" boxes while running `npm run dev`, so it is
 * easy to see what still needs to be filled in.
 */

export type Stat = { label: string; value: string }

export const company = {
  /** e.g. 'Founded in 20XX in Pune, Trisha Power and Automation began as ...' */
  history: '',

  /** e.g. { label: 'Years of Experience', value: '10+' } — leave value '' to hide. */
  stats: [
    { label: 'Years of Experience', value: '' },
    { label: 'Projects Completed', value: '' },
    { label: 'Panels Delivered', value: '' },
    { label: 'Industries Served', value: '' },
  ] as Stat[],

  /** e.g. ['ISO 9001:2015', 'CPRI type-tested design'] — only real, current certifications. */
  certifications: [] as string[],

  /** e.g. ['In-house fabrication bay', 'Powder-coating line', 'PLC programming lab'] */
  facilities: [] as string[],

  /** Brands/makes of switchgear and PLCs the team works with, e.g. ['Siemens', 'Schneider']. */
  makesHandled: [] as string[],
}

export const hasStats = () => company.stats.some((s) => s.value.trim() !== '')
