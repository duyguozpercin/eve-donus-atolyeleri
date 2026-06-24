import Hero from "@/components/home/Hero";
import PillarsSection from "@/components/home/PillarsSection";
import EditorialSection from "@/components/home/EditorialSection";
import UpcomingWorkshops from "@/components/home/UpcomingWorkshops";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import JournalPreview from "@/components/home/JournalPreview";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F1]">
      <Hero />
      <PillarsSection />
      <EditorialSection />
      <UpcomingWorkshops />
      <TestimonialsSection />
      <JournalPreview />
      <NewsletterSection />
    </main>
  );
}