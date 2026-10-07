// Insights (C11). First drafts written from the research in the brief (Part D) and from our own prices and calculator.
// Every figure from outside names its source and carries [CONFIRM] until it has been re-checked against that source.
// B9 asks for something only we can say in each article: the [TODO] lines mark where a real field example goes.
// Joseph and Ramin must read each one before launch; set draft: true to pull an article.

export type Block = { h: string } | { p: string } | { ul: string[] }

export type Insight = {
  slug: string
  title: string
  metaTitle: string // under 60 characters with " | RaPublisher"
  description: string // under 155 characters
  date: string // YYYY-MM-DD
  author: string
  topic: string
  disclaimer?: 'legal' | 'tax'
  body: Block[]
  sources: { label: string; url: string }[]
  next: { to: string; label: string }[] // one service page, one case study (C11)
  draft: boolean
}

export const insights: Insight[] = [
  {
    slug: 'what-is-a-forward-deployed-engineer',
    title: 'What a forward deployed engineer is, and why it matters for a 40-person business',
    metaTitle: 'What is a forward deployed engineer? | RaPublisher',
    description: 'A forward deployed engineer builds software from inside your operation, not from a brief. What that means for a business with no developers.',
    date: '2026-10-08',
    author: 'Joseph Saji [CONFIRM]',
    topic: 'How we work',
    body: [
      { p: 'A forward deployed engineer works inside your operation to learn how the work really flows, then designs, builds, launches and looks after the software that fixes it. You deal with the same people from the first site walk to the hundredth improvement.' },
      { h: 'Where the idea came from' },
      { p: 'The role comes from software companies that sent engineers to sit with their most important customers instead of building from a distance. Palantir made it well known under the name forward deployed software engineer. The engineer learns the customer\'s work first-hand and builds in the customer\'s own environment, not from a specification handed over a wall.' },
      { h: 'Why you are hearing the term now' },
      { p: 'Demand for the role jumped once AI companies needed people who can both write code and work directly with customers. Reporting on Indeed data put growth in applied AI and forward deployed job postings at more than 800% between January and September 2025. [CONFIRM: re-check against the source] In 2026 the large AI companies have announced forward deployed teams or services businesses of their own, aimed at enterprises and mid-sized firms. [CONFIRM: re-check against the sources]' },
      { p: 'Those teams are built for big budgets, and each is tied to one AI vendor. That leaves out most of the businesses we meet.' },
      { h: 'What it looks like in a 40-person business' },
      { p: 'Most businesses we work with have no developers. They run on Xero or MYOB, a web store, an app or two and a lot of spreadsheets, with people retyping the same information all day. A brief written in a meeting room rarely captures that. The real requirements are on the floor: the docket that gets copied twice, the price list that lives in one person\'s head, the stock count nobody trusts.' },
      { p: 'So the work starts with a site walk. An engineer follows one order or job from start to finish and talks to the people who would use the system. Only then do we design anything. [TODO: add one real observation from a site walk, with the client\'s permission]' },
      { h: 'How this differs from adding an engineer to a software team' },
      { p: 'Some firms use the same term for placing an engineer inside a client\'s existing engineering team. That suits companies that already have developers. Ours is a different job: we embed in your operation, not your engineering team. If you have no developers, we become your engineering team, and we build the whole system, not only the AI part.' },
      { h: 'When it is not the right fit' },
      { ul: ['Large enterprise programs with their own delivery teams.', 'Consumer app startups.', 'Buyers who want a fixed quote from a one-line brief at the lowest price.'] },
      { p: 'It is also fair to say that the role involves plenty of plumbing: integration work, conversations and time on site, not only product engineering. For a business with no technical staff, that is the point. Someone has to do the plumbing, the conversations and the building.' },
    ],
    sources: [
      { label: 'Indeed job posting data, as reported from the Financial Times', url: 'https://www.storyboard18.com/digital/openai-anthropic-hire-engineers-who-can-code-and-communicate-with-customers-83622.htm' },
      { label: 'The Pragmatic Engineer: forward deployed engineering heats up again', url: 'https://blog.pragmaticengineer.com/the-pulse-forward-deployed-engineering-heats-up-again/' },
      { label: 'Anthropic: a new enterprise AI services company', url: 'https://www.anthropic.com/news/enterprise-ai-services-company' },
    ],
    next: [
      { to: '/how-we-work', label: 'How we work: five steps, the same engineers throughout' },
      { to: '/work/multi-site-operations-platform', label: 'Case study: one system for stock, orders, sites, inductions and deliveries' },
    ],
    draft: false,
  },
  {
    slug: 'custom-software-cost-melbourne',
    title: 'What custom software costs in Melbourne in 2026',
    metaTitle: 'What custom software costs in Melbourne | RaPublisher',
    description: 'Published hourly rates, day rates and project sizes for Melbourne in 2026, what moves the price, and how to budget a first phase.',
    date: '2026-10-08',
    author: 'Joseph Saji [CONFIRM]',
    topic: 'Pricing',
    body: [
      { p: 'Custom software in Melbourne commonly runs from about A$25,000 to A$250,000 or more, depending on what is built. [CONFIRM: re-check against the sources] The useful question is not the total, it is what a sensible first phase costs and what moves that number.' },
      { h: 'What the published guides say' },
      { ul: [
        'Agency rates of about A$120 to A$250 an hour, with most quality mid-market agencies at A$150 to A$200. [CONFIRM]',
        'Senior day rates of about A$1,050 to A$1,300. [CONFIRM]',
        'Some established Melbourne firms publish minimum project sizes of A$25,000 to A$50,000 or more. [CONFIRM]',
        'Offshore firms with Australian pages at roughly A$50 to A$99 an hour. [CONFIRM]',
      ] },
      { p: 'Most of these figures come from agencies\' own cost guides, so read them as ranges, not facts.' },
      { h: 'What moves the price' },
      { ul: [
        'How many kinds of users there are and how many screens they need.',
        'How many systems are connected, and how tidy their data is.',
        'How much existing data needs cleaning and moving.',
        'Whether it has to work offline or on phones.',
        'The reports you need.',
        'How many sites are rolled out and trained.',
      ] },
      { h: 'Fixed price or hourly' },
      { p: 'Hourly billing puts the risk of a blowout on you. A fixed price puts it on the builder, which is only fair if the builder has seen the work first. That is why we fix the price for each phase after a Blueprint, not from a one-line brief. If you ask for something new partway through, we price the change and you decide before we do it.' },
      { h: 'The costs people forget' },
      { p: 'Software is never finished. Industry guides put ongoing maintenance at roughly 15% to 20% of the original build cost each year. [CONFIRM] On a A$60,000 build that is A$750 to A$1,000 a month. Hosting and third-party subscriptions sit on top, and they are best paid by you directly, so you always own the accounts.' },
      { h: 'How to budget a first phase' },
      { p: 'Pick the one workflow that causes the most double handling and build that first. Our first phases typically fall between A$30,000 and A$90,000 plus GST. [DECISION] Integrations and pilots can cost less. A free site walk tells you whether it is worth going further, and a Blueprint (A$3,500 to A$7,500 plus GST, credited against the first phase if you go ahead within 60 days) gives you a fixed price before you commit. [DECISION] [TODO: add a real, anonymised first-phase example with its scope and price band]' },
      { p: 'These are ranges, not quotes. Prices are in Australian dollars and exclude GST.' },
    ],
    sources: [
      { label: '13Labs: custom software development cost in Melbourne', url: 'https://www.13labs.au/guides/custom-software-development-cost-melbourne' },
      { label: 'Cipher Projects: custom software development cost in Australia, 2026', url: 'https://www.cipherprojects.com/blog/posts/custom-software-development-cost-australia-2026/' },
      { label: 'Expeed: custom software cost in Australia, 2026', url: 'https://expeed.com.au/articles/custom-software-cost-australia-2026' },
      { label: 'Cleveroad: software development companies in Australia', url: 'https://www.cleveroad.com/blog/top-software-development-companies-in-australia/' },
    ],
    next: [
      { to: '/pricing', label: 'Pricing: four steps, each priced before we start' },
      { to: '/services/operations-software', label: 'Operations software: what a first phase covers' },
      { to: '/work/super-pro-services', label: 'Case study: a public website and a workforce portal in one system' },
    ],
    draft: false,
  },
  {
    slug: 'real-cost-of-double-handling',
    title: 'The real cost of double handling',
    metaTitle: 'The real cost of double handling | RaPublisher',
    description: 'A simple formula for what retyping and reconciling costs your business each year, a worked example, and how to measure your own baseline in a week.',
    date: '2026-10-08',
    author: 'Joseph Saji [CONFIRM]',
    topic: 'Operations',
    body: [
      { p: 'Double handling is the same information entered more than once: a phone order written on a notepad, typed into a spreadsheet, typed into Xero, then typed onto a pick slip. It rarely appears in the accounts, which is why it is usually bigger than people expect.' },
      { h: 'The formula' },
      { p: 'Yearly cost of double handling = people x (minutes a day / 60) x hourly cost x working days a year.' },
      { p: 'Use the hourly cost including on-costs, not the wage alone. Our calculator starts at A$45 an hour and 230 working days a year. [DECISION] Change both to match your business.' },
      { h: 'A worked example' },
      { p: 'Three people each spend 30 minutes a day re-entering or reconciling orders. That is 3 x 0.5 hours x A$45 x 230 days, or A$15,525 a year. Four people at 45 minutes a day comes to A$31,050. Neither figure includes the cost of mistakes.' },
      { h: 'What the formula leaves out' },
      { ul: [
        'Pricing and picking errors, and the time spent fixing them.',
        'Deliveries promised against a stock count that was wrong.',
        'Month-end spent reconciling the books against everything else.',
        'The key person who cannot take leave because the process lives in their head.',
      ] },
      { p: 'We do not put a number on these without measuring them. They are the reason the formula gives a floor, not a ceiling.' },
      { h: 'Measure your own baseline in a week' },
      { ul: [
        'Pick one workflow, such as a trade order from enquiry to invoice.',
        'List every place the same details are entered or checked.',
        'For five working days, have each person tally how often they do it and roughly how long it takes.',
        'Put the totals into the formula, then note the errors that week separately.',
      ] },
      { p: 'A measured baseline matters later too. Without a before number, an after number means little. [TODO: add one measured before and after from a client, with permission]' },
    ],
    sources: [],
    next: [
      { to: '/pricing', label: 'Try the calculator with your own numbers' },
      { to: '/services/integrations', label: 'Integrations: information entered once' },
      { to: '/work/ccsm-mobile-commerce', label: 'Case study: a mobile ordering app running on Shopify' },
    ],
    draft: false,
  },
]

export const publishedInsights = insights.filter((i) => !i.draft).sort((a, b) => b.date.localeCompare(a.date))
export const getInsight = (slug?: string) => publishedInsights.find((i) => i.slug === slug)
