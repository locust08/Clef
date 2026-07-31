import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const [sourcePath, destinationPath] = process.argv.slice(2)

if (!sourcePath || !destinationPath) {
  throw new Error('Usage: node prepare-d1-export-for-local.mjs <source.sql> <destination.sql>')
}

const source = await readFile(path.resolve(sourcePath), 'utf8')
const statements = []
let current = []

for (const line of source.split(/\r?\n/)) {
  if (!line.trim()) continue
  current.push(line)

  if (line.trimEnd().endsWith(';')) {
    statements.push(current.join('\n'))
    current = []
  }
}

if (current.length) {
  throw new Error('D1 export ended with an incomplete SQL statement')
}

const createTables = statements.filter((statement) =>
  /^CREATE TABLE\b/i.test(statement),
)
const createIndexes = statements.filter((statement) =>
  /^CREATE (?:UNIQUE )?INDEX\b/i.test(statement),
)
const inserts = statements.filter((statement) => /^INSERT INTO\b/i.test(statement))
const remaining = statements.filter(
  (statement) =>
    !/^(?:PRAGMA|CREATE TABLE|CREATE (?:UNIQUE )?INDEX|INSERT INTO)\b/i.test(
      statement,
    ),
)

const tableName = (statement, prefix) => {
  const match = statement.match(new RegExp(`^${prefix}\\s+["\`]?([^"\` (]+)`, 'i'))
  return match?.[1]
}

const tablesByName = new Map(
  createTables.map((statement) => [
    tableName(statement, 'CREATE TABLE'),
    statement,
  ]),
)
const orderedTables = []
const pendingTables = new Map(tablesByName)

while (pendingTables.size) {
  let progressed = false

  for (const [name, statement] of pendingTables) {
    const dependencies = [...statement.matchAll(/REFERENCES\s+["`]?([^"` (]+)/gi)]
      .map((match) => match[1])
      .filter((dependency) => dependency !== name && tablesByName.has(dependency))

    if (dependencies.every((dependency) => !pendingTables.has(dependency))) {
      orderedTables.push(statement)
      pendingTables.delete(name)
      progressed = true
    }
  }

  if (!progressed) {
    orderedTables.push(...pendingTables.values())
    break
  }
}

const tableOrder = new Map(
  orderedTables.map((statement, index) => [
    tableName(statement, 'CREATE TABLE'),
    index,
  ]),
)
const orderedInserts = [...inserts].sort((left, right) => {
  const leftName = tableName(left, 'INSERT INTO')
  const rightName = tableName(right, 'INSERT INTO')
  return (tableOrder.get(leftName) ?? 0) - (tableOrder.get(rightName) ?? 0)
})

const reordered = [
  'PRAGMA defer_foreign_keys=TRUE;',
  ...orderedTables,
  ...createIndexes,
  ...orderedInserts,
  ...remaining,
  '',
].join('\n')

await writeFile(path.resolve(destinationPath), reordered, 'utf8')
console.log(
  `Prepared ${createTables.length} tables, ${createIndexes.length} indexes, and ${inserts.length} data statements.`,
)
