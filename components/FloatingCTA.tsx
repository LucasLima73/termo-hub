"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.15 && v < 0.92);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#download"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
            <div className="relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium text-sm shadow-2xl hover:scale-105 transition-transform">
              <Download className="w-4 h-4" />
              Baixar app
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
