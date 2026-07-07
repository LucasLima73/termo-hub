import { NextRequest, NextResponse } from 'next/server'
import { scrapeLeads } from '@/lib/scraper'

export const maxDuration = 60
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value
  if (session !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { segmento, cidade, raio, filtroSite } = body as {
    segmento: string
    cidade: string
    raio: number
    filtroSite: 'sem_site' | 'com_site' | 'todos'
  }

  if (!segmento || !cidade || !raio) {
    return NextResponse.json({ error: 'segmento, cidade e raio são obrigatórios' }, { status: 400 })
  }

  try {
    const results = await scrapeLeads(segmento, cidade, filtroSite ?? 'sem_site')
    return NextResponse.json({ results })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}
