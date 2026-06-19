"use client";

export default function TimerMockup() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1f] to-[#0a0a0f] text-white text-[10px] flex flex-col relative overflow-hidden">
      {/* status bar */}
      <div className="h-7 flex items-center justify-between px-5 text-[9px] text-white/80">
        <span>9:41</span>
        <span>●●●</span>
      </div>

      {/* glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 pt-4 flex-1">
        <div className="text-[9px] text-white/50 tracking-widest mb-1">SESSÃO DE LEITURA</div>
        <h3 className="font-serif text-base mb-8">Foco profundo</h3>

        {/* circular timer */}
        <div className="relative w-44 h-44 mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#grad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="282.7"
              strokeDashoffset="85"
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-serif text-3xl font-light">18:42</div>
            <div className="text-[8px] text-white/40 mt-1 tracking-widest">RESTANTE</div>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          <div className="text-center p-2 rounded-lg bg-white/5">
            <div className="text-[12px] font-serif">7</div>
            <div className="text-[8px] text-white/40 mt-0.5">DIAS STREAK</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5">
            <div className="text-[12px] font-serif">3h 24m</div>
            <div className="text-[8px] text-white/40 mt-0.5">HOJE</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5">
            <div className="text-[12px] font-serif">62%</div>
            <div className="text-[8px] text-white/40 mt-0.5">PROGRESSO</div>
          </div>
        </div>

        {/* book info */}
        <div className="w-full rounded-xl bg-white/5 p-3 flex items-center gap-3">
          <div className="w-10 h-12 rounded-md bg-gradient-to-br from-amber-700 to-amber-900" />
          <div className="flex-1">
            <div className="text-[10px] font-medium">Os Irmãos Karamázov</div>
            <div className="text-[8px] text-white/50">Dostoiévski · pg. 412 de 720</div>
          </div>
        </div>

        {/* button */}
        <div className="w-full mt-auto mb-6">
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-[10px] font-medium">
            Pausar sessão
          </button>
        </div>
      </div>
    </div>
  );
}
