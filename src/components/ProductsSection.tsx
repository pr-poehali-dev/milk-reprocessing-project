import Icon from "@/components/ui/icon";

const PRODUCTS_IMG = "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/0fff5f68-6804-43dc-aad2-1e75a010c185.jpg";

export const products = [
  {
    id: 1,
    name: "Масло сливочное «Крестьянское»",
    fat: "72,5%",
    weight: "Монолит 10 / 20 кг",
    desc: "Традиционный рецепт. Натуральные сливки от коров Курганской области.",
    badge: "Хит продаж",
    icon: "Star",
    img: "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/687e1ed3-3af9-4638-a3ed-d1ed32b0f4f8.jpg",
  },
  {
    id: 2,
    name: "Масло сливочное «Классическое»",
    fat: "82,5%",
    weight: "Монолит 10 / 20 кг",
    desc: "Высокое содержание жира, насыщенный вкус. Идеально для выпечки и кулинарии.",
    badge: "Премиум",
    icon: "Award",
    img: "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/75c9044a-2321-4f2a-8712-fb85930b86eb.jpg",
  },
  {
    id: 3,
    name: "Маргарин сливочно-растительный",
    fat: "72,5%",
    weight: "Монолит 10 / 20 кг",
    desc: "Мягкая текстура, лёгкий молочный вкус. Доступная альтернатива для каждого дня.",
    badge: "Экономия",
    icon: "Leaf",
    img: "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/105cce35-97a9-4e67-8ae4-133e5fc4601d.jpg",
  },
  {
    id: 4,
    name: "Маргарин «Лёгкий» сливочно-растительный",
    fat: "60%",
    weight: "Монолит 10 / 20 кг",
    desc: "Пониженная жирность, нежный вкус. Подходит для здорового и сбалансированного питания.",
    badge: "Лёгкий",
    icon: "Wind",
    img: "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/34e573cc-8602-4616-a736-a533bb70809d.jpg",
  },
  {
    id: 5,
    name: "Маргарин молочный",
    fat: "72%",
    weight: "Монолит 10 / 20 кг",
    desc: "Натуральный молочный вкус, универсален для выпечки и кулинарии.",
    badge: "Молочный",
    icon: "Droplets",
    img: "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/4500e3d1-0699-4c59-b695-3c9281ce0011.jpg",
  },
  {
    id: 6,
    name: "Маргарин молочный",
    fat: "80%",
    weight: "Монолит 10 / 20 кг",
    desc: "Высокая жирность для профессиональной выпечки. Насыщенный молочный аромат.",
    badge: "Профи",
    icon: "ChefHat",
    img: "https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/ffcebeb6-f0fc-43a7-8386-b62cc1a9643e.jpg",
  },
];

interface ProductsSectionProps {
  onOrder: (productName: string) => void;
}

export default function ProductsSection({ onOrder }: ProductsSectionProps) {
  return (
    <>
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
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[hsl(var(--secondary))] flex items-center justify-center flex-shrink-0">
                      <Icon name={p.icon as "Star"} size={22} fallback="Package" />
                    </div>
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-[hsl(var(--secondary))]">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className="text-xs font-sans font-medium tracking-wider uppercase text-[hsl(var(--earth-mid))] bg-[hsl(var(--secondary))] px-3 py-1 whitespace-nowrap">
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
                    <a
                      href={`mailto:sum-45@bk.ru?subject=Заказ: ${p.name}`}
                      className="text-xs font-sans font-medium text-[hsl(var(--earth-dark))] border border-[hsl(var(--earth-dark))] px-4 py-2 hover:bg-[hsl(var(--earth-dark))] hover:text-[hsl(var(--cream))] transition-colors"
                    >
                      Заказать
                    </a>
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
    </>
  );
}