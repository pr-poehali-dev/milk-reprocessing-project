import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const CRM_URL = "https://functions.poehali.dev/606fc3ee-17ff-47dc-93e3-97f3bd5a6c77";

const STATUSES = [
  { key: "new", label: "Новый", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { key: "in_progress", label: "В работе", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { key: "shipped", label: "Отгружен", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { key: "paid", label: "Оплачен", color: "bg-green-100 text-green-700 border-green-200" },
];

function api(action: string, method = "GET", body?: object, token?: string) {
  return fetch(`${CRM_URL}?action=${action}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "X-Auth-Token": token } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then((r) => r.json());
}

type Lead = {
  id: number;
  product: string;
  comment: string;
  status: string;
  order_type: string;
  created_at: string;
  client_id: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
};

type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  leads_count: number;
  created_at: string;
  leads?: Lead[];
};

const EMPTY_CALL_FORM = { name: "", phone: "", company: "", city: "", product: "", comment: "" };

export default function Crm() {
  const [token, setToken] = useState(() => localStorage.getItem("crm_token") || "");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<"funnel" | "clients">("funnel");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callForm, setCallForm] = useState(EMPTY_CALL_FORM);
  const [callSaving, setCallSaving] = useState(false);

  const loadLeads = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const data = await api("leads", "GET", undefined, token);
    setLoading(false);
    if (Array.isArray(data)) setLeads(data);
  }, [token]);

  const loadClients = useCallback(async () => {
    if (!token) return;
    const data = await api("clients", "GET", undefined, token);
    if (Array.isArray(data)) setClients(data);
  }, [token]);

  useEffect(() => {
    if (token) {
      loadLeads();
      loadClients();
    }
  }, [token, loadLeads, loadClients]);

  async function doLogin() {
    setAuthError("");
    const data = await api("login", "POST", { username: login, password: pass });
    if (data.token) {
      localStorage.setItem("crm_token", data.token);
      setToken(data.token);
    } else {
      setAuthError(data.error || "Ошибка входа");
    }
  }

  async function updateStatus(leadId: number, status: string) {
    await api("update_lead", "POST", { id: leadId, status }, token);
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
    if (selectedLead?.id === leadId) setSelectedLead((l) => l ? { ...l, status } : l);
  }

  async function openClient(id: number) {
    const data = await api(`client&id=${id}`, "GET", undefined, token);
    setSelectedClient(data);
  }

  async function saveCall(e: React.FormEvent) {
    e.preventDefault();
    if (!callForm.name || !callForm.phone) return;
    setCallSaving(true);
    await api("leads", "POST", { ...callForm, order_type: "retail", comment: callForm.comment || "Входящий звонок" }, token);
    setCallSaving(false);
    setShowCallModal(false);
    setCallForm(EMPTY_CALL_FORM);
    loadLeads();
    loadClients();
  }

  function logout() {
    localStorage.removeItem("crm_token");
    setToken("");
    setLeads([]);
    setClients([]);
  }

  // Авторизация
  if (!token) {
    return (
      <div className="min-h-screen bg-[hsl(var(--cream))] flex items-center justify-center px-4">
        <div className="bg-white border border-border p-10 w-full max-w-sm shadow-sm">
          <div className="text-center mb-8">
            <div className="font-serif text-2xl text-[hsl(var(--earth-dark))] mb-1">Целинные Луга</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">CRM — вход</div>
          </div>
          <div className="flex flex-col gap-4">
            <input
              className="border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-[hsl(var(--earth-dark))]"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doLogin()}
            />
            <input
              type="password"
              className="border border-border px-4 py-3 text-sm font-sans focus:outline-none focus:border-[hsl(var(--earth-dark))]"
              placeholder="Пароль"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doLogin()}
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              className="bg-[hsl(var(--earth-dark))] text-[hsl(var(--cream))] py-3 text-sm font-sans font-medium hover:opacity-90 transition-opacity"
              onClick={doLogin}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  const leadsInStatus = (status: string) => leads.filter((l) => l.status === status);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Шапка */}
      <header className="bg-[hsl(var(--earth-dark))] text-[hsl(var(--cream))] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-serif text-xl">Целинные Луга</span>
          <span className="text-[hsl(var(--cream))]/40 text-sm">CRM</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCallModal(true)}
            className="flex items-center gap-2 bg-[hsl(var(--gold))] text-[hsl(var(--earth-dark))] text-sm font-semibold px-4 py-2 hover:opacity-90 transition-opacity"
          >
            <Icon name="PhoneIncoming" size={15} />
            Записать звонок
          </button>
          <a href="/" className="text-[hsl(var(--cream))]/60 text-sm hover:text-[hsl(var(--cream))] transition-colors">← На сайт</a>
          <button onClick={logout} className="text-[hsl(var(--cream))]/60 text-sm hover:text-[hsl(var(--cream))] transition-colors">Выйти</button>
        </div>
      </header>

      {/* Табы */}
      <div className="bg-white border-b border-border px-6 flex gap-6">
        {[
          { key: "funnel", label: "Воронка продаж", icon: "Kanban" },
          { key: "clients", label: "Клиенты", icon: "Users" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as "funnel" | "clients")}
            className={`flex items-center gap-2 py-4 text-sm font-sans border-b-2 transition-colors ${tab === t.key ? "border-[hsl(var(--earth-dark))] text-[hsl(var(--earth-dark))] font-semibold" : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--earth-dark))]"}`}
          >
            <Icon name={t.icon as "Kanban"} size={16} />
            {t.label}
          </button>
        ))}
        <div className="ml-auto flex items-center">
          <button onClick={() => { loadLeads(); loadClients(); }} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--earth-dark))] transition-colors py-4">
            <Icon name="RefreshCw" size={16} />
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="flex-1 overflow-auto p-6">
        {loading && (
          <div className="text-center py-12 text-[hsl(var(--muted-foreground))] text-sm">Загрузка...</div>
        )}

        {/* Воронка */}
        {tab === "funnel" && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {STATUSES.map((st) => (
              <div
                key={st.key}
                className="flex flex-col gap-3 min-h-[200px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={async (e) => {
                  e.preventDefault();
                  if (dragging !== null) {
                    await updateStatus(dragging, st.key);
                    setDragging(null);
                  }
                }}
              >
                <div className={`flex items-center justify-between px-3 py-2 rounded border text-xs font-semibold uppercase tracking-wide ${st.color}`}>
                  <span>{st.label}</span>
                  <span>{leadsInStatus(st.key).length}</span>
                </div>
                {leadsInStatus(st.key).map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white border border-border rounded p-4 cursor-pointer hover:border-[hsl(var(--earth-light))] transition-colors shadow-sm"
                    draggable
                    onDragStart={() => setDragging(lead.id)}
                    onDragEnd={() => setDragging(null)}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="font-sans font-semibold text-[hsl(var(--earth-dark))] text-sm mb-1">{lead.name || "—"}</div>
                    {lead.company && <div className="text-xs text-[hsl(var(--muted-foreground))]">{lead.company}</div>}
                    {lead.product && <div className="text-xs text-[hsl(var(--earth-mid))] mt-1 truncate">{lead.product}</div>}
                    <div className="flex items-center gap-2 mt-2">
                      <Icon name="Phone" size={12} className="text-[hsl(var(--muted-foreground))]" />
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{lead.phone}</span>
                    </div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]/60 mt-2">
                      {new Date(lead.created_at).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Клиенты */}
        {tab === "clients" && !loading && (
          <div className="bg-white border border-border rounded overflow-hidden">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="text-left px-4 py-3 text-[hsl(var(--muted-foreground))] font-medium">Имя</th>
                  <th className="text-left px-4 py-3 text-[hsl(var(--muted-foreground))] font-medium hidden sm:table-cell">Телефон</th>
                  <th className="text-left px-4 py-3 text-[hsl(var(--muted-foreground))] font-medium hidden md:table-cell">Компания</th>
                  <th className="text-left px-4 py-3 text-[hsl(var(--muted-foreground))] font-medium hidden md:table-cell">Город</th>
                  <th className="text-center px-4 py-3 text-[hsl(var(--muted-foreground))] font-medium">Заявок</th>
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-12 text-[hsl(var(--muted-foreground))]">Клиентов пока нет</td></tr>
                )}
                {clients.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-border hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => openClient(c.id)}
                  >
                    <td className="px-4 py-3 font-medium text-[hsl(var(--earth-dark))]">{c.name}</td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] hidden sm:table-cell">{c.phone}</td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] hidden md:table-cell">{c.company || "—"}</td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] hidden md:table-cell">{c.city || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-[hsl(var(--secondary))] text-[hsl(var(--earth-mid))] text-xs font-semibold px-2 py-1 rounded">{c.leads_count}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Модалка лида */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-white rounded border border-border w-full max-w-md shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl text-[hsl(var(--earth-dark))]">{selectedLead.name}</h3>
                {selectedLead.company && <p className="text-sm text-[hsl(var(--muted-foreground))]">{selectedLead.company}</p>}
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--earth-dark))]">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              {selectedLead.phone && <div className="flex gap-2"><Icon name="Phone" size={14} className="mt-0.5 text-[hsl(var(--muted-foreground))]" /><span>{selectedLead.phone}</span></div>}
              {selectedLead.email && <div className="flex gap-2"><Icon name="Mail" size={14} className="mt-0.5 text-[hsl(var(--muted-foreground))]" /><span>{selectedLead.email}</span></div>}
              {selectedLead.city && <div className="flex gap-2"><Icon name="MapPin" size={14} className="mt-0.5 text-[hsl(var(--muted-foreground))]" /><span>{selectedLead.city}</span></div>}
              {selectedLead.product && <div className="flex gap-2"><Icon name="Package" size={14} className="mt-0.5 text-[hsl(var(--muted-foreground))]" /><span>{selectedLead.product}</span></div>}
              {selectedLead.comment && <div className="flex gap-2"><Icon name="MessageSquare" size={14} className="mt-0.5 text-[hsl(var(--muted-foreground))]" /><span>{selectedLead.comment}</span></div>}
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-2 font-sans">Перенести в этап</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((st) => (
                  <button
                    key={st.key}
                    onClick={() => updateStatus(selectedLead.id, st.key)}
                    className={`text-xs px-3 py-1.5 rounded border font-medium transition-all ${selectedLead.status === st.key ? st.color + " font-bold" : "border-border text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--earth-light))]"}`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модалка: записать звонок */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowCallModal(false)}>
          <div className="bg-white rounded border border-border w-full max-w-md shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Icon name="PhoneIncoming" size={18} className="text-[hsl(var(--earth-dark))]" />
                <h3 className="font-serif text-xl text-[hsl(var(--earth-dark))]">Записать звонок</h3>
              </div>
              <button onClick={() => setShowCallModal(false)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--earth-dark))]">
                <Icon name="X" size={20} />
              </button>
            </div>
            <form onSubmit={saveCall} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-sans mb-1 block">Имя *</label>
                  <input
                    required
                    className="w-full border border-border px-3 py-2 text-sm font-sans focus:outline-none focus:border-[hsl(var(--earth-dark))]"
                    placeholder="Иван Иванов"
                    value={callForm.name}
                    onChange={(e) => setCallForm({ ...callForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-sans mb-1 block">Телефон *</label>
                  <input
                    required
                    className="w-full border border-border px-3 py-2 text-sm font-sans focus:outline-none focus:border-[hsl(var(--earth-dark))]"
                    placeholder="+7 912 000-00-00"
                    value={callForm.phone}
                    onChange={(e) => setCallForm({ ...callForm, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-sans mb-1 block">Компания</label>
                  <input
                    className="w-full border border-border px-3 py-2 text-sm font-sans focus:outline-none focus:border-[hsl(var(--earth-dark))]"
                    placeholder="ООО «Компания»"
                    value={callForm.company}
                    onChange={(e) => setCallForm({ ...callForm, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-sans mb-1 block">Город</label>
                  <input
                    className="w-full border border-border px-3 py-2 text-sm font-sans focus:outline-none focus:border-[hsl(var(--earth-dark))]"
                    placeholder="Москва"
                    value={callForm.city}
                    onChange={(e) => setCallForm({ ...callForm, city: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-sans mb-1 block">Интерес / продукт</label>
                <input
                  className="w-full border border-border px-3 py-2 text-sm font-sans focus:outline-none focus:border-[hsl(var(--earth-dark))]"
                  placeholder="Масло сливочное, маргарин..."
                  value={callForm.product}
                  onChange={(e) => setCallForm({ ...callForm, product: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-sans mb-1 block">Комментарий</label>
                <textarea
                  rows={2}
                  className="w-full border border-border px-3 py-2 text-sm font-sans focus:outline-none focus:border-[hsl(var(--earth-dark))] resize-none"
                  placeholder="Что обсудили, о чём договорились..."
                  value={callForm.comment}
                  onChange={(e) => setCallForm({ ...callForm, comment: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={callSaving}
                className="bg-[hsl(var(--earth-dark))] text-[hsl(var(--cream))] py-3 text-sm font-sans font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {callSaving ? "Сохраняем..." : "Добавить в воронку"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Модалка клиента */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelectedClient(null)}>
          <div className="bg-white rounded border border-border w-full max-w-lg shadow-xl p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl text-[hsl(var(--earth-dark))]">{selectedClient.name}</h3>
                {selectedClient.company && <p className="text-sm text-[hsl(var(--muted-foreground))]">{selectedClient.company}</p>}
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--earth-dark))]">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              {selectedClient.phone && <div className="flex gap-2"><Icon name="Phone" size={14} className="mt-0.5 text-[hsl(var(--muted-foreground))]" /><span>{selectedClient.phone}</span></div>}
              {selectedClient.email && <div className="flex gap-2"><Icon name="Mail" size={14} className="mt-0.5 text-[hsl(var(--muted-foreground))]" /><span>{selectedClient.email}</span></div>}
              {selectedClient.city && <div className="flex gap-2"><Icon name="MapPin" size={14} className="mt-0.5 text-[hsl(var(--muted-foreground))]" /><span>{selectedClient.city}</span></div>}
            </div>
            {selectedClient.leads && selectedClient.leads.length > 0 && (
              <div className="border-t border-border pt-4">
                <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-3 font-sans">История заявок</p>
                <div className="space-y-2">
                  {selectedClient.leads.map((l) => {
                    const st = STATUSES.find((s) => s.key === l.status);
                    return (
                      <div key={l.id} className="border border-border rounded p-3 text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-[hsl(var(--earth-dark))]">{l.product || "Заявка"}</span>
                          {st && <span className={`text-xs px-2 py-0.5 rounded border ${st.color}`}>{st.label}</span>}
                        </div>
                        {l.comment && <p className="text-[hsl(var(--muted-foreground))] text-xs">{l.comment}</p>}
                        <p className="text-xs text-[hsl(var(--muted-foreground))]/60 mt-1">{new Date(l.created_at).toLocaleDateString("ru-RU")}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}