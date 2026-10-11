// Case studies that are not approved for publication (B8). Nothing imports this file, which is what keeps their
// text out of the script bundle: a `draft` flag in work.ts would hide them from pages but still ship the words.
// To publish one, move its object into the `work` array in work.ts and set draft: false.
import type { Work } from './work'

export const draftWork: Work[] = [
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
