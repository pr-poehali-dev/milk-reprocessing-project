import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/d6ba5438-af55-4186-a8d2-cf2faca5e3d7.jpg";

const navLinks = [
  { label: "Продукция", href: "#products" },
  { label: "О производстве", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

interface HeroSectionProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (href: string) => void;
}

export default function HeroSection({ menuOpen, setMenuOpen, scrollTo }: HeroSectionProps) {
  return (
    <>
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

          <div className="hidden md:flex items-center gap-6 text-sm font-sans text-[hsl(var(--earth-mid))]">
            <a href="tel:+79128087688" className="hover:text-[hsl(var(--earth-dark))] transition-colors">+7 912 808-76-88</a>
            <a href="mailto:sum-45@bk.ru" className="hover:text-[hsl(var(--earth-dark))] transition-colors">sum-45@bk.ru</a>
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
              Сливочное масло и маргарин высочайшего качества от производителя Курганской области. Поставляем оптом и в розницу по всей России.
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
    </>
  );
}