import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Building2,
  Cable,
  Cpu,
  Factory,
  Fuel,
  Gauge,
  Power,
  Wrench,
} from 'lucide-react'

export type PanelVariant = 'pcc' | 'plc' | 'mcc' | 'apfc' | 'amf' | 'dg' | 'amc' | 'cable' | 'turnkey'

export type Service = {
  slug: string
  variant: PanelVariant
  title: string
  shortTitle: string
  icon: LucideIcon
  summary: string
  overview: string[]
  applications: string[]
  benefits: string[]
  scope: string[]
  /** Optional real photo (e.g. '/images/services/pcc.jpg' in /public). Falls back to illustration. */
  image?: string
  seoDescription: string
}

export const services: Service[] = [
  {
    slug: 'pcc-panels',
    variant: 'pcc',
    title: 'Power Control Center (PCC) Panels',
    shortTitle: 'PCC Panels',
    icon: Power,
    summary:
      'Main LT distribution panels that receive power from the transformer or DG and distribute it safely across your plant.',
    overview: [
      'A Power Control Center is the heart of a low-tension electrical distribution system. It receives incoming supply from the transformer and/or DG set and feeds downstream MCCs, sub-distribution boards and large loads through properly rated incomers, bus couplers and outgoing feeders.',
      'We design and build PCC panels to suit your load schedule, fault level and site layout — with attention to busbar sizing, segregation, protection coordination, metering and ease of maintenance.',
    ],
    applications: [
      'Main LT distribution for factories and process plants',
      'Commercial buildings, malls and hospitals',
      'Infrastructure, utilities and pumping stations',
      'Transformer and DG incomer changeover systems',
    ],
    benefits: [
      'Panel configuration designed around your load schedule',
      'Safe, segregated busbar and feeder arrangement',
      'Protection, metering and interlocks as per requirement',
      'Neat wiring, clear labelling and documentation for maintenance',
    ],
    scope: [
      'ACB / MCCB incomers and outgoing feeders',
      'Bus couplers and incomer interlocking',
      'Multifunction meters and protection relays',
      'Single-front or double-front, floor-mounted construction',
    ],
    seoDescription:
      'Power Control Center (PCC) panel design, manufacturing and supply in Pune by Trisha Power and Automation. Customised LT distribution panels for industries.',
  },
  {
    slug: 'plc-control-panels',
    variant: 'plc',
    title: 'PLC Control Panels with Development',
    shortTitle: 'PLC Panels',
    icon: Cpu,
    summary:
      'Automation panels built around PLCs and HMIs, with logic development, testing and on-site commissioning support.',
    overview: [
      'PLC control panels bring reliable, repeatable control to machines and processes. We build the panel hardware and develop the control logic together, so the panel, wiring and program are engineered as one system.',
      'From I/O mapping and panel wiring to PLC programming, HMI screen development and commissioning, we help you move from manual or relay-based control to a maintainable automated system.',
    ],
    applications: [
      'Machine and process automation',
      'Water and wastewater treatment plants',
      'Material handling, conveyors and packaging lines',
      'Utility automation — pumps, compressors, HVAC',
    ],
    benefits: [
      'Hardware and software engineered together',
      'Logic developed to your process requirements',
      'HMI screens designed for operators',
      'Commissioning and post-installation support',
    ],
    scope: [
      'PLC, HMI and I/O module integration',
      'Control logic development and simulation',
      'VFD, soft starter and instrument interfacing',
      'Commissioning, documentation and training',
    ],
    seoDescription:
      'PLC control panels with PLC programming and HMI development in Pune. Industrial automation panels built and commissioned by Trisha Power and Automation.',
  },
  {
    slug: 'mcc-panels',
    variant: 'mcc',
    title: 'Motor Control Center (MCC) Panels',
    shortTitle: 'MCC Panels',
    icon: Factory,
    summary:
      'Centralised motor starting, protection and control for pumps, fans, compressors and process drives.',
    overview: [
      'Motor Control Centers group the starters, protection and controls for multiple motors into a single, organised panel. This simplifies operation, improves safety and makes maintenance faster.',
      'We build MCC panels with DOL, star-delta, soft-starter and VFD feeders as required, with local/remote controls, indication and interlocks matched to your process.',
    ],
    applications: [
      'Process plants and manufacturing units',
      'Pumping stations and water systems',
      'HVAC, cooling towers and compressor houses',
      'Material handling and conveyor systems',
    ],
    benefits: [
      'Centralised, organised motor control',
      'Proper motor protection and coordination',
      'Easy identification and maintenance of feeders',
      'Starter types selected per motor and duty',
    ],
    scope: [
      'DOL, star-delta, soft starter and VFD feeders',
      'Motor protection relays and overload protection',
      'Local / remote control and indication',
      'Fixed or draw-out style feeder arrangement',
    ],
    seoDescription:
      'Motor Control Center (MCC) panel manufacturing in Pune. DOL, star-delta, soft starter and VFD feeders by Trisha Power and Automation.',
  },
  {
    slug: 'apfc-panels',
    variant: 'apfc',
    title: 'APFC Panels',
    shortTitle: 'APFC Panels',
    icon: Gauge,
    summary:
      'Automatic Power Factor Correction panels that help maintain power factor and reduce reactive power penalties.',
    overview: [
      'Automatic Power Factor Correction (APFC) panels switch capacitor banks in and out automatically to keep your installation’s power factor close to the target value as the load changes.',
      'We size the capacitor steps, select the controller and switching devices, and build the panel to suit your load profile and site conditions.',
    ],
    applications: [
      'Industries with large inductive loads',
      'Commercial complexes and institutions',
      'Facilities facing low power factor penalties',
      'Installations being expanded with new loads',
    ],
    benefits: [
      'Helps maintain power factor as load varies',
      'Can reduce reactive power charges on electricity bills',
      'Reduces current drawn for the same active load',
      'Automatic operation with controller display',
    ],
    scope: [
      'APFC relay / controller selection',
      'Capacitor bank sizing and stepping',
      'Capacitor duty contactors or thyristor switching',
      'Detuned reactors where harmonics are present',
    ],
    seoDescription:
      'APFC (Automatic Power Factor Correction) panels in Pune. Capacitor bank panels designed and built by Trisha Power and Automation.',
  },
  {
    slug: 'amf-panels',
    variant: 'amf',
    title: 'AMF Panels',
    shortTitle: 'AMF Panels',
    icon: Activity,
    summary:
      'Auto Mains Failure panels that start the DG and transfer the load automatically when grid supply fails.',
    overview: [
      'An Auto Mains Failure (AMF) panel continuously monitors mains supply. When the mains fail, it starts the DG set, transfers the load once the generator is ready, and returns the load to mains — and stops the DG — when supply is restored.',
      'We build AMF panels with suitable controllers, changeover arrangement and interlocking for safe, automatic backup power.',
    ],
    applications: [
      'Factories and process-critical loads',
      'Hospitals, hotels and commercial buildings',
      'Residential societies and IT facilities',
      'Pumping and utility installations',
    ],
    benefits: [
      'Automatic changeover without manual intervention',
      'Mechanical and electrical interlocking for safety',
      'Monitoring of mains and DG parameters',
      'Reduced downtime during power failures',
    ],
    scope: [
      'AMF controller integration',
      'Contactor / ACB based changeover',
      'Battery charger and DG start-stop control',
      'Mains and DG metering and indication',
    ],
    seoDescription:
      'AMF (Auto Mains Failure) panels for DG sets in Pune. Automatic mains-to-generator changeover panels by Trisha Power and Automation.',
  },
  {
    slug: 'dg-set-control-panels',
    variant: 'dg',
    title: 'DG Set Control Panels',
    shortTitle: 'DG Control Panels',
    icon: Fuel,
    summary:
      'Control, protection and metering panels for diesel generator sets, including synchronising requirements.',
    overview: [
      'DG set control panels provide starting, protection, metering and control for diesel generators. Depending on the installation, this can range from a single-DG control panel to multi-DG arrangements.',
      'We build DG panels matched to the generator rating and site requirement, with the protection and metering your operations team needs.',
    ],
    applications: [
      'Standby and prime power installations',
      'Industrial and commercial backup systems',
      'Multi-DG installations',
      'Construction and remote sites',
    ],
    benefits: [
      'Generator protection and monitoring in one panel',
      'Configured to generator rating and application',
      'Clear metering and alarm indication',
      'Built for easy operation and servicing',
    ],
    scope: [
      'DG controller and protection',
      'Incomer breaker and outgoing feeders',
      'Engine and electrical parameter metering',
      'Synchronising arrangement where required',
    ],
    seoDescription:
      'DG set control panels in Pune. Diesel generator control, protection and metering panels by Trisha Power and Automation.',
  },
  {
    slug: 'amc-electrical-maintenance',
    variant: 'amc',
    title: 'AMC Maintenance (Electrical)',
    shortTitle: 'Electrical AMC',
    icon: Wrench,
    summary:
      'Annual Maintenance Contracts for electrical panels and installations — preventive care and breakdown support.',
    overview: [
      'Regular maintenance keeps electrical systems safe and reduces unplanned shutdowns. Our electrical AMC covers scheduled preventive maintenance of panels and installations along with breakdown support.',
      'The scope and visit frequency are agreed with you based on your installation and how critical it is to your operations.',
    ],
    applications: [
      'Factories and process plants',
      'Commercial buildings and complexes',
      'Residential societies',
      'Institutions and utilities',
    ],
    benefits: [
      'Planned preventive maintenance schedule',
      'Early detection of loose connections and wear',
      'Breakdown support as per agreed terms',
      'Service reports for your records',
    ],
    scope: [
      'Panel cleaning, tightening and inspection',
      'Checking of breakers, relays and contactors',
      'Insulation resistance and earthing checks',
      'Recommendations for corrective work',
    ],
    seoDescription:
      'Electrical AMC (Annual Maintenance Contract) services in Pune for panels and electrical installations by Trisha Power and Automation.',
  },
  {
    slug: 'cable-laying-projects',
    variant: 'cable',
    title: 'On-Site Cable Laying Projects',
    shortTitle: 'Cable Laying',
    icon: Cable,
    summary:
      'Laying, termination and testing of power and control cables on site — in trays, trenches and conduits.',
    overview: [
      'Correct cable laying is essential for a safe, long-lasting electrical installation. We execute on-site cable laying for power and control circuits, including routing, dressing, glanding and termination.',
      'Our team works to your drawings and site conditions, coordinating with other trades for a clean, orderly installation.',
    ],
    applications: [
      'New plant and building electrification',
      'Plant expansions and panel relocations',
      'Transformer, DG and panel interconnections',
      'Control and instrumentation cabling',
    ],
    benefits: [
      'Execution as per drawings and site conditions',
      'Neat cable dressing and identification',
      'Proper glanding and termination',
      'Testing before handover',
    ],
    scope: [
      'Cable tray, trench and conduit routing',
      'LT power and control cable laying',
      'Glanding, lugging and termination',
      'Cable tagging and insulation testing',
    ],
    seoDescription:
      'On-site cable laying, termination and testing projects in Pune by Trisha Power and Automation. LT power and control cabling for industries.',
  },
  {
    slug: 'turnkey-electrical-projects',
    variant: 'turnkey',
    title: 'Turnkey Electrical Project Solutions',
    shortTitle: 'Turnkey Projects',
    icon: Building2,
    summary:
      'Single-point responsibility for electrical projects — from panels and cabling to installation and commissioning.',
    overview: [
      'Turnkey execution gives you one accountable partner for the electrical scope of your project. We bring together panel manufacturing, cable laying, installation and commissioning under a single coordinated plan.',
      'This reduces interface issues between multiple vendors and helps keep the project on schedule.',
    ],
    applications: [
      'New factory and warehouse electrification',
      'Plant expansions and modernisation',
      'Commercial and institutional buildings',
      'Utility and infrastructure projects',
    ],
    benefits: [
      'Single point of contact and responsibility',
      'Coordinated panels, cabling and installation',
      'Fewer vendor interfaces and delays',
      'Testing and commissioning before handover',
    ],
    scope: [
      'Requirement study and solution planning',
      'Supply of panels and electrical materials',
      'Installation, cabling and termination',
      'Testing, commissioning and handover',
    ],
    seoDescription:
      'Turnkey electrical project solutions in Pune — panels, cabling, installation and commissioning by Trisha Power and Automation.',
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
