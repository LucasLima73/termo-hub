"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Radio,
  TrendingUp,
  Timer,
  Moon,
} from "lucide-react";
import { useRef, MouseEvent } from "react";

const features = [
  {
    icon: BookOpen,
    title: "Leitura EPUB nativa",
    desc: "EPUB 2 e 3 com renderização nativa. Tipografia ajustável, rápida e fluida.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Clubes de leitura",
    desc: "Crie clubes públicos ou privados. Chat integrado, discussões por livro, membros.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Radio,
    title: "Salas síncronas",
    desc: "Leia ao vivo com amigos. Sessões silenciosas compartilhadas, presença em tempo real.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    title: "Progresso de leitura",
    desc: "Acompanhe seu avanço por livro. Histórico, metas, streaks de leitura.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Timer,
    title: "Timer de leitura",
    desc: "Pomodoro para leitura. Sessões focadas, tracking de tempo total.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Moon,
    title: "Dark mode nativo",
    desc: "Tema escuro premium. Tamanho de fonte ajustável. Conforto pra leitura longa.",
    color: "from-indigo-500 to-violet-500",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  };

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full p-8 rounded-2xl glass-strong transition-transform duration-300 ease-out overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* hover glow follow mouse */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(124,58,237,0.15), transparent 40%)",
          }}
        />

        {/* gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl gradient-border" />
        </div>

        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} mb-5 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="font-serif text-2xl font-medium mb-3">{feature.title}</h3>
        <p className="text-muted leading-relaxed">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <span className="text-xs tracking-[0.3em] text-primary font-medium uppercase">
            Recursos
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-medium mt-4 mb-5 leading-tight">
            Tudo que precisa pra <span className="gradient-text">ler melhor</span>
          </h2>
          <p className="text-lg text-muted">
            Do leitor solo ao clube de leitura. Pensado pra quem ama livros.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
