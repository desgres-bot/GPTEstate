"use client";

import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: integrate Supabase auth
    // const { error } = await supabase.auth.signInWithOtp({ email });
    await new Promise((r) => setTimeout(r, 1000));

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-2xl font-black text-white">
            AI
          </div>
          <h1 className="text-2xl font-bold">Вход в GPT Estate</h1>
          <p className="mt-2 text-gray-500">
            Войдите, чтобы сохранять результаты и управлять подпиской
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? "Отправка..." : "Получить ссылку для входа"}
            </button>
            <p className="text-center text-xs text-gray-400">
              Мы отправим магическую ссылку на вашу почту. Без пароля.
            </p>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl bg-green-50 p-6 text-center">
            <div className="text-4xl">&#9993;</div>
            <h3 className="mt-3 text-lg font-bold text-green-800">
              Проверьте почту
            </h3>
            <p className="mt-2 text-sm text-green-600">
              Мы отправили ссылку для входа на{" "}
              <span className="font-medium">{email}</span>
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm font-medium text-green-700 underline"
            >
              Отправить повторно
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
