"use client";

import { motion } from "framer-motion";
import { Mail, Check, Apple } from "lucide-react";
import { FormEvent, useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="notify" className="relative py-32 px-6 overflow-hidden">
      {/* aurora bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-pink-500/20 blur-3xl animate-aurora" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong text-sm mb-8"
        >
          <Apple className="w-4 h-4" />
          <span>iOS em desenvolvimento</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-5"
        >
          iOS em <span className="gradient-text">breve.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted mb-10"
        >
          Avise-me quando lançar. Sem spam, prometido.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-full glass-strong"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium">Pronto. Te avisamos.</span>
            </motion.div>
          ) : (
            <div className="relative flex items-center gap-2 p-1.5 rounded-full glass-strong">
              <div className="pl-4">
                <Mail className="w-5 h-5 text-muted" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-muted py-3 px-2 text-base"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium text-sm hover:scale-105 transition-transform whitespace-nowrap"
              >
                Avise-me
              </button>
            </div>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-xs text-muted"
        >
          Já disponível para Android · Beta aberto
        </motion.div>
      </div>
    </section>
  );
}
