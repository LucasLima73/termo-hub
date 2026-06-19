import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ler Juntos — Leitor de EPUB social com clubes de leitura | Termo Hub",
  description:
    "Leia EPUBs, junte-se a clubes de leitura, participe de salas síncronas e discuta livros em tempo real. Um produto Termo Hub.",
  keywords: [
    "leitor de epub",
    "clube de leitura",
    "app de leitura",
    "leitura social",
    "ler juntos",
    "termo hub",
  ],
  authors: [{ name: "Termo Hub" }],
  creator: "Termo Hub",
  publisher: "Termo Hub",
  openGraph: {
    title: "Ler Juntos — por Termo Hub",
    description: "Leitor de EPUB social com clubes de leitura",
    type: "website",
    locale: "pt_BR",
    siteName: "Ler Juntos",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
