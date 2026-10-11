// Global facts and shared copy (CLAUDE.md quick facts, C1, C2, C3, C7, C8, C10).
// Markers like [TODO], [CONFIRM] and [DECISION] stay in the strings: <Rich> renders them visibly.

export const site = {
  name: 'RaPublisher',
  url: 'https://rapublisher.com.au',
  line: 'Working with you. Making work easier.',
  descriptor: 'Forward deployed software engineering, Melbourne.',
  email: 'hello@rapublisher.com.au', // [DECISION] shared inbox, must exist before launch
  phone: '[TODO: 03 phone]',
  area: 'We visit businesses across metro Melbourne. Regional Victoria by arrangement.',
  legal: 'RA PUBLISHER PTY LTD. ACN 643 002 279. ABN [TODO].',
  copyright: '© 2026 RA PUBLISHER PTY LTD.',
  acknowledgement:
    'RaPublisher acknowledges the Traditional Owners of the lands where we live and work, and pays respect to their Elders past and present.',
  defaultDescription:
    'RaPublisher is a forward deployed software engineering business in Melbourne. Its engineers go on site at Victorian manufacturers, wholesalers and multi-site service businesses, learn how the work flows, then build, connect and look after the software it needs.',
}

export const nav = [
  { to: '/how-we-work', label: 'How we work' },
  { to: '/services', label: 'Services' },
  { to: '/industries', label: 'Industries' },
  { to: '/work', label: 'Work' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

export const footerLinks = [
  ...nav,
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/accessibility', label: 'Accessibility' },
]

export const problems = [
  'Orders arrive by email, phone and online, and someone retypes every one.',
  'The stock count in the system never matches the shelf, so you check by hand before promising a delivery date.',
  "Your price lists live in three spreadsheets and one person's head.",
  'Month-end means days of reconciling the books against everything else.',
  'Formulas and batch records sit in a shared folder too many people can open.',
  'New starters and contractors are inducted on paper, and sign-in is a clipboard by the door.',
  "Someone built a clever tool with AI, the business now depends on it, and nobody's sure how it works.",
]

// How we look after clients (Home). These describe how we work. They are not contractual promises: terms, prices and
// response times live in each client's proposal and agreement, never on the site.
export const care = [
  "We get to know the people who'll use the system, not only the person who signs off on it.",
  'We speak plainly. We bring options and a recommendation in everyday words, and you choose.',
  "We tell you when you don't need us, or when something off the shelf will do the job.",
  'We train your team where they work, at times that suit their shifts.',
  'We plan changes around your busy periods, and run old and new side by side where it matters.',
  'We stay. The engineers who built your system are the ones who look after it.',
]

export const processSteps = [
  {
    title: 'Site walk',
    meta: 'By arrangement, at your place.',
    body: "It starts with a conversation. If we look like the right fit for each other, we come to you: we walk the floor, follow one order or job from start to finish, and talk to the people who'd use the system. Then we tell you plainly what we saw and whether we can help.",
  },
  {
    title: 'Blueprint',
    meta: 'Discovery and design.',
    body: 'We spend time on site, then map how the work flows now and how it could flow. You get a clickable prototype of the key screens, a map of your data and systems, the off-the-shelf options we considered, and a plan split into phases. From it we prepare your proposal: the scope, the timing and the cost.',
  },
  {
    title: 'Build',
    meta: 'In phases, in the open.',
    body: "We build in small pieces and show you working software as we go, on site or on screen, using your real data. The people who'll use it try it early, so surprises turn up while they're easy to fix.",
  },
  {
    title: 'Rollout',
    meta: 'On site, around your shifts.',
    body: "We train your team where they work, at times that suit the shift. Where it matters, old and new run side by side until everyone's confident. We're there on go-live day.",
  },
  {
    title: 'Run and improve',
    meta: 'Support as set out in your agreement.',
    body: "After launch we look after your system and keep improving it from your list. We come back on site to see how it's going, because the work keeps changing and the software should keep up. [CONFIRM]",
  },
]

// How an engagement comes together (Pricing page). No prices are published. The order is the owner's (12 October
// 2026): a paid Blueprint comes before the build proposal, and each piece of work is quoted in writing first.
export const ladder = [
  { step: 'A conversation', gets: "You tell us about your business and what's getting in the way. We'll be straight with you about whether we're the right people to help." },
  { step: 'A site walk', gets: 'If we are, we come to you and see the work first-hand, alongside the people who do it.' },
  { step: 'A Blueprint', gets: 'If there is work worth doing, we propose a Blueprint: time on site, process maps, a prototype and a plan split into phases. It is paid work, quoted in writing before it starts.' },
  { step: 'A proposal for the build', gets: 'From the Blueprint we put the scope, the timing and the price of each phase in writing, shaped around your business and not a rate card.' },
  { step: 'The engagement', gets: 'Build, rollout and care after launch, with the same engineers from start to finish.' },
]

export type TeamMember = { name: string; role: string; bio: string; photo?: string; linkedin?: string; onSiteFocus: string }

export const team: TeamMember[] = [
  {
    name: 'Ramin Shirzad',
    role: 'Forward deployed engineer',
    bio: '[TODO: 60 to 90 word bio, photo, LinkedIn link]',
    onSiteFocus: '[TODO: the kind of problem he most enjoys solving on site]',
  },
  {
    name: 'Joseph Saji',
    role: 'Forward deployed engineer and lead systems architect',
    bio: 'Joseph has led the architecture of workforce, operations and commerce systems for businesses in Australia and overseas, including the projects on our work page. [CONFIRM] [TODO: rest of 60 to 90 word bio, photo, LinkedIn link]',
    onSiteFocus: '[TODO]',
  },
]

export const beliefs = [
  { title: 'Turn up.', body: 'The real requirements are found on the floor, not in a meeting room.' },
  { title: 'Listen first.', body: "The people doing the work usually know what's wrong. We ask them." },
  { title: 'Say it plainly.', body: "If we can't explain it simply, we don't understand it well enough yet." },
  { title: 'Do less, properly.', body: 'There are two of us and we do the work ourselves, so we work with a small number of businesses at a time.' },
  { title: 'Stay.', body: 'Launch is the start of the job, not the end.' },
]

// FAQ bank (C10). Pages pick questions by their number in this list.
export const faqs = [
  { q: 'What is a forward deployed engineer?', a: 'A forward deployed engineer is a software engineer who works inside your operation to learn how the work really flows, then designs, builds, launches and looks after the software that fixes it. At RaPublisher you deal with the same engineers from the first site walk to the hundredth improvement.' },
  { q: 'Do you really come on site?', a: 'Yes. The site walk, the discovery days, rollout and our visits after launch happen at your premises. Demos during the build can be on site or on screen, whichever suits you.' },
  { q: 'Who actually writes the code?', a: "RaPublisher's engineers, Ramin Shirzad and Joseph Saji, live in Melbourne. They come on site, design your system, build it and look after it. If a larger build ever needs extra hands, we'll tell you who and where first." },
  { q: 'How do you price your work?', a: "RaPublisher doesn't publish a price list. The cost of custom software depends on what's being built, how many systems it connects, and how many people and sites it serves. After a conversation and a site walk, every piece of work is quoted in writing before it starts: first the Blueprint, then each phase of the build." },
  { q: 'Why do you charge for the Blueprint?', a: "The Blueprint is RaPublisher's discovery and design step: time on site, process maps, a clickable prototype of the key screens and a plan split into phases. We charge for it because it's real work, and it's where most of the thinking happens." },
  { q: 'What if the project goes over budget?', a: 'Your proposal sets out the scope and the price of each phase before it starts, and your agreement sets out how changes are handled. If you want something new partway through, we talk it through and agree the change with you before we do it.' },
  { q: 'Who owns the software and the code?', a: 'Who owns the software RaPublisher builds for you is set out plainly in your agreement, and we go through it with you before you sign. We build on mainstream technology and document what we build, so another competent developer could pick it up.' },
  { q: "What happens if you're not around?", a: 'We build on mainstream technology and document what we build, so a competent developer could pick it up. How a handover works is set out in your agreement.' },
  { q: "Can't we just buy something off the shelf?", a: "Often you can buy something off the shelf, and we'll tell you at the site walk. If an off-the-shelf product fits most of how you work, we'll say so and can help connect it. Custom software makes sense when your way of working is part of your edge, or when the gaps cause workarounds every day. We build only what off-the-shelf can't do, and connect the rest." },
  { q: 'Which systems do you work with?', a: 'Commonly Xero, MYOB, Shopify, WooCommerce and Zoho, plus most systems that offer an API or a data export. [CONFIRM list]' },
  { q: 'Where is our data stored?', a: "Where your system and your data are hosted is agreed with you before anything is built, and written into your agreement. We'll explain the options in plain English." },
  { q: 'How do you protect formulas and sensitive data?', a: 'Access by role, multi-factor sign-in, a log of every view and change, controlled exports, and confidentiality agreements before we see anything.' },
  { q: 'How do you use AI, and is it safe?', a: "Where it saves time on routine work. People approve anything that affects money, safety or someone's job, every action is logged, and we document each automated decision for your privacy policy." },
  { q: 'We built something with an AI app builder. Can you help?', a: 'Yes. A rescue check is a careful review of an existing system, a stalled project or an AI-built tool. We check who has access, where the data lives, exposed passwords and keys, backups, and who owns the accounts and code. You get a plain-English report, a ranked list of risks, and a recommendation to fix or rebuild.' },
  { q: 'How long does it take?', a: "It depends on the size of the work, so your proposal sets out the timing of each phase. We'd rather give you a real answer after seeing the work than a guess before." },
  { q: 'What areas do you cover?', a: 'Metro Melbourne for site walks, and regional Victoria by arrangement. Interstate projects case by case. [DECISION]' },
  { q: 'Are we too small for this?', a: "If two or three people retype or reconcile the same information every day, it's usually worth a conversation. Try the calculator." },
  { q: 'Are you insured?', a: '[TODO: types of cover, then "Certificates are available on request before the first visit."]' },
  { q: 'Can you take over a system someone else built?', a: "Yes. RaPublisher can take over a system another developer built, a stalled project or a tool built with an AI app builder. We start with a rescue check: a careful review of who has access, where the data lives, backups, and who owns the accounts and code. Then we recommend whether to fix it or rebuild it, so we both know what we're taking on." },
]

export const pickFaqs = (...ns: number[]) => ns.map((n) => faqs[n - 1])
