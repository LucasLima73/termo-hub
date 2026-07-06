'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (senha === '123456') {
      document.cookie = 'admin_session=1; path=/; max-age=86400'
      router.push('/admin')
    } else {
      setErro('Senha incorreta')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-white text-xl font-semibold">Admin</h1>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 outline-none focus:border-green-500"
        />
        {erro && <p className="text-red-400 text-sm">{erro}</p>}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
