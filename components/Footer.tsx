"use client";

import { BookOpen, Twitter, Instagram } from "lucide-react";

const columns = [
  {
    title: "Produto",
    links: [
      { label: "Recursos", href: "#" },
      { label: "Clubes", href: "#" },
      { label: "Download", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Contato", href: "#" },
      { label: "Imprensa", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "#" },
      { label: "Termos de uso", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-xl font-medium">Ler Juntos</span>
            </div>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Leitor de EPUB social. Sua biblioteca, seus clubes, suas leituras —
              tudo num lugar.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted">
              <span className="text-white/40">um produto</span>
              <span className="font-medium text-white">Termo Hub</span>
            </div>

            <div className="flex gap-3 mt-6">
              {[Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted" />
                </a>
              ))}
            </div>
          </div>

          {/* columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs tracking-widest text-primary uppercase mb-4 font-medium">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} Termo Hub. Todos os direitos reservados.</span>
          <span>Feito com ❤️ pra leitores</span>
        </div>
      </div>
    </footer>
  );
}
