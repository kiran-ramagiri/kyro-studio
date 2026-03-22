"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const Marquee = () => {
  const t = useTranslations("marquee");
  const shouldReduceMotion = useReducedMotion();
  const items = [
    t("items.0"),
    t("items.1"),
    t("items.2"),
    t("items.3"),
    t("items.4"),
    t("items.5"),
  ];

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div aria-hidden="true" className="bg-brand-yellow py-4 overflow-hidden select-none border-y border-brand-yellow">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={shouldReduceMotion ? undefined : { x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center"
        >
          {duplicatedItems.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="type-marquee text-brand-bg mx-8 font-display text-[13px] font-bold tracking-[0.12em] uppercase">
                {item}
              </span>
              <span className="text-brand-bg/40 text-lg">◆</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
