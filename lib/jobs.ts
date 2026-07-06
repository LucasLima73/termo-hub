import fs from 'fs'
import path from 'path'
import type { Job, Lead } from './types'

const DIR = '/tmp/scraper-jobs'

function ensureDir() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true })
}

function jobPath(id: string) {
  return path.join(DIR, `${id}.json`)
}

export function createJob(id: string): Job {
  ensureDir()
  const job: Job = { id, status: 'pending', results: [], progress: 0 }
  fs.writeFileSync(jobPath(id), JSON.stringify(job))
  return job
}

export function getJob(id: string): Job | undefined {
  try {
    const raw = fs.readFileSync(jobPath(id), 'utf-8')
    return JSON.parse(raw) as Job
  } catch {
    return undefined
  }
}

export function updateJob(id: string, patch: Partial<Job>): void {
  const job = getJob(id)
  if (!job) return
  fs.writeFileSync(jobPath(id), JSON.stringify({ ...job, ...patch }))
}

export function addResult(id: string, lead: Lead): void {
  const job = getJob(id)
  if (!job) return
  fs.writeFileSync(jobPath(id), JSON.stringify({ ...job, results: [...job.results, lead] }))
}
