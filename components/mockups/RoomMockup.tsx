"use client";

export default function RoomMockup() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] text-white text-[10px] flex flex-col relative overflow-hidden">
      {/* status bar */}
      <div className="h-7 flex items-center justify-between px-5 text-[9px] text-white/80">
        <span>9:41</span>
        <span>●●●</span>
      </div>

      {/* glow bg */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 px-4">
        {/* header */}
        <div className="flex items-center justify-between py-3">
          <div className="text-[9px] text-white/60">← Sair</div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[9px] text-rose-300">AO VIVO</span>
          </div>
        </div>

        {/* room info */}
        <div className="text-center mt-2 mb-6">
          <h3 className="font-serif text-base mb-1">Sessão Silenciosa</h3>
          <p className="text-[9px] text-white/50">Lendo &quot;1984&quot; · George Orwell</p>
        </div>

        {/* big timer */}
        <div className="text-center my-4">
          <div className="font-serif text-4xl font-light tracking-wide">24:18</div>
          <div className="text-[8px] text-white/40 mt-1 tracking-widest">TEMPO RESTANTE</div>
        </div>

        {/* progress ring effect */}
        <div className="flex justify-center my-2">
          <div className="w-32 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
          </div>
        </div>

        {/* members */}
        <div className="mt-6">
          <div className="text-[8px] text-white/40 mb-3 tracking-widest text-center">
            5 LEITORES PRESENTES
          </div>
          <div className="grid grid-cols-5 gap-3 px-2">
            {[
              { color: "from-rose-500 to-orange-500", name: "Ana" },
              { color: "from-blue-500 to-cyan-500", name: "Bru" },
              { color: "from-emerald-500 to-teal-500", name: "Caê" },
              { color: "from-amber-500 to-orange-500", name: "Du" },
              { color: "from-violet-500 to-purple-500", name: "Eli" },
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color}`} />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0a0a0f]" />
                </div>
                <span className="text-[8px] text-white/60">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="mt-auto mb-6 flex gap-2">
          <button className="flex-1 py-3 rounded-full bg-white/5 text-[10px] text-white/80">
            Pausar
          </button>
          <button className="flex-1 py-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-[10px] font-medium">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
