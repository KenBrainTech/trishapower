/**
 * Central business configuration.
 * Update contact details here — every page, link and form reads from this file.
 */

export const site = {
  name: 'Trisha Power and Automation',
  shortName: 'Trisha Power',
  tagline: 'Electrical Panel Manufacturer, Supplier, Service Provider & Exporter',
  url: 'https://www.trishapower.in',
  domain: 'www.trishapower.in',

  contact: {
    person: 'Sachin Girhepunje',
    designation: 'HOD – Sales & Marketing',
    /** Voice calls. Display format and dialable (E.164) format. */
    phone: { display: '+91-9209904072', tel: '+919209904072' },
    /** WhatsApp chats. Number without "+" or spaces, as required by wa.me links. */
    whatsapp: { display: '+91-9890434730', number: '919890434730' },
    email: 'sales.trishapower@gmail.com',
  },

  address: {
    lines: [
      'Sr. No. 68, Near Bharat Petrol Pump,',
      'Navale Vasti, Tathawade,',
      'Taluka Mulshi, District Pune – 411033,',
      'Maharashtra, India.',
    ],
    locality: 'Tathawade, Pune',
    region: 'Maharashtra',
    postalCode: '411033',
    country: 'IN',
    /** Query used for the embedded Google Map and "Get directions" link. */
    mapQuery: 'Bharat Petrol Pump, Navale Vasti, Tathawade, Pune 411033',
  },

  /** Default greeting used when a visitor opens WhatsApp from the website. */
  whatsappGreeting: 'Hello Trisha Power and Automation, I would like to enquire about your electrical panel services.',
} as const

export const links = {
  tel: `tel:${site.contact.phone.tel}`,
  mailto: (subject = 'Enquiry from website', body = '') =>
    `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`,
  whatsapp: (text: string = site.whatsappGreeting) =>
    `https://wa.me/${site.contact.whatsapp.number}?text=${encodeURIComponent(text)}`,
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.mapQuery)}`,
}
