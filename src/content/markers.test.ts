// Run: npm test
import assert from 'node:assert/strict'
import { cleanText } from './markers.ts'

const cases: [string, string][] = [
  ['Six months of support after launch, included. [CONFIRM]', 'Six months of support after launch, included.'],
  ['[TODO: 03 phone]', ''],
  ['RA PUBLISHER PTY LTD. ACN 643 002 279. ABN [TODO].', 'RA PUBLISHER PTY LTD. ACN 643 002 279.'],
  ['client sites. [TODO: fresh quote. Needs written permission.]', 'client sites.'],
  ['We hold [TODO: cover] and can send certificates. We sign NDAs.', 'We sign NDAs.'],
  ["Based in Melbourne's south-east [CONFIRM suburb], working across metro Melbourne.", "Based in Melbourne's south-east, working across metro Melbourne."],
  ['Joseph led it. [CONFIRM] [TODO: rest of bio]', 'Joseph led it.'],
  ['For six months after launch, included [CONFIRM]', 'For six months after launch, included'],
  ['No markers here.', 'No markers here.'],
]
for (const [input, want] of cases) assert.equal(cleanText(input), want, input)
console.log(`markers: ${cases.length} cases pass`)
