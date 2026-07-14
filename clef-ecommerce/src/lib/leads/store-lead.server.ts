import 'server-only'

import { randomUUID } from 'node:crypto'

import { Pool } from 'pg'

import type { LeadSubmission } from './submit-lead'

let pool: Pool | null = null
let tableReady: Promise<void> | null = null

const getPool = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required for website lead persistence.')
  }

  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 2,
  })

  return pool
}

const quoteIdentifier = (identifier: string) => `"${identifier.replace(/"/g, '""')}"`

const tableName = () => {
  const schema = process.env.LEADS_DATABASE_SCHEMA?.trim() || 'public'
  return `${quoteIdentifier(schema)}.website_leads`
}

const ensureLeadTable = async () => {
  if (!tableReady) {
    tableReady = getPool()
      .query(`
        create table if not exists ${tableName()} (
          id text primary key,
          type text not null,
          source text not null,
          name text,
          email text not null,
          message text,
          created_at timestamptz not null default now()
        )
      `)
      .then(() => undefined)
      .catch((error) => {
        tableReady = null
        throw error
      })
  }

  await tableReady
}

export const saveLead = async (submission: LeadSubmission) => {
  await ensureLeadTable()

  const id = randomUUID()
  await getPool().query(
    `insert into ${tableName()} (id, type, source, name, email, message)
     values ($1, $2, $3, $4, $5, $6)`,
    [
      id,
      submission.type,
      submission.source,
      submission.name || null,
      submission.email,
      submission.message || null,
    ],
  )

  return { id }
}
