import Navbar from "@/components/layout/Navbar";
import JsonLd from "@/components/seo/JsonLd";
import AnnouncementSection from "@/features/home/Announcement";
import HeroSection from "@/features/home/Hero";
import TrustedSection from "@/features/home/Trusted";
import FeaturesSection from "@/features/home/Features";
import ProgramsSection from "@/features/home/Programs";
import TracksSection from "@/features/home/Tracks";
import ProjectsSection from "@/features/home/Projects";
import JourneySection from "@/features/home/Journey";
import TestimonialsSection from "@/features/home/Testimonials";
import FAQSection from "@/features/home/FAQ";
import CTASection from "@/features/home/CTA";
import Footer from "@/features/home/Footer";
import { SEO } from "@/constants/brand";
import { FAQ } from "@/constants/testimonials";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: SEO.title,
  description: SEO.description,
  path: "/",
  absolute: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <AnnouncementSection />
      <Navbar />
      <main>
        <HeroSection />
        <TrustedSection />
        <FeaturesSection />
        <ProgramsSection />
        <TracksSection />
        <ProjectsSection />
        <JourneySection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
