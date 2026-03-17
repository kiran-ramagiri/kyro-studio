"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Process = () => {
  const t = useTranslations("process");

  const steps = [
    { number: "01", title: t("steps.0.title"), desc: t("steps.0.description") },
    { number: "02", title: t("steps.1.title"), desc: t("steps.1.description") },
    { number: "03", title: t("steps.2.title"), desc: t("steps.2.description") },
    { number: "04", title: t("steps.3.title"), desc: t("steps.3.description") },
  ];

  return (
    <section id="process" className="py-32 px-6 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
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
            className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tighter"
          >
            {t("headline")} <span className="text-brand-yellow font-bold">{t("headline_accent")}</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[12px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-brand-yellow/0 via-brand-yellow to-brand-yellow/0 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Dot */}
                <div className="w-6 h-6 rounded-full bg-brand-yellow mb-8 shadow-[0_0_15px_rgba(212,217,63,0.6)] group-hover:scale-150 transition-transform duration-300" />
                
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                  {step.number}
                </span>
                <h3 className="text-2xl font-display uppercase mb-4 text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
