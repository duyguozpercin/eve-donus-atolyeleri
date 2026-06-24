import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />

      <div className="flex-1">
        {children}
      </div>

      <Footer />
    </>
  );
}