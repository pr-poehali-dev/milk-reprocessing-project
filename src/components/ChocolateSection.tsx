import Icon from "@/components/ui/icon";

const IMG_DARK_CANDY = "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/dc5f9142-068f-4ad4-815c-811a1805e215.jpg";
const IMG_MILK = "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/4976e284-4223-4d7b-9175-c82b1b5d03ac.jpg";
const IMG_PASTE = "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/f234fc92-2476-4e19-be6e-89820e5e4b53.jpg";

const chocolateProducts = [
  {
    id: 1,
    group: "Шоколадные конфеты",
    name: "Тёмный шоколад",
    price: "800 руб/кг",
    weight: "Гофрокороб 5, 10, 20 кг",
    icon: "Candy",
    badge: "Тёмный",
    img: IMG_DARK_CANDY,
  },
  {
    id: 2,
    group: "Шоколадные конфеты",
    name: "Молочный шоколад",
    price: "670 руб/кг",
    weight: "Гофрокороб 5, 10, 20 кг",
    icon: "Candy",
    badge: "Молочный",
    img: IMG_MILK,
  },
  {
    id: 3,
    group: "Плитка шоколадная",
    name: "Тёмный шоколад",
    price: "800 руб/кг",
    weight: "Инд. упаковка по согласованию",
    icon: "Square",
    badge: "Тёмный",
    img: IMG_DARK_CANDY,
  },
  {
    id: 4,
    group: "Плитка шоколадная",
    name: "Молочный шоколад",
    price: "650 руб/кг",
    weight: "Инд. упаковка по согласованию",
    icon: "Square",
    badge: "Молочный",
    img: IMG_MILK,
  },
  {
    id: 5,
    group: "Паста ореховая",
    name: "Орехово-шоколадная",
    price: "920 руб/кг",
    weight: "Ведро ПЭТ 1, 2, 3 кг",
    icon: "Cookie",
    badge: "Ореховая",
    img: IMG_PASTE,
  },
  {
    id: 6,
    group: "Паста ореховая",
    name: "Сливочно-шоколадная",
    price: "840 руб/кг",
    weight: "Ведро ПЭТ 1, 2, 3 кг",
    icon: "Cookie",
    badge: "Сливочная",
    img: IMG_PASTE,
  },
];

export default function ChocolateSection() {
  return (
    <section id="chocolate" className="py-24 bg-[hsl(var(--earth-dark))]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[hsl(var(--gold))] text-xs tracking-[0.3em] uppercase font-sans mb-3">Кондитерское производство</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[hsl(var(--cream))] mb-4">Шоколад и конфеты</h2>
          <div className="divider-leaf max-w-xs mx-auto">
            <span className="text-[hsl(var(--gold))] text-lg">❧</span>
          </div>
          <p className="text-[hsl(var(--cream))]/60 font-sans text-sm mt-6 max-w-xl mx-auto leading-relaxed">
            Производство шоколада и конфет из натурального качественного сырья
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chocolateProducts.map((p) => (
            <div key={p.id} className="bg-[hsl(var(--cream))]/5 border border-[hsl(var(--cream))]/10 p-8 flex flex-col gap-4 hover:border-[hsl(var(--gold))]/40 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-[hsl(var(--cream))]/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={p.icon as "Candy"} size={22} fallback="Package" className="text-[hsl(var(--gold))]" />
                  </div>
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-[hsl(var(--cream))]/10">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-sans text-[hsl(var(--cream))]/40 uppercase tracking-wider">{p.group}</span>
                  <div className="mt-1">
                    <span className="text-xs font-sans font-medium tracking-wider uppercase text-[hsl(var(--earth-dark))] bg-[hsl(var(--gold))] px-3 py-1">
                      {p.badge}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[hsl(var(--cream))] mb-1">{p.name}</h3>
              </div>
              <div className="flex items-center gap-6 pt-2 border-t border-[hsl(var(--cream))]/10">
                <div>
                  <div className="text-xs text-[hsl(var(--cream))]/40 font-sans uppercase tracking-wide">Цена</div>
                  <div className="font-serif text-xl text-[hsl(var(--gold))] font-semibold">{p.price}</div>
                </div>
                <div>
                  <div className="text-xs text-[hsl(var(--cream))]/40 font-sans uppercase tracking-wide">Фасовка</div>
                  <div className="font-sans text-sm text-[hsl(var(--cream))]/70 font-medium">{p.weight}</div>
                </div>
                <div className="ml-auto">
                  <a
                    href={`mailto:sum-45@bk.ru?subject=Заказ: ${p.group} ${p.name}`}
                    className="text-xs font-sans font-medium text-[hsl(var(--gold))] border border-[hsl(var(--gold))] px-4 py-2 hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--earth-dark))] transition-colors whitespace-nowrap"
                  >
                    Заказать
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-sm text-[hsl(var(--cream))]/40 mt-8">
          Индивидуальная упаковка по согласованию · Конфеты фасуются в гофрокороб 5, 10, 20 кг
        </p>
      </div>
    </section>
  );
}
