"use client";

export default function ClubMockup() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0f0f17] to-[#0a0a0f] text-white text-[10px] flex flex-col">
      {/* status bar */}
      <div className="h-7 flex items-center justify-between px-5 text-[9px] text-white/80">
        <span>9:41</span>
        <span className="flex gap-1">
          <span>●●●</span>
        </span>
      </div>

      {/* header */}
      <div className="px-4 pt-2 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base">Clubes</h3>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
        </div>
        <div className="mt-3 h-7 rounded-lg bg-white/5 flex items-center px-3 text-[9px] text-white/40">
          Buscar clubes...
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-2 px-4 py-3 text-[9px]">
        <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">Meus</span>
        <span className="px-3 py-1 rounded-full bg-white/5 text-white/60">Explorar</span>
        <span className="px-3 py-1 rounded-full bg-white/5 text-white/60">Públicos</span>
      </div>

      {/* club cards */}
      <div className="flex-1 px-4 space-y-3 overflow-hidden">
        {[
          { name: "Clube Dostoiévski", book: "Crime e Castigo", members: 12, color: "from-rose-500 to-orange-500", online: 3 },
          { name: "Sci-Fi Club", book: "Duna", members: 24, color: "from-blue-500 to-cyan-500", online: 7 },
          { name: "Filosofia BR", book: "Ética a Nicômaco", members: 8, color: "from-emerald-500 to-teal-500", online: 2 },
        ].map((club, i) => (
          <div key={i} className="rounded-xl bg-white/5 border border-white/5 p-3 flex gap-3">
            <div className={`w-12 h-14 rounded-md bg-gradient-to-br ${club.color} flex-shrink-0 shadow-lg`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-[11px]">{club.name}</span>
                <span className="flex items-center gap-1 text-[8px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {club.online}
                </span>
              </div>
              <div className="text-[9px] text-white/50 italic mb-2">Lendo: {club.book}</div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[0, 1, 2].map((j) => (
                    <div key={j} className={`w-4 h-4 rounded-full border border-[#0f0f17] bg-gradient-to-br ${club.color}`} />
                  ))}
                </div>
                <span className="text-[8px] text-white/40">{club.members} membros</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* tab bar */}
      <div className="h-14 border-t border-white/5 flex items-center justify-around px-4 mt-auto">
        {["📚", "👥", "🔍", "👤"].map((icon, i) => (
          <div key={i} className={`text-base ${i === 1 ? "opacity-100" : "opacity-40"}`}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}
