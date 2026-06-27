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
              onClick={onWholesaleClick}
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
    </>
  );
}
