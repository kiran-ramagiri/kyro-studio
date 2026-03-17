"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Bot, Cpu, Zap, Share2, BarChart3, Workflow } from "lucide-react";

const AiAutomation = () => {
  const t = useTranslations("ai_automation");

  // Manual icons matching capabilities order
  const icons = [
    <Bot key="1" className="w-5 h-5" />,
    <Workflow key="2" className="w-5 h-5" />,
    <Share2 key="3" className="w-5 h-5" />,
    <Cpu key="4" className="w-5 h-5" />,
    <BarChart3 key="5" className="w-5 h-5" />,
    <Zap key="6" className="w-5 h-5" />,
  ];

  return (
    <section className="bg-brand-bg py-32 px-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-navy/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-6"
            >
              {t("eyebrow")}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-[clamp(3rem,6vw,5rem)] font-display uppercase leading-[0.9] tracking-tighter mb-8"
            >
              {t("headline")} <span className="text-brand-yellow">{t("headline_accent")}</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-xl"
            >
              {t("description")}
            </motion.p>

            <div className="flex flex-wrap gap-4 mb-12">
              {["Make", "Zapier", "n8n"].map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="px-6 py-2 rounded-full border border-brand-yellow/30 text-brand-yellow text-sm font-bold"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow mb-4 group-hover:bg-brand-yellow group-hover:text-brand-bg transition-colors">
                  {icons[i]}
                </div>
                <p className="font-bold uppercase text-sm tracking-tight flex items-start gap-2">
                  <span className="text-brand-yellow">→</span>
                  {t(`capabilities.${i}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAutomation;
