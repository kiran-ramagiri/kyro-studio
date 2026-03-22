"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Zap, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const t = useTranslations("hero");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.21, 0.45, 0.32, 0.9] as any,
      },
    }),
  };

  const lineReveal = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        delay: 0.1 + i * 0.12,
        duration: 0.75,
        ease: [0.21, 0.45, 0.32, 0.9] as any,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-navy/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-yellow/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: mousePos.x * 0.15, y: mousePos.y * 0.2 }}
          className="absolute top-3/4 left-1/3 w-[400px] h-[400px] bg-brand-navy/15 rounded-full blur-[140px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#08080E_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/dot-pattern.png')] bg-repeat" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full h-full pt-20 pb-12">
        {/* Left Column: Content */}
        <div className="flex flex-col justify-center h-full">
          <motion.p
            custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="type-eyebrow text-brand-yellow mb-6 font-sans text-xs font-bold tracking-[0.12em] uppercase"
          >
            {t("eyebrow")}
          </motion.p>

          <div className="mb-8 overflow-visible">
            <h1 className="type-h1 flex flex-col font-display text-[60px] font-normal leading-none tracking-[-0.05em]">
              <div className="overflow-hidden">
                <motion.span
                  custom={0} initial="hidden" animate="visible" variants={lineReveal}
                  className="block text-white shrink-0"
                >
                  {t("headline_1")}
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  custom={1} initial="hidden" animate="visible" variants={lineReveal}
                  className="block text-brand-yellow shrink-0"
                >
                  {t("headline_2")}
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  custom={2} initial="hidden" animate="visible" variants={lineReveal}
                  className="block text-transparent shrink-0"
                  style={{ WebkitTextStroke: '2px #D4D93F' }}
                >
                  {t("headline_3")}
                </motion.span>
              </div>
            </h1>
          </div>

          <motion.div
            custom={2} initial="hidden" animate="visible" variants={fadeUp}
          >
            <p className="type-body-lead text-white mb-3 font-sans text-base font-normal leading-[1.65]">
              {t("tagline_primary")}
            </p>
            <p className="type-body text-neutral-400 max-w-md font-sans text-base font-normal leading-[1.65]">
              {t("tagline_secondary")}
            </p>
          </motion.div>

          <motion.div
            custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link
              href="https://calendar.app.google/SkMr99BXaF5DhGn98"
              target="_blank"
              className="group w-full sm:w-auto bg-brand-yellow text-brand-bg px-8 py-4 rounded-full type-button font-display text-base font-bold leading-[1.5] tracking-[-0.025em] uppercase flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,217,63,0.3)]"
            >
              {t("cta_primary")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto px-8 py-3 sm:py-4 rounded-full border border-white/20 text-white type-button font-display text-sm sm:text-base font-bold leading-[1.5] tracking-[-0.025em] uppercase flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              {t("cta_secondary")}
            </Link>
          </motion.div>

          {/* Mobile Stats Strip */}
          <motion.div
            custom={4} initial="hidden" animate="visible" variants={fadeUp}
            className="flex gap-6 mt-8 lg:hidden"
          >
            <div className="flex flex-col">
              <span className="text-brand-yellow font-display font-bold text-xl leading-tight">+240%</span>
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider mt-1">ROI</span>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="flex flex-col">
              <span className="text-brand-yellow font-display font-bold text-xl leading-tight">120+</span>
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider mt-1">Tasks/Mo</span>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="flex flex-col">
              <span className="text-brand-yellow font-display font-bold text-xl leading-tight">40hrs</span>
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider mt-1">Saved/Wk</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Logo + Orbit Visual */}
        <div className="hidden lg:flex relative justify-center items-center h-full">
          {/* Background glow */}
          <div className="absolute inset-0 bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Logo + Orbit rings */}
          <div className="relative flex items-center justify-center">
            {/* Orbit ring 1 — innermost, navy */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-[220px] h-[220px] rounded-full border border-[#200F8C]/60"
            />
            {/* Orbit ring 2 — middle, yellow faint */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] rounded-full border border-[#D4D93F]/10"
            />
            {/* Orbit ring 3 — outer, yellow very faint */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[380px] h-[380px] rounded-full border border-[#D4D93F]/5"
            />
            {/* Logo centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="relative z-10 w-[200px] h-auto"
              style={{ filter: "drop-shadow(0 0 40px rgba(212,217,63,0.35))" }}
            >
              <img src="/logo.svg" alt="Kyro Studio" className="w-full h-auto object-contain" />
            </motion.div>
          </div>

          {/* Floating stat cards */}
          <FloatCard
            icon={<TrendingUp className="text-brand-yellow" />}
            title="+240% ROI"
            desc="Yearly Growth"
            className="top-16 right-4"
            floatVariant="A"
          />
          <FloatCard
            icon={<Zap className="text-brand-yellow" />}
            title="120+ TASKS"
            desc="Automated Monthly"
            className="bottom-16 left-4"
            floatVariant="B"
          />
          <FloatCard
            icon={<Clock className="text-brand-yellow" />}
            title="40HRS SAVED"
            desc="Per Week / Team"
            className="bottom-6 right-4"
            floatVariant="A"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-yellow to-transparent overflow-hidden">
          <motion.div
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-brand-yellow"
          />
        </div>
      </div>
    </section>
  );
};

const floatA = { y: [0, -12, 0] as number[] };
const floatB = { y: [0, -7, 0] as number[] };

const FloatCard = ({
  icon,
  title,
  desc,
  className,
  floatVariant = "A",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  floatVariant?: "A" | "B";
}) => {
  return (
    <motion.div
      animate={floatVariant === "A" ? floatA : floatB}
      transition={{
        duration: floatVariant === "A" ? 5 : 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatVariant === "B" ? 1.5 : 0,
      }}
      className={cn(
        "absolute backdrop-blur-xl border border-[#D4D93F]/15 bg-[rgba(12,12,20,0.85)] p-4 rounded-xl flex items-center gap-4 z-30 shadow-2xl",
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-white">{title}</p>
        <p className="text-[10px] text-neutral-400 uppercase">{desc}</p>
      </div>
    </motion.div>
  );
};

export default Hero;
