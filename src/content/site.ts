// Global facts and shared copy (CLAUDE.md quick facts, C1, C2, C3, C7, C8, C10).
// Markers like [TODO], [CONFIRM] and [DECISION] stay in the strings: <Rich> renders them visibly.

export const site = {
  name: 'RaPublisher',
  url: 'https://rapublisher.com.au',
  line: 'Working with you. Making work easier.',
  descriptor: 'Forward deployed software engineering, Melbourne.',
  email: 'hello@rapublisher.com.au', // [DECISION] shared inbox, must exist before launch
  phone: '[TODO: 03 phone]',
  hours: 'Monday to Friday, 8.30am to 5.30pm, Melbourne time. [CONFIRM]',
  area: 'Site walks across metro Melbourne. Regional Victoria by arrangement.',
  legal: 'RA PUBLISHER PTY LTD. ACN 643 002 279. ABN [TODO].',
  copyright: '© 2026 RA PUBLISHER PTY LTD.',
  acknowledgement:
    'RaPublisher acknowledges the Traditional Owners of the lands where we live and work, and pays respect to their Elders past and present.',
  defaultDescription:
    'Forward deployed software engineers in Melbourne. We learn how your business runs, then build and look after the software it needs.',
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

export const commitments = [
  'A fixed price for each phase, agreed before work starts.',
  'You own the code, the data and the accounts it runs on, from day one.',
  'Your system is hosted in Australia unless you ask otherwise. [DECISION]',
  'Support after launch, as set out in your contract.',
  'A working demo every week, on site or on screen.',
  "If an off-the-shelf product will do the job, we'll tell you.",
  'A reply within one business day. [CONFIRM]',
]

export const processSteps = [
  {
    title: 'Site walk',
    meta: 'Free. About an hour.',
    body: "We walk the floor with you, follow one order or job from start to finish, and talk to the people who'd use the system. Within three business days you get a one-page note: what we saw, a few things you can fix without us, and whether a Blueprint is worth doing. [CONFIRM timing]",
  },
  {
    title: 'Blueprint',
    meta: 'Fixed fee. Two to three weeks.',
    body: "We spend one to three days on site, then map how the work flows now and how it could flow. You get a clickable prototype of the key screens, a map of your data and systems, the off-the-shelf options we considered, and a plan split into phases, each with a fixed price. It's yours whether or not you build with us, and the fee comes off your first phase if you go ahead within 60 days.",
  },
  {
    title: 'Build',
    meta: 'Fixed price per phase. A demo every week.',
    body: "We build in small pieces and show you working software every week, on site or on screen, using your real data. The people who'll use it try it early, so surprises turn up while they're cheap to fix.",
  },
  {
    title: 'Rollout',
    meta: 'On site, around your shifts.',
    body: "We train your team where they work, at times that suit the shift. Where it matters, old and new run side by side until everyone's confident. We're there on go-live day.",
  },
  {
    title: 'Run and improve',
    meta: 'Support as set out in your contract.',
    body: "After launch we host, monitor and back up your system, fix what needs fixing, and keep improving it from your list. Once a quarter we come back on site to see how it's going.",
  },
]

// Pricing ladder (C8). All figures [DECISION] until the founders confirm them.
export const ladder = [
  { step: 'Site walk', price: 'Free', gets: 'An hour on site and a one-page note within three business days' },
  {
    step: 'Blueprint',
    price: 'A$3,500 to A$7,500 plus GST, depending on size',
    gets: 'Process maps, prototype, data map, phased plan with fixed prices. Credited against your first phase if you go ahead within 60 days.',
  },
  {
    step: 'Build',
    price: 'Fixed price per phase. First phases typically A$30,000 to A$90,000 plus GST',
    gets: 'Working software, documentation, on-site training and go-live support',
  },
  {
    step: 'Run and improve',
    price: 'Support as set out in your contract, then Care from A$450 monthly or Care and improve from about A$2,500 monthly, plus GST',
    gets: 'Hosting, monitoring, backups, security updates, fixes and ongoing improvement',
  },
]

export const typicalRanges = [
  { work: 'An integration between two or three systems', range: 'A$8,000 to A$40,000', time: '2 to 8 weeks' },
  { work: 'An AI pilot on one workflow', range: 'A$10,000 to A$30,000', time: '3 to 6 weeks' },
  { work: 'A field or floor app, first version', range: 'A$15,000 to A$60,000', time: '4 to 10 weeks' },
  { work: 'Operations software, first phase', range: 'A$30,000 to A$90,000', time: '6 to 12 weeks' },
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
  { title: 'Say it plainly.', body: "If we can't explain it simply, we don't understand it well enough yet." },
  { title: 'Fix the price.', body: 'Every phase is priced before we start.' },
  { title: 'Leave you in control.', body: 'Your code, your data, your accounts.' },
  { title: 'Stay.', body: 'Launch is the start of the job, not the end.' },
]

// FAQ bank (C10). Pages pick questions by their number in this list.
export const faqs = [
  { q: 'What is a forward deployed engineer?', a: 'A forward deployed engineer is a software engineer who works inside your operation to learn how the work really flows, then designs, builds, launches and looks after the software that fixes it. At RaPublisher you deal with the same engineers from the first site walk to the hundredth improvement.' },
  { q: 'Do you really come on site?', a: 'Yes. The site walk, the Blueprint days, rollout and quarterly reviews happen at your premises. Weekly demos can be on site or on screen, whichever suits you.' },
  { q: 'Who actually writes the code?', a: "RaPublisher's engineers, Ramin Shirzad and Joseph Saji, live in Melbourne. They come on site, design your system, build it and look after it. If a larger build ever needs extra hands, we'll tell you who and where first." },
  { q: 'How much does custom software cost?', a: 'Most first phases fall between A$30,000 and A$90,000 plus GST. Integrations and pilots can cost less. Every phase gets a fixed price after the Blueprint.' },
  { q: 'Why do you charge for the Blueprint?', a: "It's real work: days on site, process maps, a prototype and a costed plan. You own it either way, and the fee comes off your first phase if you go ahead within 60 days." },
  { q: 'What if the project goes over budget?', a: 'Each phase has a fixed price. If you ask for something new partway through, we price the change and you decide before we do it.' },
  { q: 'Who owns the software?', a: 'You do. With RaPublisher you own the code, the data and the accounts the system runs on, from day one. It runs on mainstream technology with documentation, so any competent developer could pick it up. If you ever want to move on, we hand over properly: code, credentials, documentation and a walkthrough.' },
  { q: "What happens if you're not around?", a: "Your system runs on mainstream technology, in accounts you own, with documentation. Any competent developer could pick it up, and we'd hand over properly." },
  { q: "Can't we just buy something off the shelf?", a: "Often you can, and we'll tell you at the site walk. If an off-the-shelf product fits most of how you work, we'll say so and can help connect it. Custom software makes sense when your way of working is part of your edge, or when the gaps cause workarounds every day. We build only what off-the-shelf can't do, and connect the rest." },
  { q: 'Which systems do you work with?', a: 'Commonly Xero, MYOB, Shopify, WooCommerce and Zoho, plus most systems that offer an API or a data export. [CONFIRM list]' },
  { q: 'Where is our data stored?', a: "In Australian hosting regions by default, unless you ask otherwise. Where a provider can't host in Australia, we tell you before we use it. [DECISION]" },
  { q: 'How do you protect formulas and sensitive data?', a: 'Access by role, multi-factor sign-in, a log of every view and change, controlled exports, Australian hosting, and confidentiality agreements before we see anything.' },
  { q: 'How do you use AI, and is it safe?', a: "Where it saves time on routine work. People approve anything that affects money, safety or someone's job, every action is logged, and we document each automated decision for your privacy policy." },
  { q: 'We built something with an AI app builder. Can you help?', a: 'Yes. A rescue check is a fixed-fee review of an existing system, a stalled project or an AI-built tool. We check who has access, where the data lives, exposed passwords and keys, backups, and who owns the accounts and code. You get a plain-English report, a ranked list of risks, a recommendation to fix or rebuild, and a fixed quote for the work.' },
  { q: 'How long does it take?', a: 'Site walks usually happen within a week or two. A Blueprint takes two to three weeks, and a first phase 6 to 16 weeks. [CONFIRM]' },
  { q: 'What areas do you cover?', a: 'Metro Melbourne for site walks, and regional Victoria by arrangement. Interstate projects case by case. [DECISION]' },
  { q: 'Are we too small for this?', a: "If two or three people retype or reconcile the same information every day, it's usually worth an hour to check. Try the calculator." },
  { q: 'Are you insured?', a: '[TODO: types of cover, then "Certificates are available on request before the first visit."]' },
  { q: 'Can you take over a system someone else built?', a: 'Yes, after a rescue check, so we both know what we\'re taking on.' },
]

export const pickFaqs = (...ns: number[]) => ns.map((n) => faqs[n - 1])
