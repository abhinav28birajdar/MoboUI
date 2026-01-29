import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ComponentShowcase from "@/components/landing/ComponentShowcase";
import TechStack from "@/components/landing/TechStack";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <Features />
      <ComponentShowcase />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  );
}
