import { Metadata } from "next";
import {
  LandingNavbar,
  HeroSection,
  ProblemSolutionSection,
  ForWhoSection,
  ROISection,
  PreviewSection,
  BenefitsSection,
  HowItWorksSection,
  StatsSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  LandingFooter,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "PsicoSites - Crie seu Site Profissional de Psicologia em Minutos",
  description:
    "Plataforma completa para psicólogos criarem sites profissionais. Sem código, sem complicação. Comece gratuitamente.",
  keywords: "site para psicólogo, plataforma psicologia, site profissional psicólogo, criar site psicólogo",
  openGraph: {
    title: "PsicoSites - Sites Profissionais para Psicólogos",
    description: "Crie seu site profissional em minutos. Sem código, sem complicação.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <HeroSection />
      <ProblemSolutionSection />
      <ForWhoSection />
      <ROISection />
      <PreviewSection />
      <BenefitsSection />
      <HowItWorksSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
