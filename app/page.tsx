import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Screenshots from "@/components/Screenshots";
import Social from "@/components/Social";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg">
      <ScrollProgress />
      <Hero />
      <Features />
      <Screenshots />
      <Social />
      <EmailCapture />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
