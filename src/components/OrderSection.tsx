import Icon from "@/components/ui/icon";
import { products } from "@/components/ProductsSection";

const SEND_ORDER_URL = "https://functions.poehali.dev/171fd9ef-e4a8-4377-86ce-306e01872e25";

type OrderType = "retail" | "wholesale";

interface OrderForm {
  name: string;
  phone: string;
  company: string;
  city: string;
  product: string;
  comment: string;
}

interface OrderSectionProps {
  orderType: OrderType;
  setOrderType: (v: OrderType) => void;
  form: OrderForm;
  setForm: (v: OrderForm) => void;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  sending: boolean;
  setSending: (v: boolean) => void;
  sendError: string;
  setSendError: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function OrderSection({
  orderType,
  setOrderType,
  form,
  setForm,
  submitted,
  setSubmitted,
  sending,
  sendError,
  handleSubmit,
}: OrderSectionProps) {
  return (
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
              onClick={() => setSubmitted(false)}
              className="text-[hsl(var(--gold))] font-sans text-sm border border-[hsl(var(--gold))]/40 px-6 py-2 hover:border-[hsl(var(--gold))] transition-colors"
            >
              Оформить ещё одну заявку
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export { SEND_ORDER_URL };
export type { OrderType, OrderForm };
