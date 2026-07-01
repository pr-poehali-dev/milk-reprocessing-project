import Icon from "@/components/ui/icon";

interface ContactsSectionProps {
  onWholesaleClick: () => void;
}

export default function ContactsSection({ onWholesaleClick }: ContactsSectionProps) {
  return (
    <>
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
                lines: ["Курганская область"],
              },
              {
                icon: "Building2",
                title: "Офис продаж",
                lines: ["г. Челябинск"],
              },
              {
                icon: "Phone",
                title: "Телефон",
                lines: ["+7 912 808-76-88", "Пн–Пт 8:00–17:00"],
              },
              {
                icon: "Mail",
                title: "Электронная почта",
                lines: ["sum-45@bk.ru", "Ответим в течение дня"],
              },
            ].map((c) => (
              <div key={c.title} className="bg-background border border-border p-8 text-center group hover:border-[hsl(var(--earth-light))] transition-colors">
                <div className="w-12 h-12 bg-[hsl(var(--secondary))] flex items-center justify-center mx-auto mb-5 group-hover:bg-[hsl(var(--earth-light))]/30 transition-colors">
                  <Icon name={c.icon as "MapPin"} size={20} fallback="Info" />
                </div>
                <h4 className="font-sans font-semibold text-[hsl(var(--earth-dark))] mb-3">{c.title}</h4>
                {c.lines.map((l, i) => (
                  <p key={i} className={`font-sans text-sm ${i === 0 ? "text-[hsl(var(--earth-mid))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                    {c.icon === "Phone" && i === 0 ? (
                      <a href="tel:+79128087688" className="hover:text-[hsl(var(--earth-dark))] transition-colors">{l}</a>
                    ) : c.icon === "Mail" && i === 0 ? (
                      <a href="mailto:sum-45@bk.ru" className="hover:text-[hsl(var(--earth-dark))] transition-colors">{l}</a>
                    ) : l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Мессенджеры */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://t.me/+79128087688"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-background border border-border px-6 py-4 hover:border-[hsl(var(--earth-light))] transition-colors min-w-[220px] justify-center"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 7.13l-1.68 7.92c-.12.56-.46.7-.93.43l-2.57-1.89-1.24 1.19c-.14.14-.25.25-.51.25l.18-2.6 4.72-4.26c.2-.18-.05-.28-.32-.1L8.34 14.6 5.8 13.82c-.56-.17-.57-.56.12-.83l7.68-2.96c.47-.17.88.12.73.1z" fill="#2AABEE"/>
              </svg>
              <div className="text-left">
                <div className="text-xs text-[hsl(var(--muted-foreground))] font-sans uppercase tracking-wide">Telegram</div>
                <div className="font-sans text-sm text-[hsl(var(--earth-mid))] font-medium">+7 912 808-76-88</div>
              </div>
            </a>
            <a
              href="https://max.ru/+79128087688"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-background border border-border px-6 py-4 hover:border-[hsl(var(--earth-light))] transition-colors min-w-[220px] justify-center"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="#0077FF"/>
                <text x="12" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">MAX</text>
              </svg>
              <div className="text-left">
                <div className="text-xs text-[hsl(var(--muted-foreground))] font-sans uppercase tracking-wide">MAX</div>
                <div className="font-sans text-sm text-[hsl(var(--earth-mid))] font-medium">+7 912 808-76-88</div>
              </div>
            </a>
          </div>

          <div className="mt-12 bg-[hsl(var(--earth-dark))] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-[hsl(var(--cream))] mb-2">Для оптовых покупателей</h3>
              <p className="text-[hsl(var(--cream))]/60 font-sans text-sm">
                Специальные условия, гибкие цены и индивидуальный менеджер для бизнеса
              </p>
            </div>
            <a
              href="mailto:sum-45@bk.ru"
              className="flex-shrink-0 bg-[hsl(var(--gold))] text-[hsl(var(--earth-dark))] font-sans font-semibold px-8 py-3 hover:bg-[hsl(45,65%,60%)] transition-colors whitespace-nowrap"
            >
              Запросить оптовые цены
            </a>
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
    </>
  );
}