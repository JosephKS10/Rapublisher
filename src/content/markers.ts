// Staging markers (Part C): [TODO ...], [CONFIRM ...], [DECISION ...].
// Clean output drops every sentence that still contains a [TODO] and strips [CONFIRM] and [DECISION] tags,
// so unfinished copy is hidden rather than shown half-written. Nothing is invented to fill the gap.
const MARK = /\[(?:TODO|CONFIRM|DECISION)[^\]]*\]/g

export function cleanText(text: string) {
  const marks: string[] = []
  const tokens = text.replace(MARK, (m) => `\u0001${marks.push(m) - 1}\u0001`) // protect periods inside markers
  return tokens
    .split(/(?<=[.!?])\s+/)
    .filter((s) => ![...s.matchAll(/\u0001(\d+)\u0001/g)].some((m) => marks[+m[1]].startsWith('[TODO')))
    .map((s) => s.replace(/\s*\u0001\d+\u0001/g, '').trim())
    .filter(Boolean)
    .join(' ')
}
