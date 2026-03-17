"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/company/kyrostudio", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Instagram", href: "https://instagram.com/kyro.studio", icon: <Instagram className="w-5 h-5" /> },
    { name: "Email", href: "mailto:hello@kyrostudio.eu", icon: <Mail className="w-5 h-5" /> },
  ];

  const legalLinks = [
    { name: t("legal.privacy"), href: `/${locale}/legal/privacy` },
    { name: t("legal.terms"), href: `/${locale}/legal/terms` },
  ];

  return (
    <footer className="border-t border-brand-yellow/10 bg-brand-bg pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="relative h-10 w-28 block mb-6">
              <Image
                src="/logo.svg"
                alt="Kyro Studio Logo"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-sm font-sans tracking-widest uppercase text-neutral-500 mb-8">
              Web · Marketing · AI Automation
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-yellow hover:text-brand-yellow transition-all"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden lg:block"></div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase text-sm mb-6 text-white">LINKS</h4>
            <div className="flex flex-col space-y-4">
              <Link href="#services" className="text-neutral-400 hover:text-brand-yellow transition-colors">Services</Link>
              <Link href="#why-kyro" className="text-neutral-400 hover:text-brand-yellow transition-colors">Why Kyro</Link>
              <Link href="#process" className="text-neutral-400 hover:text-brand-yellow transition-colors">Process</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 text-xs text-neutral-500 gap-6">
          <p>© {currentYear} Kyro Studio. All rights reserved.</p>
          <div className="flex space-x-8">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-brand-yellow transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
