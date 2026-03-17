"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Globe, Radio, Zap, Settings, ArrowUpRight } from "lucide-react";

const Services = () => {
  const t = useTranslations("services");

  const services = [
    {
      id: "01",
      icon: <Globe className="w-8 h-8" />,
      title: t("items.0.title"),
      desc: t("items.0.description"),
    },
    {
      id: "02",
      icon: <Radio className="w-8 h-8" />,
      title: t("items.1.title"),
      desc: t("items.1.description"),
    },
    {
      id: "03",
      icon: <Zap className="w-8 h-8" />,
      title: t("items.2.title"),
      desc: t("items.2.description"),
    },
    {
      id: "04",
      icon: <Settings className="w-8 h-8" />,
      title: t("items.3.title"),
      desc: t("items.3.description"),
    },
  ];

  return (
    <section id="services" className="bg-brand-bg relative overflow-hidden border-t border-white/5">
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
      className="group relative bg-brand-bg p-8 md:p-16 h-full min-h-[400px] flex flex-col justify-between overflow-hidden cursor-default transition-colors duration-500"
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
        <div className="mb-10 text-brand-yellow group-hover:text-white transition-colors">
          {icon}
        </div>
        <h3 className="text-3xl md:text-5xl font-display uppercase mb-6 tracking-tighter group-hover:text-white transition-colors leading-[0.95]">
          {title}
        </h3>
        <p className="text-neutral-400 text-base md:text-lg max-w-sm leading-relaxed group-hover:text-white/80 transition-colors">
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
