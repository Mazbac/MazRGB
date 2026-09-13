import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = 'src'
const extensions = new Set(['.ts', '.tsx', '.css'])
const rules = [
  ['raw hex color', /#[0-9a-fA-F]{3,8}\b/],
  ['arbitrary pixel value', /\b[1-9]\d*(?:\.\d+)?px\b/],
  ['inline style object', /style=\{\{/],
]
const violations = []

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      walk(path)
      continue
    }
    if (!extensions.has(extname(path))) continue

    const file = relative('.', path).replaceAll('\\', '/')
    const isDomainFile = file.startsWith('src/domain/')
    const lines = readFileSync(path, 'utf8').split(/\r?\n/)

    lines.forEach((line, index) => {
      for (const [label, pattern] of rules) {
        // RGB values in the domain model are hardware payload data, not UI tokens.
        if (label === 'raw hex color' && isDomainFile) continue
        if (pattern.test(line))
          violations.push(`${file}:${index + 1} — ${label}`)
      }
    })
  }
}
walk(root)

if (violations.length > 0) {
  console.error('UI conformance check failed:')
  violations.forEach((violation) => console.error(`- ${violation}`))
  console.error(
    'Use theme tokens/shared components or document a justified system-level exception.',
  )
  process.exit(1)
}

console.log('UI conformance check passed.')
