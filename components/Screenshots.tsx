"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PhoneFrame from "./PhoneFrame";
import ClubMockup from "./mockups/ClubMockup";
import RoomMockup from "./mockups/RoomMockup";
import DiscussionMockup from "./mockups/DiscussionMockup";
import TimerMockup from "./mockups/TimerMockup";

const slides = [
  {
    caption: "Leia em qualquer ambiente",
    sub: "Modo claro, tipografia ajustável, leitura fluida",
    type: "img" as const,
    src: "/screenshots/light.png",
  },
  {
    caption: "Modo escuro premium",
    sub: "Conforto pra leitura noturna sem fadiga",
    type: "img" as const,
    src: "/screenshots/dark.png",
  },
  {
    caption: "Conecte-se a leitores",
    sub: "Clubes públicos e privados com chat integrado",
    type: "mockup" as const,
    component: ClubMockup,
  },
  {
    caption: "Leitura em tempo real",
    sub: "Salas síncronas com timer e presença ao vivo",
    type: "mockup" as const,
    component: RoomMockup,
  },
  {
    caption: "Discuta cada capítulo",
    sub: "Threads, citações e reações por trecho",
    type: "mockup" as const,
    component: DiscussionMockup,
  },
  {
    caption: "Mantenha o ritmo",
    sub: "Streaks, metas diárias e foco profundo",
    type: "mockup" as const,
    component: TimerMockup,
  },
];

export default function Screenshots() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((slides.length - 1) / slides.length) * 100}%`]);

  return (
    <section
      ref={containerRef}
      className="relative bg-bg"
      style={{ height: `${slides.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-bg">
        {/* dot grid bg */}
        <div className="absolute inset-0 dot-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] pointer-events-none" />

        {/* section header */}
        <div className="relative z-20 pt-20 pb-4 text-center pointer-events-none">
          <span className="text-xs tracking-[0.3em] text-primary font-medium uppercase">
            Tour
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3">
            Toda jornada de <span className="gradient-text">leitura</span>
          </h2>
        </div>

        {/* horizontal track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x, width: `${slides.length * 100}%` }}
            className="flex h-full items-center"
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 h-full flex items-center justify-center gap-12 lg:gap-20 px-8"
                style={{ width: `${100 / slides.length}%` }}
              >
                {/* caption */}
                <div className="hidden lg:flex flex-col gap-3 max-w-sm">
                  <div className="text-sm tracking-widest text-muted">
                    {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </div>
                  <h3 className="font-serif text-4xl xl:text-5xl font-medium leading-tight">
                    {slide.caption}
                  </h3>
                  <p className="text-muted text-lg">{slide.sub}</p>
                </div>

                {/* phone */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl scale-90" />
                  <PhoneFrame className="relative">
                    {slide.type === "img" ? (
                      <img
                        src={slide.src}
                        alt={slide.caption}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <slide.component />
                    )}
                  </PhoneFrame>
                </div>

                {/* mobile caption */}
                <div className="lg:hidden absolute bottom-12 left-0 right-0 text-center px-8">
                  <h3 className="font-serif text-2xl font-medium">{slide.caption}</h3>
                  <p className="text-muted text-sm mt-1">{slide.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <ProgressDot key={i} index={i} total={slides.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(
    progress,
    [(index - 0.5) / total, index / total, (index + 0.5) / total],
    [0.3, 1, 0.3]
  );
  return (
    <motion.div
      style={{ opacity }}
      className="w-2 h-2 rounded-full bg-white"
    />
  );
}
