import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import FarmSection from "@/components/FarmSection";
import OrderSection, { SEND_ORDER_URL, OrderType, OrderForm } from "@/components/OrderSection";
import ContactsSection from "@/components/ContactsSection";

const CRM_URL = "https://functions.poehali.dev/606fc3ee-17ff-47dc-93e3-97f3bd5a6c77";

const EMPTY_FORM: OrderForm = { name: "", phone: "", company: "", city: "", product: "", comment: "" };

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("retail");
  const [form, setForm] = useState<OrderForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWholesaleClick = () => {
    setOrderType("wholesale");
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      const payload = { ...form, orderType };
      await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await fetch(`${CRM_URL}?action=leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch {
      setSendError("Ошибка отправки. Попробуйте позже или позвоните нам.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <ProductsSection onOrder={() => scrollTo("#order")} />
      <FarmSection />
      <OrderSection
        orderType={orderType}
        setOrderType={setOrderType}
        form={form}
        setForm={setForm}
        submitted={submitted}
        setSubmitted={setSubmitted}
        sending={sending}
        setSending={setSending}
        sendError={sendError}
        setSendError={setSendError}
        handleSubmit={handleSubmit}
      />
      <ContactsSection onWholesaleClick={handleWholesaleClick} />
    </div>
  );
}
