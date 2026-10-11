// Industry pages (C5). Page order: H1, lead, what gets in the way, what we build, one industry section, related work, CTA.
import type { Section } from './services'

export type Industry = {
  slug: string
  title: string
  summary: string
  metaTitle: string
  metaDescription: string
  h1: string
  lead: string
  pains: string[]
  systems: string[]
  special: Section
  proof: string[]
  services: string[] // the service pages this industry usually starts with
  faqs?: number[] // answers from the shared bank in site.ts (C10)
}

export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    title: 'Manufacturers and formulators',
    summary: 'Batch records, formula protection, stock and trade orders working as one system.',
    metaTitle: 'Software for manufacturers in Melbourne | RaPublisher',
    metaDescription:
      'Batch records, formula protection, stock, B2B orders and Xero working as one system, designed on your floor by Melbourne engineers.',
    h1: 'Software for Victorian manufacturers and formulators',
    lead: "RaPublisher builds software for Victorian manufacturers and formulators who've outgrown spreadsheets: chemicals and cleaning products, cosmetics, food and drink, and made-to-order products. [CONFIRM which sub-sectors we can show proof for] We're based in Melbourne's south-east, Australia's biggest manufacturing region, so for most of the region a site walk is a short drive away. [CONFIRM suburb]",
    pains: [
      'Batch and production records on paper or in spreadsheets.',
      'Formulas in a shared folder that too many people can open.',
      'Raw materials and finished goods that never match the shelf.',
      'Safety data sheets and labels managed by hand.',
      'Tracing a batch for a complaint or recall takes days.',
      'Trade orders retyped from email into the system.',
    ],
    systems: [
      'Production and batch records, with batch numbers carried from raw materials to dispatch.',
      'A formula vault: access by role, version history, and a log of every view and change.',
      'Raw materials and finished goods tracked by location, batch and expiry.',
      'A document library linking safety data sheets and specifications to each product.',
      'Traceability reports you can run yourself, from raw material to dispatch.',
      'B2B ordering with customer price lists, connected to Xero or MYOB.',
    ],
    special: {
      heading: 'Your formulas stay yours',
      body: "Your formulas are the business. We design systems so the people who need a formula can see it, nobody else can, and every view and change is logged. Production sees what this batch needs without seeing the master formula. Exports are controlled, sign-in uses multi-factor authentication, where your data is hosted is agreed with you first, and we sign a confidentiality agreement before we see anything.\n\nWe don't give compliance advice. We make your records easier to keep, find and prove.",
    },
    proof: ['ccsm-mobile-commerce'],
    services: ['operations-software', 'integrations'],
    faqs: [12, 11],
  },
  {
    slug: 'wholesale-distribution',
    title: 'Wholesalers and distributors',
    summary: 'B2B ordering, customer price lists and stock that agree with each other.',
    metaTitle: 'B2B ordering and stock for wholesalers | RaPublisher',
    metaDescription:
      'Trade ordering portals, customer price lists, stock across warehouses and accounting integration that agree with each other. Melbourne.',
    h1: 'B2B ordering, price lists and stock that agree with each other',
    lead: 'RaPublisher builds B2B ordering, price list and stock systems in Melbourne for wholesalers and distributors whose trade customers still order by email and phone, and whose price lists live in spreadsheets.',
    pains: [
      'Trade orders by email, phone and text, all retyped.',
      "A different price list for every big customer, kept in someone's head.",
      "RRP, trade and distributor pricing that don't line up across channels.",
      'Stock spread across warehouses and vans.',
      'Reps writing orders on paper.',
      'Month-end spent reconciling the store, the inventory app and the books.',
    ],
    systems: [
      'A B2B ordering portal, on Shopify or custom, where trade customers see their own prices.',
      'Customer price lists, tiers and minimum order rules in one place.',
      'Web enquiries reviewed and turned into approved trade accounts.',
      'Stock by warehouse and bin, with reconciliation reports.',
      'A simple ordering app for reps.',
      'Orders, invoices and payments flowing into Xero or MYOB.',
    ],
    special: {
      heading: 'Built around how your customers order',
      body: "Your best trade customers shouldn't have to learn a new way to buy. We start with how they order today, by phone, email or a rep's visit, and make the online route quicker than all three.",
    },
    proof: ['ccsm-mobile-commerce'],
    services: ['integrations', 'operations-software'],
  },
  {
    slug: 'multi-site-services',
    title: 'Multi-site service teams',
    summary: 'Sign-in, inductions, rosters and site supplies for cleaning, facilities and field crews.',
    metaTitle: 'Software for cleaning and multi-site teams | RaPublisher',
    metaDescription:
      'Sign-in, inductions, rosters, site supplies and client reporting in one system for cleaning, facilities and field teams. Melbourne.',
    h1: 'Software for cleaning and facilities teams spread across many sites',
    lead: 'RaPublisher builds software in Melbourne for commercial cleaning, facilities and field service businesses where the work happens at client sites, not in an office.',
    pains: [
      "Nobody's sure who's on which site right now.",
      'Sign-in by text message, and timesheets disputed every pay run.',
      'Inductions on paper, and signed forms impossible to find.',
      'Staff phoning in supply orders from client sites.',
      "Clients asking for proof of service you can't easily produce.",
    ],
    systems: [
      'Digital sign-in and sign-out by site, feeding timesheets.',
      'Inductions with contracts, video and quizzes, recorded for each person.',
      "Rosters and site responsibilities on each person's phone.",
      'Supply ordering from site, with deliveries planned for drivers.',
      'An admin system for sites, staff, stock and orders.',
      'Service records and reports for your clients.',
    ],
    special: {
      heading: 'Fair to your people',
      body: 'Sign-in and location features work best when staff trust them. We build them with clear notice and consent, show people their own records, and collect only what you need. [CONFIRM with a lawyer]',
    },
    proof: ['super-pro-services', 'multi-site-operations-platform'],
    services: ['field-and-floor-apps', 'operations-software'],
  },
]

export const getIndustry = (slug?: string) => industries.find((i) => i.slug === slug)
