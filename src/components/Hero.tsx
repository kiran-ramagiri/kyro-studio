"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Zap, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const t = useTranslations("hero");
  const locale = useLocale();
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

  const variants = {
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

  const orbitSpring = { type: "spring", stiffness: 100, damping: 30 };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center pt-20 overflow-hidden"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#08080E_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/dot-pattern.png')] bg-repeat" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column: Content */}
        <div className="flex flex-col">
          <motion.p 
            custom={0} initial="hidden" animate="visible" variants={variants}
            className="text-brand-yellow font-bold uppercase tracking-[0.2em] text-sm mb-6"
          >
            {t("eyebrow")}
          </motion.p>
          
          <div className="mb-8 overflow-visible">
            <motion.h1 
              custom={1} initial="hidden" animate="visible" variants={variants}
              className="text-6xl md:text-[clamp(4.5rem,10vw,8.5rem)] font-display leading-[0.88] tracking-tighter flex flex-col"
            >
              <span className="text-white shrink-0">{t("headline_1")}</span>
              <span className="text-brand-yellow shrink-0">{t("headline_2")}</span>
              <span className="text-stroke text-transparent dark:text-transparent shrink-0">{t("headline_3")}</span>
            </motion.h1>
          </div>

          <motion.div
            custom={2} initial="hidden" animate="visible" variants={variants}
          >
            <p className="text-xl md:text-2xl text-white mb-3 font-medium tracking-tight">
              {t("tagline_primary")}
            </p>
            <p className="text-neutral-400 text-base md:text-lg max-w-md leading-relaxed">
              {t("tagline_secondary")}
            </p>
          </motion.div>

          <motion.div
            custom={3} initial="hidden" animate="visible" variants={variants}
            className="flex flex-col sm:flex-row gap-5 mt-10"
          >
            <Link 
              href="https://calendar.app.google/SkMr99BXaF5DhGn98"
              target="_blank"
              className="group bg-brand-yellow text-brand-bg px-8 py-4 rounded-full font-display uppercase text-base font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,217,63,0.3)] tracking-tight"
            >
              {t("cta_primary")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#services"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-display uppercase text-base font-bold flex items-center justify-center hover:bg-white hover:text-black transition-all tracking-tight"
            >
              {t("cta_secondary")}
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Visual */}
        <div className="hidden lg:flex relative justify-center items-center h-[600px]">
          {/* Orbit Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute border border-white/10 rounded-full w-[450px] h-[450px]"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute border border-white/5 rounded-full w-[350px] h-[350px]"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute border border-white/20 rounded-full w-[550px] h-[550px]"
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative z-20 w-[200px] h-[200px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-brand-yellow/30 rounded-full blur-[60px]" />
            <Image 
              src="/logo.svg" 
              alt="Kyro Logo" 
              width={160} 
              height={160} 
              className="relative z-10"
            />
          </motion.div>

          {/* Floating Cards */}
          <FloatCard 
            icon={<TrendingUp className="text-brand-yellow" />}
            title="+240% ROI"
            desc="Yearly Growth"
            className="top-20 -right-10"
            delay={0}
          />
          <FloatCard 
            icon={<Zap className="text-brand-yellow" />}
            title="120+ TASKS"
            desc="Automated Monthly"
            className="bottom-40 -left-10"
            delay={2}
          />
          <FloatCard 
            icon={<Clock className="text-brand-yellow" />}
            title="40HRS SAVED"
            desc="Per Week / Team"
            className="bottom-20 right-10"
            delay={4}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-yellow to-transparent overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-brand-yellow"
          />
        </div>
      </div>

      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </section>
  );
};

const FloatCard = ({ icon, title, desc, className, delay }: any) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      className={cn(
        "absolute glass dark:glass p-4 rounded-xl border border-white/10 flex items-center gap-4 z-30 shadow-2xl",
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
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
