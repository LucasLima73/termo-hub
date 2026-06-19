"use client";

export default function DiscussionMockup() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0f0f17] to-[#0a0a0f] text-white text-[10px] flex flex-col">
      {/* status bar */}
      <div className="h-7 flex items-center justify-between px-5 text-[9px] text-white/80">
        <span>9:41</span>
        <span>●●●</span>
      </div>

      {/* header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
        <div className="text-[10px] text-white/60">←</div>
        <div className="flex-1">
          <div className="text-[10px] font-medium">Capítulo 7 — A queda</div>
          <div className="text-[8px] text-white/50">Crime e Castigo · 24 comentários</div>
        </div>
      </div>

      {/* thread */}
      <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
        {/* main post */}
        <div className="rounded-xl bg-white/5 border border-white/5 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-orange-500" />
            <div>
              <div className="text-[10px] font-medium">Marina S.</div>
              <div className="text-[8px] text-white/40">há 2h · pg. 187</div>
            </div>
          </div>
          <p className="text-[9px] text-white/80 leading-relaxed">
            Esse momento que Raskolnikov tem o sonho é absurdamente forte. A culpa começa a virar pesadelo literal.
          </p>
          <div className="mt-2 px-2 py-1.5 rounded-md bg-violet-500/10 border-l-2 border-violet-500 text-[8px] italic text-white/70">
            &quot;Era como se uma corda dentro dele tivesse arrebentado...&quot;
          </div>
          <div className="flex items-center gap-3 mt-2 text-[9px] text-white/50">
            <span>❤️ 12</span>
            <span>💬 4 respostas</span>
          </div>
        </div>

        {/* reply */}
        <div className="ml-6 rounded-xl bg-white/[0.03] border border-white/5 p-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
            <div className="text-[9px] font-medium">Pedro M.</div>
            <span className="text-[8px] text-white/40">há 1h</span>
          </div>
          <p className="text-[9px] text-white/70 leading-relaxed">
            Concordo. E o Dostoiévski transforma isso em algo quase místico, não só psicológico.
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-[8px] text-white/50">
            <span>❤️ 5</span>
          </div>
        </div>

        {/* reply 2 */}
        <div className="ml-6 rounded-xl bg-white/[0.03] border border-white/5 p-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500" />
            <div className="text-[9px] font-medium">Luísa C.</div>
            <span className="text-[8px] text-white/40">há 30min</span>
          </div>
          <p className="text-[9px] text-white/70 leading-relaxed">
            Vocês perceberam o paralelo com o cavalo do sonho? Tô obcecada com essa cena.
          </p>
        </div>
      </div>

      {/* input */}
      <div className="px-4 py-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-8 rounded-full bg-white/5 px-3 flex items-center text-[9px] text-white/40">
            Adicionar comentário...
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-[12px]">
            ↑
          </div>
        </div>
      </div>
    </div>
  );
}
