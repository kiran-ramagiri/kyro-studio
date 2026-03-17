"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Nav = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("services"), href: "#services" },
    { name: t("why"), href: "#why-kyro" },
    { name: t("process"), href: "#process" },
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

        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[15px] font-medium tracking-tight hover:text-brand-yellow transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleLocale}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-current text-xs font-bold uppercase hover:bg-white hover:text-black dark:hover:bg-brand-yellow dark:hover:text-black transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{locale === "en" ? "HR" : "EN"}</span>
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link
            href="https://calendar.app.google/SkMr99BXaF5DhGn98"
            target="_blank"
            className="bg-brand-yellow text-brand-bg px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform"
          >
            {t("cta")}
          </Link>
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
                className="text-4xl font-display uppercase tracking-tighter"
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
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center space-x-2 text-xl"
              >
                {theme === "dark" ? <Sun /> : <Moon />}
                <span>{theme === "dark" ? t("lightMode") : t("darkMode")}</span>
              </button>
              <Link
                href="https://calendar.app.google/SkMr99BXaF5DhGn98"
                target="_blank"
                className="bg-brand-yellow text-brand-bg text-center py-5 rounded-xl text-lg font-display uppercase font-bold tracking-tight"
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
