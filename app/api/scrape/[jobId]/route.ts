import { NextRequest, NextResponse } from 'next/server'
import { getJob } from '@/lib/jobs'

export const runtime = 'nodejs'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = req.cookies.get('admin_session')?.value
  if (session !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { jobId } = await params
  const job = getJob(jobId)
  if (!job) {
    return NextResponse.json({ error: 'Job não encontrado' }, { status: 404 })
  }
  return NextResponse.json(job)
}
