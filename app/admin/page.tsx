'use client'

import { useState } from 'react'
import type { Lead } from '@/lib/types'

const RAIOS = [5, 10, 20, 50]

const SEGMENTOS = [
  'restaurante', 'lanchonete', 'pizzaria', 'padaria',
  'dentista', 'médico', 'clínica', 'psicólogo',
  'salão de beleza', 'barbearia', 'academia', 'farmácia',
  'pet shop', 'mecânica', 'escola', 'contabilidade',
]

export default function AdminPage() {
  const [segmento, setSegmento] = useState('')
  const [cidade, setCidade] = useState('')
  const [raio, setRaio] = useState(10)
  const [filtroSite, setFiltroSite] = useState<'sem_site' | 'com_site' | 'todos'>('sem_site')
  const [results, setResults] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResults([])
    setError('')

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ segmento, cidade, raio, filtroSite }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? `HTTP ${res.status}`)
      } else {
        setResults(data.results ?? [])
      }
    } catch {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  function exportCSV() {
    if (!results.length) return
    const header = 'Nome,Telefone,Endereço,Google Maps\n'
    const rows = results
      .map(l => `"${l.name}","${l.phone}","${l.address}","${l.mapsUrl}"`)
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${segmento}-${cidade}.csv`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-green-400">Scraper de Leads</h1>
          <button
            onClick={() => {
              document.cookie = 'admin_session=; path=/; max-age=0'
              window.location.href = '/admin/login'
            }}
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            Sair
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 md:col-span-4">
              <label className="text-gray-400 text-sm">Segmento</label>
              <input
                value={segmento}
                onChange={e => setSegmento(e.target.value)}
                placeholder="Ex: restaurante, dentista, salão"
                required
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 outline-none focus:border-green-500"
              />
              {!segmento && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {SEGMENTOS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSegmento(s)}
                      className="text-xs px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:border-green-600 hover:text-green-400 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Cidade</label>
              <input
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                placeholder="Ex: São Paulo"
                required
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 outline-none focus:border-green-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Raio</label>
              <select
                value={raio}
                onChange={e => setRaio(Number(e.target.value))}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 outline-none focus:border-green-500"
              >
                {RAIOS.map(r => (
                  <option key={r} value={r}>{r} km</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Site</label>
              <div className="flex rounded-lg overflow-hidden border border-gray-700">
                {([['sem_site', 'Sem site'], ['todos', 'Todos'], ['com_site', 'Com site']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFiltroSite(val)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      filtroSite === val
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {!loading && results.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">{results.length} leads encontrados</span>
              <button
                onClick={exportCSV}
                className="bg-gray-800 hover:bg-gray-700 text-green-400 border border-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Exportar CSV
              </button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-900">
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Nome</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Telefone</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Endereço</th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">Maps</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((lead: Lead, i: number) => (
                    <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                      <td className="px-4 py-3 text-white font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-300">{lead.phone || '—'}</td>
                      <td className="px-4 py-3 text-gray-300">{lead.address || '—'}</td>
                      <td className="px-4 py-3">
                        <a
                          href={lead.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 underline"
                        >
                          Ver
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <p className="text-gray-600 text-sm text-center">Nenhum resultado ainda.</p>
        )}
      </div>
    </div>
  )
}
