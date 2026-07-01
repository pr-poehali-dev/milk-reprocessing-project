import Icon from "@/components/ui/icon";

const farmFeatures = [
  { icon: "Cow", title: "Собственное стадо", desc: "Более 200 голов дойных коров породы чёрно-пёстрая и голштинская" },
  { icon: "Leaf", title: "Натуральные корма", desc: "Собственные пастбища и заготовка кормов без ГМО и химических добавок" },
  { icon: "Thermometer", title: "Ветеринарный контроль", desc: "Ежедневный осмотр и забор проб молока сертифицированными специалистами" },
  { icon: "Droplets", title: "Охлаждение молока", desc: "Молоко охлаждается до +4°C сразу после дойки — максимальная свежесть" },
];

const butterSteps = [
  { num: "01", title: "Сепарация", desc: "Свежее цельное молоко сепарируется для получения высокожирных сливок" },
  { num: "02", title: "Пастеризация", desc: "Сливки пастеризуются при 85°C для уничтожения бактерий" },
  { num: "03", title: "Сбивание", desc: "Сливки сбиваются в современных маслоизготовителях до образования масляного зерна" },
  { num: "04", title: "Промывка и формовка", desc: "Масло промывается, солится по рецептуре и фасуется в фирменную упаковку" },
];

export default function FarmSection() {
  return (
    <section id="farm" className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Молочная ферма */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Наше производство
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Молочная ферма
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Собственная ферма — основа качества нашей продукции. Мы контролируем весь цикл: от выращивания кормов до надоя молока.
            </p>
          </div>

          <div className="mb-8 rounded-2xl overflow-hidden h-72 md:h-96">
            <img
              src="https://cdn.poehali.dev/projects/88d3f176-cf54-4278-8120-7d30ed406ca7/files/ef0f4baf-48c1-46ae-a2e9-2d468d4c5297.jpg"
              alt="Молочная ферма с коровами"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {farmFeatures.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name={f.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-base">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Цех по производству сливочного масла */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Технология
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Цех производства сливочного масла
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Современное оборудование и строгий ГОСТ позволяют производить масло высшего сорта с жирностью 72,5% и 82,5%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {butterSteps.map((step) => (
              <div key={step.num} className="flex gap-5 bg-card border border-border rounded-2xl p-6 items-start">
                <span className="text-3xl font-extrabold text-primary/30 leading-none select-none">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground text-base mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Award" size={28} className="text-primary" />
              </div>
              <div>
                <div className="font-bold text-foreground text-lg">Производство по ГОСТ 32261-2013</div>
                <div className="text-muted-foreground text-sm">Все партии масла проходят лабораторный контроль качества</div>
              </div>
            </div>
            <div className="md:ml-auto flex flex-wrap gap-4 text-center">
              <div className="bg-card border border-border rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-primary">82,5%</div>
                <div className="text-xs text-muted-foreground mt-0.5">Высший сорт</div>
              </div>
              <div className="bg-card border border-border rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-primary">72,5%</div>
                <div className="text-xs text-muted-foreground mt-0.5">Крестьянское</div>
              </div>
              <div className="bg-card border border-border rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-primary">200+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Голов КРС</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}