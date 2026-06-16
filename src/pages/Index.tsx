import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/c6d0c6f5-ed60-4165-9e57-7f01443617e8.jpg";
const PRODUCTS_IMG = "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/e03c66f2-ed77-41fb-bb9b-e7b7995706b1.jpg";

const products = [
  {
    id: 1,
    name: "Масло сливочное «Крестьянское»",
    fat: "72,5%",
    weight: "Монолит 10 / 20 кг",
    desc: "Традиционный рецепт. Натуральные сливки от коров Курганской области.",
    badge: "Хит продаж",
    icon: "Star",
  },
  {
    id: 2,
    name: "Масло сливочное «Классическое»",
    fat: "82,5%",
    weight: "Монолит 10 / 20 кг",
    desc: "Высокое содержание жира, насыщенный вкус. Идеально для выпечки и кулинарии.",
    badge: "Премиум",
    icon: "Award",
  },
  {
    id: 3,
    name: "Спред сливочно-растительный",
    fat: "72,5%",
    weight: "Монолит 10 / 20 кг",
    desc: "Мягкая текстура, лёгкий молочный вкус. Доступная альтернатива для каждого дня.",
    badge: "Экономия",
    icon: "Leaf",
  },
  {
    id: 4,
    name: "Спред «Лёгкий» сливочно-растительный",
    fat: "60%",
    weight: "Монолит 10 / 20 кг",
    desc: "Пониженная жирность, нежный вкус. Подходит для здорового и сбалансированного питания.",
    badge: "Лёгкий",
    icon: "Wind",
  },
];

const navLinks = [
  { label: "Продукция", href: "#products" },
  { label: "О производстве", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

type OrderType = "retail" | "wholesale";

const SEND_ORDER_URL = "https://functions.poehali.dev/171fd9ef-e4a8-4377-86ce-306e01872e25";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("retail");
  const [form, setForm] = useState({ name: "", phone: "", company: "", city: "", product: "", comment: "" });
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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl text-[hsl(var(--earth-dark))] font-semibold tracking-wide">
              Целинные Луга
            </span>
            <span className="text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase font-sans mt-0.5">
              Курганская область
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="nav-link text-sm font-sans font-medium text-[hsl(var(--earth-mid))] hover:text-[hsl(var(--earth-dark))] transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#order")}
              className="bg-[hsl(var(--earth-dark))] text-[hsl(var(--cream))] text-sm font-sans font-medium px-5 py-2 hover:bg-[hsl(var(--earth-mid))] transition-colors"
            >
              Оформить заказ
            </button>
          </nav>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-base font-sans text-[hsl(var(--earth-mid))]"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#order")}
              className="bg-[hsl(var(--earth-dark))] text-[hsl(var(--cream))] text-sm font-sans font-medium px-5 py-3 text-center"
            >
              Оформить заказ
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-20 pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(28,35%,12%)] via-[hsl(28,35%,12%)]/60 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="animate-fade-up opacity-0 delay-200 font-serif text-5xl md:text-7xl text-[hsl(var(--cream))] leading-tight mb-6">
              Настоящее масло<br />
              <em className="font-light">с целинных лугов</em>
            </h1>
            <p className="animate-fade-up opacity-0 delay-300 text-[hsl(var(--cream))]/75 font-sans text-lg leading-relaxed mb-10 max-w-xl">
              Сливочное масло и спреды высочайшего качества. Поставляем оптом и в розницу по всей России.
            </p>
            <div className="animate-fade-up opacity-0 delay-400 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#products")}
                className="bg-[hsl(var(--gold))] text-[hsl(var(--earth-dark))] font-sans font-semibold px-8 py-3 hover:bg-[hsl(45,65%,60%)] transition-colors"
              >
                Смотреть продукцию
              </button>
              <button
                onClick={() => scrollTo("#order")}
                className="border border-[hsl(var(--cream))]/50 text-[hsl(var(--cream))] font-sans font-medium px-8 py-3 hover:border-[hsl(var(--cream))] transition-colors"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-[hsl(var(--earth-dark))]/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-[hsl(var(--cream))]/10">
            {[
              { num: "20+", label: "лет на рынке" },
              { num: "50 т", label: "продукции в месяц" },
              { num: "100%", label: "натуральный состав" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <div className="font-serif text-2xl text-[hsl(var(--gold))]">{s.num}</div>
                <div className="text-[hsl(var(--cream))]/60 text-xs font-sans mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 bg-[hsl(var(--cream))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[hsl(var(--gold))] text-xs tracking-[0.3em] uppercase font-sans mb-3">Ассортимент</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[hsl(var(--earth-dark))] mb-4">Наша продукция</h2>
            <div className="divider-leaf max-w-xs mx-auto">
              <span className="text-[hsl(var(--earth-light))] text-lg">❧</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.id} className="product-card bg-background border border-border p-8 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-[hsl(var(--secondary))] flex items-center justify-center">
                    <Icon name={p.icon as "Star"} size={22} fallback="Package" />
                  </div>
                  <span className="text-xs font-sans font-medium tracking-wider uppercase text-[hsl(var(--earth-mid))] bg-[hsl(var(--secondary))] px-3 py-1">
                    {p.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[hsl(var(--earth-dark))] mb-2">{p.name}</h3>
                  <p className="text-[hsl(var(--muted-foreground))] font-sans text-sm leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex items-center gap-6 pt-2 border-t border-border">
                  <div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] font-sans uppercase tracking-wide">Жирность</div>
                    <div className="font-serif text-xl text-[hsl(var(--earth-dark))] font-semibold">{p.fat}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] font-sans uppercase tracking-wide">Фасовка</div>
                    <div className="font-sans text-sm text-[hsl(var(--earth-mid))] font-medium">{p.weight}</div>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => {
                        setForm((f) => ({ ...f, product: p.name }));
                        document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs font-sans font-medium text-[hsl(var(--earth-dark))] border border-[hsl(var(--earth-dark))] px-4 py-2 hover:bg-[hsl(var(--earth-dark))] hover:text-[hsl(var(--cream))] transition-colors"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[hsl(var(--gold))] text-xs tracking-[0.3em] uppercase font-sans mb-4">О нас</p>
              <h2 className="font-serif text-4xl md:text-5xl text-[hsl(var(--earth-dark))] leading-tight mb-8">
                Производство,<br />
                которому доверяют
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: "MapPin",
                    title: "Курганская область",
                    text: "Производство расположено в экологически чистом регионе с богатыми луговыми угодьями и чистыми пастбищами.",
                  },
                  {
                    icon: "Shield",
                    title: "Контроль качества",
                    text: "Соответствие ГОСТ. Каждая партия проходит лабораторный контроль. Вся продукция сертифицирована.",
                  },
                  {
                    icon: "Truck",
                    title: "Доставка по России",
                    text: "Работаем с оптовыми покупателями и розничными сетями по всей России. Гарантируем сроки и условия хранения.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 flex-shrink-0 bg-[hsl(var(--secondary))] flex items-center justify-center mt-0.5">
                      <Icon name={item.icon as "MapPin"} size={18} fallback="Info" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-[hsl(var(--earth-dark))] mb-1">{item.title}</h4>
                      <p className="text-[hsl(var(--muted-foreground))] font-sans text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-[hsl(var(--secondary))]">
                <img
                  src={PRODUCTS_IMG}
                  alt="Продукция Целинные Луга"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[hsl(var(--earth-dark))] text-[hsl(var(--cream))] p-6 max-w-[200px] z-10">
                <div className="font-serif text-4xl text-[hsl(var(--gold))]">ГОСТ</div>
                <div className="text-xs font-sans text-[hsl(var(--cream))]/70 mt-1 leading-relaxed">
                  Вся продукция соответствует государственным стандартам
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="py-24 bg-[hsl(var(--earth-dark))] texture-grain">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[hsl(var(--gold))] text-xs tracking-[0.3em] uppercase font-sans mb-3">Заказ</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[hsl(var(--cream))] mb-4">Оформить заявку</h2>
            <p className="text-[hsl(var(--cream))]/60 font-sans text-base">
              Работаем с оптовыми и розничными покупателями. Менеджер свяжется с вами в течение 2 часов.
            </p>
          </div>

          <div className="flex mb-8 border border-[hsl(var(--cream))]/20">
            {(["retail", "wholesale"] as OrderType[]).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className={`flex-1 py-3 font-sans text-sm font-medium transition-colors ${
                  orderType === t
                    ? "bg-[hsl(var(--gold))] text-[hsl(var(--earth-dark))]"
                    : "text-[hsl(var(--cream))]/60 hover:text-[hsl(var(--cream))]"
                }`}
              >
                {t === "retail" ? "Розничный покупатель" : "Оптовый покупатель"}
              </button>
            ))}
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-[hsl(var(--cream))]/60 uppercase tracking-wider mb-2">
                    Ваше имя *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border border-[hsl(var(--cream))]/20 text-[hsl(var(--cream))] placeholder-[hsl(var(--cream))]/30 font-sans text-sm px-4 py-3 focus:outline-none focus:border-[hsl(var(--gold))] transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-[hsl(var(--cream))]/60 uppercase tracking-wider mb-2">
                    Телефон *
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent border border-[hsl(var(--cream))]/20 text-[hsl(var(--cream))] placeholder-[hsl(var(--cream))]/30 font-sans text-sm px-4 py-3 focus:outline-none focus:border-[hsl(var(--gold))] transition-colors"
                    placeholder="+7 (000) 000-00-00"
                  />
                </div>
              </div>

              {orderType === "wholesale" && (
                <div>
                  <label className="block text-xs font-sans text-[hsl(var(--cream))]/60 uppercase tracking-wider mb-2">
                    Название компании / ИНН
                  </label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-transparent border border-[hsl(var(--cream))]/20 text-[hsl(var(--cream))] placeholder-[hsl(var(--cream))]/30 font-sans text-sm px-4 py-3 focus:outline-none focus:border-[hsl(var(--gold))] transition-colors"
                    placeholder="ООО «Компания»"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-sans text-[hsl(var(--cream))]/60 uppercase tracking-wider mb-2">
                  Ваш город
                </label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-transparent border border-[hsl(var(--cream))]/20 text-[hsl(var(--cream))] placeholder-[hsl(var(--cream))]/30 font-sans text-sm px-4 py-3 focus:outline-none focus:border-[hsl(var(--gold))] transition-colors"
                  placeholder="Москва"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[hsl(var(--cream))]/60 uppercase tracking-wider mb-2">
                  Продукт
                </label>
                <select
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full bg-[hsl(var(--earth-dark))] border border-[hsl(var(--cream))]/20 text-[hsl(var(--cream))] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[hsl(var(--gold))] transition-colors"
                >
                  <option value="">Выберите продукт</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Несколько позиций">Несколько позиций</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans text-[hsl(var(--cream))]/60 uppercase tracking-wider mb-2">
                  Комментарий / объём заказа
                </label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border border-[hsl(var(--cream))]/20 text-[hsl(var(--cream))] placeholder-[hsl(var(--cream))]/30 font-sans text-sm px-4 py-3 focus:outline-none focus:border-[hsl(var(--gold))] transition-colors resize-none"
                  placeholder={orderType === "wholesale" ? "Укажите объём партии, регион доставки, условия оплаты..." : "Ваши пожелания по заказу..."}
                />
              </div>

              {sendError && (
                <p className="text-red-400 font-sans text-sm text-center">{sendError}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[hsl(var(--gold))] text-[hsl(var(--earth-dark))] font-sans font-semibold py-4 hover:bg-[hsl(45,65%,60%)] transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Отправляем..." : "Отправить заявку"}
              </button>
              <p className="text-center text-[hsl(var(--cream))]/40 text-xs font-sans">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          ) : (
            <div className="text-center py-16 border border-[hsl(var(--cream))]/20">
              <div className="w-16 h-16 bg-[hsl(var(--gold))]/20 flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={32} />
              </div>
              <h3 className="font-serif text-3xl text-[hsl(var(--cream))] mb-3">Заявка принята!</h3>
              <p className="text-[hsl(var(--cream))]/60 font-sans text-base mb-8">
                Наш менеджер свяжется с вами в течение 2 рабочих часов
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", company: "", city: "", product: "", comment: "" }); }}
                className="text-[hsl(var(--gold))] font-sans text-sm border border-[hsl(var(--gold))]/40 px-6 py-2 hover:border-[hsl(var(--gold))] transition-colors"
              >
                Оформить ещё одну заявку
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[hsl(var(--cream))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[hsl(var(--gold))] text-xs tracking-[0.3em] uppercase font-sans mb-3">Связь</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[hsl(var(--earth-dark))]">Контакты</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "MapPin",
                title: "Производство",
                lines: ["Курганская область,", "Целинный район, с. Кислянка"],
              },
              {
                icon: "Building2",
                title: "Офис продаж",
                lines: ["454007 г. Челябинск,", "ул. 40-летия Октября 19,", "офис 20"],
              },
              {
                icon: "Phone",
                title: "Телефон",
                lines: ["+7 (3522) 00-00-00", "Пн–Пт 8:00–17:00"],
              },
              {
                icon: "Mail",
                title: "Электронная почта",
                lines: ["info@tselinnyelouga.ru", "Ответим в течение дня"],
              },
            ].map((c) => (
              <div key={c.title} className="bg-background border border-border p-8 text-center group hover:border-[hsl(var(--earth-light))] transition-colors">
                <div className="w-12 h-12 bg-[hsl(var(--secondary))] flex items-center justify-center mx-auto mb-5 group-hover:bg-[hsl(var(--earth-light))]/30 transition-colors">
                  <Icon name={c.icon as "MapPin"} size={20} fallback="Info" />
                </div>
                <h4 className="font-sans font-semibold text-[hsl(var(--earth-dark))] mb-3">{c.title}</h4>
                {c.lines.map((l, i) => (
                  <p key={i} className={`font-sans text-sm ${i === 0 ? "text-[hsl(var(--earth-mid))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[hsl(var(--earth-dark))] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-[hsl(var(--cream))] mb-2">Для оптовых покупателей</h3>
              <p className="text-[hsl(var(--cream))]/60 font-sans text-sm">
                Специальные условия, гибкие цены и индивидуальный менеджер для бизнеса
              </p>
            </div>
            <button
              onClick={() => {
                setOrderType("wholesale");
                document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-shrink-0 bg-[hsl(var(--gold))] text-[hsl(var(--earth-dark))] font-sans font-semibold px-8 py-3 hover:bg-[hsl(45,65%,60%)] transition-colors whitespace-nowrap"
            >
              Запросить оптовые цены
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(var(--earth-dark))] py-8 border-t border-[hsl(var(--cream))]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-serif text-xl text-[hsl(var(--cream))]">Целинные Луга</div>
          <div className="text-[hsl(var(--cream))]/40 font-sans text-xs text-center">
            © 2025 ООО «Целинные Луга» · Курганская область · Все права защищены
          </div>
          <div className="text-[hsl(var(--cream))]/40 font-sans text-xs">
            ГОСТ Р 52969-2008
          </div>
        </div>
      </footer>
    </div>
  );
}