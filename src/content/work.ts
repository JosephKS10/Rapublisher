// Case studies (B8, C6). Every entry so far is engagement 'prior': credit the engineers, never "delivered by RaPublisher".
// Render rules (A3): outcomes only when verified, testimonials only with permission, client names only with clientNamePermission.

// A processed screenshot from scripts/images.js: `src` is the large WebP, `small` the narrow one.
// `focus` is the part to keep in view (a CSS object-position) where a frame is a different shape from the screenshot.
export type Shot = { src: string; small?: string; alt: string; w: number; h: number; mobile?: boolean; caption?: string; focus?: string }

const shot = (base: string, alt: string, w: number, h: number, small: number, mobile = false): Shot => ({
  src: `/work/${base}-${w}.webp`,
  small: `/work/${base}-${small}.webp`,
  alt,
  w,
  h,
  mobile,
})

export type Work = {
  slug: string
  title: string
  metaTitle?: string // when title plus " | RaPublisher" runs over 60 characters (A4)
  summary: string
  metaDescription?: string // under 155 characters; otherwise the first sentence of the summary is used
  client: string
  clientNamePermission: boolean
  clientDescription: string
  location: string
  industry: 'manufacturing' | 'wholesale' | 'services' | 'other'
  services: string[]
  ledBy: string[]
  engagement: 'rapublisher' | 'prior'
  year?: number
  duration?: string
  scope: string
  problem: string
  onSite?: string
  built: string[]
  rollout?: string
  outcomes: { metric: string; value: string; verified: boolean }[]
  testimonial?: { quote: string; name?: string; role: string; company: string; permission: boolean; sourceUrl?: string }
  testimonialTodo?: string
  stack: string[]
  images: Shot[]
  phone?: 'silver' // colour of the phone its mobile screens sit in; orange when left out
  featured: boolean
  draft: boolean
  note?: string
}

export const work: Work[] = [
  {
    slug: 'super-pro-services',
    metaDescription: 'How our engineers built a public website, a staff portal and digital sign-in as one system for Super Pro Services, a cleaning services business.',
    title: 'A public website and a workforce portal in one system',
    metaTitle: 'Super Pro Services workforce portal | RaPublisher',
    summary:
      'A cleaning services business needed to win corporate clients online and manage its cleaning staff behind the scenes. Our engineers built both as one system.',
    client: 'Super Pro Services',
    clientNamePermission: true,
    clientDescription: 'A cleaning services business',
    location: '[TODO suburb, state]',
    industry: 'services',
    services: ['field-and-floor-apps'],
    ledBy: ['Joseph Saji [CONFIRM]'],
    engagement: 'prior',
    scope: 'Website, workforce portal, digital sign-in and out',
    problem:
      "Super Pro Services needed two things at once: a website credible enough to win corporate cleaning contracts, and an internal portal to run a workforce spread across client sites. [TODO: how they managed rosters and hours before, in the client's words]",
    onSite: '[TODO: one observation that shaped the design, such as how staff signed in before]',
    built: [
      "A public website presenting the company's services and culture to corporate clients.",
      "A secure staff portal showing each person's schedule and site responsibilities.",
      'Digital sign-in and sign-out that records hours accurately for each site.',
    ],
    rollout: '[TODO]',
    outcomes: [],
    testimonialTodo: '[TODO: fresh quote from the General Manager, with written permission]',
    stack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    images: [
      shot('super-pro-services/dashboard', 'Super Pro Services staff portal dashboard with a monthly task calendar; personal details blurred', 1800, 899, 960),
      shot('super-pro-services/schedule', 'Staff schedule in the Super Pro Services portal, with cleaning jobs rostered across March', 1800, 899, 960),
      shot('super-pro-services/home', 'Super Pro Services public website home page', 1800, 899, 960),
      shot('super-pro-services/services', 'Super Pro Services website services page', 1800, 899, 960),
    ],
    featured: true,
    draft: false,
  },
  {
    slug: 'ccsm-mobile-commerce',
    metaDescription: 'A native iOS and Android ordering app for CCSM in Melbourne, with Shopify running products, stock, cart and checkout behind it.',
    title: 'A mobile ordering app running on Shopify',
    summary: 'A Melbourne business wanted customers ordering from a fast mobile app without giving up Shopify behind the scenes.',
    client: 'CCSM [CONFIRM full name]',
    clientNamePermission: true,
    clientDescription: 'A Melbourne business',
    location: 'Melbourne VIC',
    industry: 'wholesale',
    services: ['integrations'],
    ledBy: ['Joseph Saji [CONFIRM]'],
    engagement: 'prior',
    scope: 'Mobile commerce app on Shopify, live stock and cart sync, secure checkout',
    problem: 'A Melbourne business wanted customers ordering from a fast mobile app without giving up Shopify behind the scenes.',
    built: [
      'A native app for iOS and Android, with Shopify running products, stock and orders behind it.',
      'Live stock levels, and a cart that stays in sync with the store.',
      "Shopify's secure checkout inside the app, so payments stay with Shopify.",
    ],
    outcomes: [],
    stack: ['React Native', 'Expo', 'Redux', 'Shopify Storefront API'],
    images: [
      shot('ccsm-mobile-commerce/home', 'CCSM app home screen with product categories and best sellers', 900, 1948, 480, true),
      shot('ccsm-mobile-commerce/product', 'CCSM app product page with variants and add to cart', 900, 1948, 480, true),
      shot('ccsm-mobile-commerce/menu', 'CCSM app category menu', 900, 1948, 480, true),
      shot('ccsm-mobile-commerce/cart', 'CCSM app cart ready for checkout', 900, 1948, 480, true),
      shot('ccsm-mobile-commerce/splash', 'CCSM app splash screen', 900, 1948, 480, true),
    ],
    featured: true,
    draft: false,
    note: '[DECISION: if the B2B ordering work is the same client, merge them into one named case study.]',
  },
  {
    slug: 'multi-site-operations-platform',
    metaDescription: 'One platform for stock, orders, sites, inductions and deliveries, built for a multi-site commercial cleaning business by our engineers.',
    title: 'One system for stock, orders, sites, inductions and deliveries',
    metaTitle: 'Multi-site operations platform | RaPublisher',
    summary:
      'A multi-site cleaning operation was running on spreadsheets and disconnected processes. Our engineers built one platform connecting the office, the drivers and the cleaners on site.',
    client: '[CONFIRM name]',
    clientNamePermission: false,
    clientDescription: 'A multi-site commercial cleaning business',
    location: '[TODO]',
    industry: 'services',
    services: ['operations-software', 'field-and-floor-apps'],
    ledBy: ['Joseph Saji [CONFIRM]'],
    engagement: 'prior',
    scope: 'Admin system, induction portal, driver logistics, site ordering app',
    problem:
      "A multi-site cleaning operation was running on spreadsheets and disconnected processes. [TODO: the situation in the client's words]",
    built: [
      'An admin system for stock, orders, sites and staff records.',
      'An induction portal with digital contracts, training videos and quizzes.',
      'Route assignment and delivery tracking for drivers.',
      'A mobile ordering app so cleaners can request supplies from their site.',
    ],
    outcomes: [],
    testimonialTodo: '[TODO: fresh quote from the client, with written permission]',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Progressive web app'],
    images: [
      { ...shot('multi-site-operations-platform/calendar', 'Operations platform calendar of stock orders; customer details blurred', 1800, 884, 960), focus: 'left top' },
      shot('multi-site-operations-platform/orders', 'Operations platform order dashboard; customer details blurred', 1800, 885, 960),
      shot('multi-site-operations-platform/sites', 'Operations platform site list; client and site details blurred', 1800, 884, 960),
      shot('multi-site-operations-platform/stock-order', 'Stock ordering screen a cleaner uses on their phone', 391, 845, 391, true),
    ],
    featured: true,
    draft: false,
    note: "[CONFIRM: whether this platform is a client's system or a product we own and run, and whose name can appear.]",
  },
  {
    slug: 'calpinemate-employee-app',
    phone: 'silver',
    metaDescription: 'CalpineMate: an employee portal rebuilt as an iOS and Android app with biometric sign-in, live leave balances and push notifications.',
    title: 'Taking an employee portal from the desk to the phone',
    metaTitle: 'CalpineMate employee app | RaPublisher',
    summary:
      "A company's employee management portal worked on a desktop but not for staff on the move. Our engineers rebuilt it as a mobile app.",
    client: 'UVJ Technologies',
    clientNamePermission: true,
    clientDescription: 'A technology company',
    location: '[CONFIRM location]',
    industry: 'other',
    services: ['field-and-floor-apps'],
    ledBy: ['Joseph Saji [CONFIRM]'],
    engagement: 'prior',
    scope: 'Mobile app for leave, notices and staff records',
    problem: "A company's employee management portal worked on a desktop but not for staff on the move.",
    built: [
      "An iOS and Android app carrying across the web portal's key functions.",
      'Biometric sign-in.',
      'Leave requests and balances that update in real time.',
      'Scheduled push notifications for reminders and notices.',
    ],
    outcomes: [],
    stack: ['React Native', 'Expo', 'Node.js scheduled jobs', 'Firebase'],
    images: [
      shot('calpinemate-employee-app/dashboard', 'CalpineMate app dashboard with calendar and quick links', 739, 1450, 480, true),
      shot('calpinemate-employee-app/calendar', 'CalpineMate calendar of public holidays', 739, 1600, 480, true),
      shot('calpinemate-employee-app/notifications', 'CalpineMate event notification', 739, 1600, 480, true),
      shot('calpinemate-employee-app/login', 'CalpineMate sign-in screen', 739, 1600, 480, true),
    ],
    featured: false,
    draft: false,
  },
  {
    slug: 'b2b-ordering-cleaning-chemicals',
    title: 'Trade ordering, customer price lists and stock that match',
    summary: 'B2B ordering on Shopify for a Melbourne manufacturer, with customer price lists and stock that agrees with the books.',
    client: '',
    clientNamePermission: false,
    clientDescription: 'A Melbourne cleaning-chemicals manufacturer',
    location: 'Melbourne VIC',
    industry: 'manufacturing',
    services: ['integrations'],
    ledBy: ['[CONFIRM]'],
    engagement: 'prior',
    scope: 'B2B ordering on Shopify, customer price lists, trade account approvals, inventory reconciliation, accounting integration',
    problem: '[TODO]',
    built: [
      "Trade pricing tiers alongside RRP, with each customer's own price list.",
      'Accepted quotes turned into customer-specific price lists.',
      'Web enquiries converted into approved trade accounts without retyping.',
      'Stock reconciled across about 1,300 items, with the warehouse structure fixed so locations make sense.',
      'Inventory connected to the accounting system so the books match the shelf. [CONFIRM which systems to name]',
    ],
    outcomes: [],
    stack: [],
    images: [],
    featured: false,
    draft: true, // needs client permission, outcomes and screenshots with data blurred
  },
  {
    slug: 'storefront-rebuild',
    title: 'An online store rebuilt without the original code',
    summary: 'A complete rebuild of a storefront, payments and order processing, without access to the original code.',
    client: '',
    clientNamePermission: false,
    clientDescription: 'An Australian consumer products brand',
    location: '[TODO]',
    industry: 'other',
    services: ['rescue'],
    ledBy: ['[CONFIRM]'],
    engagement: 'prior',
    scope: 'Complete rebuild of the storefront, payments and order processing',
    problem: '[TODO: what was wrong before, and what changed]',
    built: [
      "A new storefront, rebuilt from the live site and the owner's knowledge, without access to the original code.",
      'A new back end for orders and payments.',
    ],
    outcomes: [],
    stack: ['React', 'Node.js', 'Stripe'],
    images: [],
    featured: false,
    draft: true, // [CONFIRM] it launched and the client agrees
  },
]

export const published = work
  .filter((w) => !w.draft)
  .sort((a, b) => Number(a.engagement === 'prior') - Number(b.engagement === 'prior'))

export const getWork = (slug?: string) => published.find((w) => w.slug === slug)
export const clientLabel = (w: Work) => (w.clientNamePermission ? w.client : w.clientDescription)
export const verifiedOutcomes = (w: Work) => w.outcomes.filter((o) => o.verified)
