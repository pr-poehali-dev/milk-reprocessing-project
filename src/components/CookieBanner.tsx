import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_accepted")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_accepted", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[hsl(var(--earth-dark))] border-t border-[hsl(var(--cream))]/10 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
        <p className="text-[hsl(var(--cream))]/70 font-sans text-sm text-center sm:text-left">
          Мы используем файлы cookie для улучшения работы сайта и анализа трафика.
          Продолжая использовать сайт, вы соглашаетесь с их использованием.
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 bg-[hsl(var(--gold))] text-[hsl(var(--earth-dark))] font-sans font-semibold text-sm px-6 py-2 hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
