import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL('https://kyrostudio.eu'),
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    other: {
      'facebook-domain-verification': 'p4nfkb4bl3fl916llun75na20wgr7u',
    },
    alternates: {
      canonical: `https://kyrostudio.eu/${locale}`,
      languages: {
        'en': 'https://kyrostudio.eu/en',
        'hr': 'https://kyrostudio.eu/hr',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: './',
      siteName: 'Kyro Studio',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Kyro Studio — Web Design, Marketing & AI Automation'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kyro Studio",
    "url": "https://kyrostudio.eu",
    "email": "hello@kyrostudio.eu",
    "description": "Web design, performance marketing and AI automation agency.",
    "areaServed": "Worldwide",
    "serviceType": [
      "Web Design",
      "Performance Marketing",
      "AI Automation",
      "Custom Applications"
    ],
    "sameAs": [
      "https://linkedin.com/company/kyrostudio",
      "https://instagram.com/kyro.studio"
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider messages={messages} locale={locale}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Nav />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}
