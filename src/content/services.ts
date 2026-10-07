// Service pages (C4). Page order: H1, lead, signs, what we build, extra sections, how it runs, investment, related work, questions, CTA.

export type Section = { heading: string; body?: string; items?: string[] }

export type Service = {
  slug: string
  title: string
  summary: string
  metaTitle: string
  metaDescription: string
  h1: string
  lead: string
  symptoms: string[]
  examples: string[]
  extra?: Section[]
  timeline?: string
  investment?: string
  relatedWork: string[]
  faqs: { q: string; a: string }[]
  cta?: string
}

export const services: Service[] = [
  {
    slug: 'operations-software',
    title: 'Operations software',
    summary: 'Orders, stock, production, quoting and scheduling in one system that fits how you work.',
    metaTitle: 'Operations software for Victorian businesses | RaPublisher',
    metaDescription:
      'Orders, stock, production, quoting and scheduling in one system built around how your business runs. Designed on site in Melbourne.',
    h1: 'Operations software that fits how you work',
    lead: 'Orders, stock, production, quoting and scheduling in one system, built around your process instead of bending your process around the software.',
    symptoms: [
      'Spreadsheets are the real system of record, and only one or two people understand them.',
      'Someone counts stock by hand before promising a delivery date.',
      'The production plan lives on a whiteboard.',
      'The same customer details are typed into three or four places.',
      'A simple report takes half a day to pull together.',
    ],
    examples: [
      'One order queue for email, phone, web and rep orders.',
      'Stock by location and bin, with batches, expiry dates and reorder points.',
      'Production and batch records, with formulas visible only to the people who need them.',
      "Quotes and order confirmations that use each customer's own price list.",
      'Scheduling for production runs, crews or deliveries.',
      "Dashboards built on live data, not last month's export.",
    ],
    timeline: 'A site walk, then a Blueprint, then a first phase of 6 to 12 weeks focused on the one workflow causing the most double handling.',
    investment: 'First phases typically A$30,000 to A$90,000 plus GST, fixed before we start. [DECISION]',
    relatedWork: ['multi-site-operations-platform'],
    faqs: [
      { q: 'Should we buy an ERP instead?', a: "Sometimes. If an off-the-shelf system fits most of how you work, we'll say so and can help connect it. Custom makes sense when your way of working is part of your edge, or when the gaps cause workarounds every day." },
      { q: 'Will it work with Xero or MYOB?', a: 'Yes. Your accounting system stays the source of truth for the books, and we connect to it.' },
      { q: 'Can we start small?', a: "That's how we prefer to start. Phase one tackles one workflow, and later phases build on it." },
    ],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    summary: "Shopify, Xero, MYOB, Zoho and your other tools sharing information, so it's entered once. [CONFIRM platform list]",
    metaTitle: 'Shopify, Xero and inventory integrations | RaPublisher',
    metaDescription:
      'Connect Shopify, Xero, MYOB, Zoho and your other tools so information is entered once and matches everywhere. Melbourne engineers.',
    h1: 'Connect the tools you already pay for',
    lead: "Shopify, Xero, MYOB, Zoho, your B2B ordering and your spreadsheets, sharing information so it's entered once and matches everywhere.",
    symptoms: [
      'Web orders get retyped into the accounting system.',
      'Stock levels in your store and your inventory app drift apart.',
      'Trade prices differ depending on where a customer orders.',
      "There's a chain of no-code automations nobody wants to touch.",
      'Month-end means days of reconciling.',
    ],
    examples: [
      'Orders, invoices and payments flowing from your store into Xero or MYOB.',
      'Stock synced between your store and your inventory system, with a daily reconciliation report.',
      'Trade customer accounts with their own price lists and tiers.',
      'Web enquiries turned into approved trade accounts without retyping.',
      'Payments and order processing for custom stores.',
      'Alerts when a sync fails, before a customer notices.',
      "[CONFIRM which platforms we've integrated in production, and list only those on the live page.]",
    ],
    timeline: 'Most integrations take 2 to 8 weeks.',
    investment: 'Typically A$8,000 to A$40,000 plus GST [DECISION], plus a Care plan to keep it healthy as platforms change.',
    relatedWork: ['ccsm-mobile-commerce', 'b2b-ordering-cleaning-chemicals'],
    faqs: [
      { q: 'Why not just use Zapier or Make?', a: "For simple, low-volume tasks they're great, and we'll use them where they fit. Once money, stock or customer accounts depend on a connection, you need error handling, logs and someone accountable when it breaks." },
      { q: 'What happens when Shopify or Xero change something?', a: 'Platforms update their connections regularly. Monitoring and updates are part of the Care plan.' },
    ],
  },
  {
    slug: 'ai-in-operations',
    title: 'AI in operations',
    summary: 'AI that reads, sorts and drafts the routine work, with people approving anything that matters.',
    metaTitle: 'Practical AI for operations | RaPublisher',
    metaDescription:
      'AI that reads documents, sorts enquiries and drafts the routine work, with people approving anything that matters. Melbourne engineers.',
    h1: 'Practical AI, with people in control',
    lead: 'We use AI where it saves real time on real work: reading purchase orders and invoices, sorting enquiries, drafting replies and spotting problems. People approve anything that matters.',
    symptoms: [
      'Purchase orders arrive as PDFs and get typed in by hand.',
      'Supplier invoices are keyed into the accounts one line at a time.',
      'Staff dig through shared drives for procedures and safety data sheets.',
      'Quotes are written from scratch every time.',
      'You have years of data and no time to look at it.',
    ],
    examples: [
      'Purchase orders and invoices read into draft orders and bills, waiting for approval.',
      'Enquiries sorted and routed, with draft replies.',
      'A search assistant over your own procedures, manuals and safety data sheets that shows where each answer came from.',
      'Flags for unusual stock movements, prices or timesheets.',
      'Shift handover and meeting summaries.',
    ],
    extra: [
      {
        heading: 'How we keep it safe',
        items: [
          "AI suggests. People decide anything that affects money, safety or someone's job.",
          'Every automated action is logged and can be reversed.',
          "Your data isn't used to train public models. [CONFIRM per provider and plan]",
          'Australian data hosting wherever the provider offers it. [CONFIRM per provider]',
          'We test accuracy on your real documents before go-live, and keep measuring after.',
          'You get a plain-English description of each automated decision for your privacy policy, ready for the new rules that start on 10 December 2026.',
        ],
      },
    ],
    timeline: 'A pilot of 3 to 6 weeks on one workflow, measured against how it works today.',
    investment: 'Pilots typically A$10,000 to A$30,000 plus GST [DECISION], plus usage costs paid directly to the AI provider.',
    relatedWork: [],
    faqs: [
      { q: 'Do we need to be "AI ready" first?', a: "No. If your team handles documents, emails or repeat decisions, there's usually a sensible place to start. We'll tell you at the site walk." },
      { q: 'Will it replace our staff?', a: "It's designed to take retyping off people's plates, not to replace the people. What you do with the time saved is your call." },
      { q: 'What do the new privacy rules mean for us?', a: 'From 10 December 2026, organisations covered by the Privacy Act that use personal information in automated decisions that could significantly affect someone must explain this in their privacy policy. We document every automated decision we build so your adviser can update yours. General information only, not legal advice.' },
    ],
  },
  {
    slug: 'field-and-floor-apps',
    title: 'Field and floor apps',
    summary: 'Simple apps for sign-in, inductions, job sheets, stock counts and deliveries.',
    metaTitle: 'Sign-in, induction and field apps | RaPublisher',
    metaDescription:
      "Simple apps for sign-in, inductions, job sheets, stock counts and deliveries, built for people who aren't at a desk. Melbourne engineers.",
    h1: "Apps for the people who aren't at a desk",
    lead: 'Simple, sturdy apps for sign-in, inductions, job sheets, stock counts, deliveries and checklists. Built for gloves, glare and patchy reception.',
    symptoms: [
      'Sign-in is a clipboard by the door or a group text.',
      'Inductions happen on paper, and nobody can find the signed forms.',
      'Timesheets get disputed every pay run.',
      'Crews phone the office to order supplies.',
      "Proof of delivery is a photo in someone's camera roll.",
    ],
    examples: [
      'Digital sign-in and sign-out by site, with hours that flow to payroll.',
      'Inductions with video, a short quiz and a digital signature, stored against each person.',
      'Run sheets and proof of delivery for drivers.',
      'Supply ordering for staff working on client sites.',
      'Checklists and incident reports with photos.',
      'Leave, rosters and notices in one staff app.',
    ],
    extra: [
      {
        heading: 'Built for the job',
        body: 'Big buttons, few steps, works offline where reception drops out, and runs on the phones people already carry. Location features come with clear notice and consent, because tracking where people are raises legal questions in Victoria. [CONFIRM with a lawyer before promoting location features]',
      },
    ],
    timeline: '4 to 10 weeks for a first version.',
    investment: 'Typically A$15,000 to A$60,000 plus GST. [DECISION]',
    relatedWork: ['super-pro-services', 'multi-site-operations-platform', 'calpinemate-employee-app'],
    faqs: [
      { q: 'Native app or web app?', a: "A web app that installs to the home screen is often enough, and it avoids app store delays. If you need biometric sign-in, background notifications or heavy offline use, we'll recommend native." },
      { q: 'Will the whole team actually use it?', a: "If it's built around what they already do and they're trained on site, yes. We test with the least enthusiastic users first." },
    ],
  },
  {
    slug: 'rescue',
    title: 'Rescue and hardening',
    summary: 'Taking over stalled projects and making AI-built tools safe to rely on.',
    metaTitle: 'Software rescue and AI-built app checks | RaPublisher',
    metaDescription:
      'Stalled project, vanished developer, or an AI-built tool your business now relies on? A fixed-fee check, a plain-English report and a fix.',
    h1: 'Rescue for stalled projects and AI-built tools',
    lead: "If a developer went quiet, a project stalled, or a tool someone built with AI has become critical, we'll check it, tell you straight what it needs, and fix it or rebuild it.",
    symptoms: [
      'Nobody can change the system without breaking something.',
      "The developer stopped replying, and you're not sure who has the passwords.",
      'A tool built with an AI app builder now runs part of the business.',
      "You don't know where your customer data lives or who can see it.",
      "You don't have the source code.",
    ],
    examples: [],
    extra: [
      {
        heading: 'The rescue check',
        body: 'Fixed fee, from A$2,500 plus GST. [DECISION]',
        items: [
          'We look at: who has access; where the data lives; exposed passwords and keys; backups, and whether they actually restore; security basics; code quality and outdated components; and whether you really own the accounts, code and domain.',
          'You get: a plain-English report, a ranked list of risks, a recommendation to fix or rebuild, and a fixed quote for the work.',
        ],
      },
      {
        heading: 'Why it matters',
        body: 'Tools built quickly with AI app builders can work well and still leave doors open. Security researchers scanning thousands of live AI-built apps have found serious vulnerabilities, exposed keys and leaking data at scale. [CONFIRM sources before quoting numbers on the live page]',
      },
    ],
    relatedWork: ['storefront-rebuild'],
    faqs: [
      { q: 'Will you judge us for building it with AI?', a: 'No. Building it was a smart way to learn what you need. Our job is to make it safe to rely on.' },
      { q: 'Can you work with our original developer?', a: 'Yes, and a proper handover helps everyone.' },
      { q: "What if we don't have the code?", a: "We can often rebuild from the live system, your data and your team's knowledge. Our engineers have rebuilt an online store that way. [CONFIRM it launched]" },
    ],
    cta: 'Book a rescue check',
  },
  {
    slug: 'run-and-improve',
    title: 'Run and improve',
    summary: 'Hosting, support and steady improvement after launch.',
    metaTitle: 'Software support and improvement | RaPublisher',
    metaDescription:
      'Hosting, monitoring, backups, security updates and steady improvement, from the same Melbourne engineers who built your system.',
    h1: 'Here after go-live',
    lead: 'Software is never finished. We host it, watch it, keep it secure and keep improving it, with the same engineers who built it.',
    symptoms: [],
    examples: [],
    extra: [
      {
        heading: 'Support after launch',
        body: "Support after go-live is set out in your contract: fixes to anything we built that doesn't work as agreed, answers to questions, and small adjustments.",
      },
      {
        heading: 'Then choose a plan [DECISION on prices]',
        items: [
          'Care, from A$450 monthly plus GST: hosting management, monitoring and alerts, tested backups, security updates, upgrades, fixes, and a reply within one business day. No development hours included.',
          'Care and improve, from about A$2,500 monthly plus GST: everything in Care, plus engineer days each month for improvements from your list, and a quarterly visit on site.',
        ],
      },
      {
        heading: 'When something breaks',
        body: 'We reply within one business day [CONFIRM], and anything stopping work goes to the front of the queue. [TODO: define the urgent response time we can actually keep]',
      },
      {
        heading: 'Your exit is always open',
        body: 'You own the code, data and accounts. If you ever want to move on, we hand over properly: code, credentials, documentation and a walkthrough.',
      },
      { heading: "Systems we didn't build", body: 'We can look after those too, after a rescue check.' },
    ],
    relatedWork: [],
    faqs: [],
    cta: 'Talk to us',
  },
]

export const getService = (slug?: string) => services.find((s) => s.slug === slug)
