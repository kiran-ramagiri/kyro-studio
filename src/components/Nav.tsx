"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["services", "why-kyro", "process", "contact"];

const Nav = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: highlight active section as user scrolls
  useEffect(() => {
    if (!mounted) return;
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [mounted]);

  const navLinks = [
    { name: t("services"), href: "#services" },
    { name: t("why"), href: "#why-kyro" },
    { name: t("process"), href: "#process" },
    { name: t("contact"), href: "#contact" },
  ];

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "hr" : "en";
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPathname;
  };

  if (!mounted) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-100 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass dark:glass shadow-lg py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="relative h-8 w-24">
          <Image
            src="/logo.svg"
            alt="Kyro Studio Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "type-nav transition-colors font-sans text-sm font-normal leading-[1.5]",
                activeSection === link.href.slice(1)
                  ? "text-brand-yellow"
                  : "hover:text-brand-yellow"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center">
          {/* Language switcher with tooltip */}
          <div className="relative group">
            <button
              onClick={toggleLocale}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-current text-xs font-bold uppercase hover:bg-white hover:text-black dark:hover:bg-brand-yellow dark:hover:text-black transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "en" ? "HR" : "EN"}</span>
            </button>
            {/* Tooltip */}
            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/10 backdrop-blur-sm px-2.5 py-1 text-[11px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {locale === "en" ? "Switch to Croatian" : "Switch to English"}
            </span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[70px] bg-brand-bg/95 backdrop-blur-xl z-50 flex flex-col p-8 space-y-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-4xl font-display uppercase transition-colors",
                  activeSection === link.href.slice(1) && "text-brand-yellow"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-white/10 flex flex-col space-y-6">
              <button
                onClick={toggleLocale}
                className="flex items-center space-x-2 text-xl"
              >
                <Globe />
                <span>{locale === "en" ? "Hrvatski" : "English"}</span>
              </button>
              <Link
                href="https://calendar.app.google/SkMr99BXaF5DhGn98"
                target="_blank"
                className="bg-brand-yellow text-brand-bg text-center py-5 rounded-xl type-button"
              >
                {t("cta")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
