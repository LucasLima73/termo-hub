export type Lead = {
  name: string
  phone: string
  address: string
  mapsUrl: string
}

export type JobStatus = 'pending' | 'running' | 'done' | 'error'

export type Job = {
  id: string
  status: JobStatus
  results: Lead[]
  progress: number
  error?: string
}
