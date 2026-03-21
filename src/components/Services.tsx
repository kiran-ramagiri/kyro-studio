"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const Services = () => {
  const t = useTranslations("services");

  const services = [
    {
      id: "01",
      icon: "🌐",
      title: t("items.0.title"),
      desc: t("items.0.description"),
    },
    {
      id: "02",
      icon: "📡",
      title: t("items.1.title"),
      desc: t("items.1.description"),
    },
    {
      id: "03",
      icon: "⚡",
      title: t("items.2.title"),
      desc: t("items.2.description"),
    },
    {
      id: "04",
      icon: "🛠",
      title: t("items.3.title"),
      desc: t("items.3.description"),
    },
  ];

  return (
    <section id="services" className="bg-brand-bg relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <p className="type-eyebrow text-brand-yellow mb-6 font-sans text-xs font-bold tracking-[0.12em] uppercase">{t("eyebrow")}</p>
        <h2 className="type-h2 text-white font-display text-5xl font-normal leading-[1.05] tracking-[-0.05em] uppercase">{t("headline")} <span className="text-brand-yellow">{t("headline_accent")}</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1px] bg-white/5 border-b border-white/5">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ id, icon, title, desc }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group relative bg-[#08080E] border border-white/5 hover:border-[#D4D93F]/20 p-8 md:p-16 h-full min-h-[400px] flex flex-col justify-between overflow-hidden cursor-default transition-colors duration-500"
    >
      {/* Hover Background Sweep */}
      <motion.div
        initial={{ y: "101%" }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 bg-brand-navy z-0"
      />

      <div className="relative z-10">
        <span className="text-[120px] font-display font-black text-white/3 absolute -top-10 -left-6 leading-none pointer-events-none group-hover:text-white/5 transition-colors">
          {id}
        </span>
        <span className="text-3xl mb-4 block">{icon}</span>
        <h3 className="type-h3-lg mb-6 group-hover:text-white transition-colors font-display text-[30px] font-normal leading-[1.1] tracking-[-0.04em] uppercase">
          {title}
        </h3>
        <p className="type-body text-neutral-400 max-w-sm group-hover:text-white/80 transition-colors font-sans text-base font-normal leading-[1.65]">
          {desc}
        </p>
      </div>

      <div className="relative z-10 flex justify-end">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-bg transition-all duration-300">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
