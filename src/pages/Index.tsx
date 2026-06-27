import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import OrderSection, { SEND_ORDER_URL } from "@/components/OrderSection";
import ContactsSection from "@/components/ContactsSection";
import type { OrderType, OrderForm } from "@/components/OrderSection";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("retail");
  const [form, setForm] = useState<OrderForm>({ name: "", phone: "", company: "", city: "", product: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, orderType }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSendError("Ошибка при отправке. Попробуйте ещё раз или позвоните нам.");
      }
    } catch {
      setSendError("Ошибка соединения. Проверьте интернет и попробуйте снова.");
    } finally {
      setSending(false);
    }
  };

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleProductOrder = (productName: string) => {
    setForm((f) => ({ ...f, product: productName }));
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWholesaleClick = () => {
    setOrderType("wholesale");
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <ProductsSection onOrder={handleProductOrder} />
      <OrderSection
        orderType={orderType}
        setOrderType={setOrderType}
        form={form}
        setForm={setForm}
        submitted={submitted}
        setSubmitted={(v) => {
          setSubmitted(v);
          if (!v) setForm({ name: "", phone: "", company: "", city: "", product: "", comment: "" });
        }}
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
