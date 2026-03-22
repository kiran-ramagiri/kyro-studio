"use client";

import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

const WhyKyro = () => {
  const t = useTranslations("why");

  const stats = [
    { value: 3, suffix: "×", label: t("stats.0.label") },
    { value: 80, suffix: "%", label: t("stats.1.label") },
    { value: 14, suffix: "d", label: t("stats.2.label") },
    { value: 0, staticValue: "24/7", label: t("stats.3.label") },
  ];

  const bullets = [
    t("bullets.0"),
    t("bullets.1"),
    t("bullets.2"),
    t("bullets.3"),
    t("bullets.4"),
  ];

  return (
    <section id="why-kyro" className="py-24 px-6 bg-[#08080E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Stats Grid */}
        <div className="grid grid-cols-2 gap-1 px-4">
          {stats.map((stat, i) => (
            <div key={i} className="group relative aspect-square flex flex-col items-center justify-center border border-white/5 p-8 text-center bg-white/[0.01] hover:bg-white/[0.03] transition-colors overflow-hidden">
              <motion.div 
                initial={{ height: 0 }}
                whileHover={{ height: "100%" }}
                className="absolute left-0 top-0 w-1 bg-brand-yellow transition-all duration-300"
              />
              <div className="type-stat text-white mb-2 font-display text-[48px] font-black leading-[1.0] text-brand-yellow">
                {stat.staticValue ? (
                  <span>{stat.staticValue}</span>
                ) : (
                  <Counter value={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-400 group-hover:text-brand-yellow transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
          <p className="col-span-2 type-legal text-neutral-500 mt-4 text-center font-sans text-xs font-normal leading-[1.5]">
            {t("stats_disclaimer")}
          </p>
        </div>

        {/* Right: Content */}
        <div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="type-eyebrow text-brand-yellow mb-6 font-sans text-xs font-bold tracking-[0.12em] uppercase"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="type-h2 mb-10 font-display text-5xl font-normal leading-[1.05] tracking-[-0.05em] uppercase"
          >
            {t("headline")} <span className="text-brand-yellow">{t("headline_accent")}</span>
          </motion.h2>

          <div className="space-y-6">
            {bullets.map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="mt-1.5 text-brand-yellow shrink-0 group-hover:scale-125 transition-transform">
                  <ArrowRightIcon />
                </div>
                <p className="type-body text-neutral-300 font-sans text-base font-normal leading-[1.65]">
                  {bullet}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value, suffix }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = ref.current;
    if (node) {
      const controls = animate(0, value, {
        duration: 1.6,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString() + (suffix || "");
        },
      });
      return () => controls.stop();
    }
  }, [value, suffix]);

  return <span ref={ref}>0</span>;
};

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default WhyKyro;
