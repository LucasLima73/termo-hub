import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { createJob } from '@/lib/jobs'
import { runScraper } from '@/lib/scraper'

export const maxDuration = 60
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { segmento, cidade, raio } = body as {
    segmento: string
    cidade: string
    raio: number
  }

  if (!segmento || !cidade || !raio) {
    return NextResponse.json({ error: 'segmento, cidade e raio são obrigatórios' }, { status: 400 })
  }

  const jobId = uuidv4()
  createJob(jobId)

  // Dispara em background — não aguarda
  runScraper(jobId, segmento, cidade, raio).catch(() => {})

  return NextResponse.json({ jobId })
}
