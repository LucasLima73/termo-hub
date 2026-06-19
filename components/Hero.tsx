"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Download, Bell, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import PhoneFrame from "./PhoneFrame";

const titleWords = ["Leia.", "Junte-se.", "Compartilhe."];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [crossfade, setCrossfade] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const id = setInterval(() => setCrossfade((c) => (c === 0 ? 1 : 0)), 4000);
    return () => clearInterval(id);
  }, []);

  const spotlightX = useTransform(mouseX, (v) => v - 300);
  const spotlightY = useTransform(mouseY, (v) => v - 300);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      {/* aurora bg */}
      <div className="aurora-bg" />

      {/* dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      {/* mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          x: spotlightX,
          y: spotlightY,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* text side */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full glass text-sm text-muted"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Leitura social</span>
          </motion.div>

          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[1.05] font-medium tracking-tight">
            {titleWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3"
              >
                {i === titleWords.length - 1 ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-muted max-w-xl"
          >
            Leitor de EPUB com clubes de leitura, salas síncronas e discussões.
            Sua biblioteca social no bolso.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <a
              href="#download"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium overflow-hidden transition-transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Baixar Android
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-4 h-4 hidden" />
              </span>
            </a>
            <a
              href="#notify"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-strong text-white font-medium hover:bg-white/10 transition-colors"
            >
              <Bell className="w-4 h-4" />
              Avise-me no iOS
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted mt-4"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              EPUB 2 + 3
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Leitura nativa
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              por Termo Hub
            </span>
          </motion.div>
        </div>

        {/* phone mockup side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative animate-float">
            {/* glow behind phone */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-3xl opacity-30 scale-90" />

            <PhoneFrame>
              <div className="relative w-full h-full">
                {/* light screenshot */}
                <img
                  src="/screenshots/light.png"
                  alt="Ler Juntos light mode"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2s]"
                  style={{ opacity: crossfade === 0 ? 1 : 0 }}
                />
                {/* dark screenshot */}
                <img
                  src="/screenshots/dark.png"
                  alt="Ler Juntos dark mode"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2s]"
                  style={{ opacity: crossfade === 1 ? 1 : 0 }}
                />
              </div>
            </PhoneFrame>
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted"
      >
        <span>role para explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
