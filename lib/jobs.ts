import type { Job, Lead } from './types'

const jobs = new Map<string, Job>()

export function createJob(id: string): Job {
  const job: Job = { id, status: 'pending', results: [], progress: 0 }
  jobs.set(id, job)
  return job
}

export function getJob(id: string): Job | undefined {
  return jobs.get(id)
}

export function updateJob(id: string, patch: Partial<Job>): void {
  const job = jobs.get(id)
  if (!job) return
  jobs.set(id, { ...job, ...patch })
}

export function addResult(id: string, lead: Lead): void {
  const job = jobs.get(id)
  if (!job) return
  jobs.set(id, { ...job, results: [...job.results, lead] })
}
