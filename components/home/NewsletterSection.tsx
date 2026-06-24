"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) return;

    setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-[#E5D18B] py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#4D463D]/60">
          Bülten
        </p>

        <h2 className="mb-4 text-4xl leading-tight text-[#4D463D] md:text-5xl">
          Yolculuğa Eşlik Et
        </h2>

        <p className="mb-10 text-sm leading-7 text-[#4D463D]/75">
          Atölye duyuruları, yol notları ve sessiz bir davet — her ay yalnızca
          bir kez.
        </p>

        {submitted ? (
          <p className="text-xl italic text-[#4D463D]">
            Teşekkürler, sizi bekliyoruz. 🌿
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-w-0 flex-1 rounded-full bg-[#FAF8F1]/80 px-5 py-3.5 text-sm text-[#4D463D] outline-none"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4D463D] px-6 py-3.5 text-sm text-[#FAF8F1]"
            >
              <Send size={14} />
              Katıl
            </button>
          </form>
        )}
      </div>
    </section>
  );
}