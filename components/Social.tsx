"use client";

import { motion } from "framer-motion";
import { ComponentType } from "react";
import PhoneFrame from "./PhoneFrame";
import ClubMockup from "./mockups/ClubMockup";
import RoomMockup from "./mockups/RoomMockup";
import DiscussionMockup from "./mockups/DiscussionMockup";

const blocks: {
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  mockup: ComponentType;
  reverse?: boolean;
  glow: string;
}[] = [
  {
    eyebrow: "Juntos",
    title: "Não leia",
    highlight: "sozinho",
    body: "Crie clubes, convide amigos, escolha livros juntos. Chat privado, discussões por capítulo, votação de próxima leitura. Cada clube vira sua sala literária.",
    mockup: ClubMockup,
    glow: "from-violet-500 to-blue-500",
  },
  {
    eyebrow: "Ao vivo",
    title: "Leitura em",
    highlight: "tempo real",
    body: "Entre em salas silenciosas com outros leitores. Presença ao vivo, timer compartilhado, foco coletivo. Como uma biblioteca silenciosa — mas remota.",
    mockup: RoomMockup,
    reverse: true,
    glow: "from-rose-500 to-orange-500",
  },
  {
    eyebrow: "Profundo",
    title: "Cada livro vira",
    highlight: "conversa",
    body: "Threads por livro, comentários por trecho, reações. Marque highlights e debata o que importa. Suas leituras viram conversas que duram.",
    mockup: DiscussionMockup,
    glow: "from-emerald-500 to-cyan-500",
  },
];

export default function Social() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-24"
      >
        <span className="text-xs tracking-[0.3em] text-primary font-medium uppercase">
          Social
        </span>
        <h2 className="font-serif text-5xl md:text-6xl font-medium mt-4 leading-tight">
          Ler é melhor <span className="gradient-text">acompanhado</span>
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-32">
        {blocks.map((block, i) => {
          const Mockup = block.mockup;
          return (
            <div
              key={i}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                block.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* text */}
              <motion.div
                initial={{ opacity: 0, x: block.reverse ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-5"
              >
                <span className="text-xs tracking-[0.3em] text-primary font-medium uppercase">
                  {block.eyebrow}
                </span>
                <h3 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05]">
                  {block.title}{" "}
                  <span className="gradient-text">{block.highlight}</span>
                </h3>
                <p className="text-lg text-muted max-w-md leading-relaxed">
                  {block.body}
                </p>
              </motion.div>

              {/* mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${block.glow} blur-3xl opacity-25 scale-75`} />
                <div className="relative animate-float">
                  <PhoneFrame>
                    <Mockup />
                  </PhoneFrame>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
