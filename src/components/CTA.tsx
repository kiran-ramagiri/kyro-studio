"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Mail, Calendar, Send, CheckCircle } from "lucide-react";

const CTA = () => {
  const t = useTranslations("cta");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-32 px-6 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-navy/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Headline */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[clamp(4rem,9vw,8rem)] font-display font-black leading-[0.88] text-white uppercase mb-6 tracking-tighter"
          >
            {t("headline_1")} <span className="text-brand-yellow">{t("headline_accent")}</span> {t("headline_2")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtext")}
          </motion.p>
        </div>

        {/* Two-column cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Book a Call Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 flex flex-col justify-between min-h-[420px]"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display uppercase tracking-tight text-white mb-3">
                {t("card_call_title")}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {t("card_call_desc")}
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <Link
                href="https://calendar.app.google/SkMr99BXaF5DhGn98"
                target="_blank"
                className="group w-full bg-brand-yellow text-brand-bg px-8 py-4 rounded-full text-base font-display font-bold uppercase tracking-tight flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(212,217,63,0.2)]"
              >
                {t("button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="mailto:hello@kyrostudio.eu"
                className="flex items-center justify-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
              >
                <Mail className="w-4 h-4" />
                hello@kyrostudio.eu
              </Link>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 min-h-[420px] flex flex-col"
          >
            {status === "success" ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <CheckCircle className="w-12 h-12 text-brand-yellow" />
                <h3 className="text-2xl font-display uppercase tracking-tight text-white">
                  {t("form.success_title")}
                </h3>
                <p className="text-neutral-400">{t("form.success_text")}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-brand-yellow uppercase tracking-widest font-bold hover:underline"
                >
                  {t("form.send_another")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display uppercase tracking-tight text-white">
                  {t("card_form_title")}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                      {t("form.name_label")}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder={t("form.name_placeholder")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-yellow/50 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                      {t("form.email_label")}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder={t("form.email_placeholder")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-yellow/50 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                    {t("form.message_label")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder={t("form.message_placeholder")}
                    className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-yellow/50 transition-colors text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">{t("form.error")}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full border border-white/10 bg-white/5 hover:bg-brand-yellow hover:text-brand-bg hover:border-brand-yellow text-white px-8 py-4 rounded-full text-base font-display font-bold uppercase tracking-tight flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? t("form.sending") : t("form.submit")}
                  {status !== "loading" && <Send className="w-4 h-4" />}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
