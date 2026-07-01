import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import FarmSection from "@/components/FarmSection";
import ContactsSection from "@/components/ContactsSection";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWholesaleClick = () => {
    document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <ProductsSection onOrder={() => scrollTo("#contacts")} />
      <FarmSection />
      <ContactsSection onWholesaleClick={handleWholesaleClick} />
    </div>
  );
}
