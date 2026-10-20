import type { PanelVariant } from './services'

/**
 * Projects / Gallery entries.
 *
 * The entries below describe the KINDS of work the company undertakes and use
 * illustrations. Replace or extend them with real projects:
 *   1. Put the photo in /public/images/projects/ (e.g. pcc-ahmednagar.jpg, ~1600px wide).
 *   2. Add an entry with `image: '/images/projects/pcc-ahmednagar.jpg'`.
 *   3. Only add client names or locations you have permission to publish.
 */
export type Project = {
  title: string
  category: 'Panels' | 'Automation' | 'Site Work' | 'Maintenance'
  description: string
  variant: PanelVariant
  image?: string
  location?: string
  client?: string
}

export const projects: Project[] = [
  {
    title: 'PCC Panel Fabrication & Assembly',
    category: 'Panels',
    variant: 'pcc',
    description: 'Main LT distribution panels with ACB incomers, bus couplers and metered outgoing feeders.',
  },
  {
    title: 'MCC Panel Line-up',
    category: 'Panels',
    variant: 'mcc',
    description: 'Motor control feeders with DOL, star-delta and VFD starters for process and utility motors.',
  },
  {
    title: 'PLC & HMI Automation Panel',
    category: 'Automation',
    variant: 'plc',
    description: 'PLC-based control panel with HMI, I/O wiring and custom logic development.',
  },
  {
    title: 'APFC Capacitor Panel',
    category: 'Panels',
    variant: 'apfc',
    description: 'Automatic power factor correction with stepped capacitor banks and controller.',
  },
  {
    title: 'AMF & DG Control Panels',
    category: 'Panels',
    variant: 'amf',
    description: 'Automatic mains-to-DG changeover with interlocking, metering and DG control.',
  },
  {
    title: 'On-Site Cable Laying',
    category: 'Site Work',
    variant: 'cable',
    description: 'Power and control cable routing on trays, glanding, termination and testing.',
  },
  {
    title: 'Preventive Electrical Maintenance',
    category: 'Maintenance',
    variant: 'amc',
    description: 'Scheduled panel inspection, tightening, cleaning and testing under AMC.',
  },
  {
    title: 'Turnkey Electrical Execution',
    category: 'Site Work',
    variant: 'turnkey',
    description: 'Coordinated supply, installation and commissioning of the complete electrical scope.',
  },
  {
    title: 'DG Set Control Panel',
    category: 'Panels',
    variant: 'dg',
    description: 'Generator control, protection and metering panel configured to DG rating.',
  },
]
