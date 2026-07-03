"use client";

import {useLocale} from "next-intl";
import {Languages} from "lucide-react";
import {usePathname, useRouter} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {SiteContent} from "@/content/siteContent";

export default function LanguageSwitcher({content}: {content: SiteContent["nav"]}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale: Locale = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      aria-label={`${content.languageLabel}: ${content.switchTo}`}
      onClick={() => router.replace(pathname, {locale: nextLocale})}
      className="fixed top-24 right-6 z-[80] inline-flex items-center gap-2 px-3 py-2 font-mono-custom text-[10px] tracking-[0.22em] uppercase transition-colors"
      style={{
        border: "1px solid rgba(232,160,48,0.25)",
        background: "rgba(3,3,10,0.72)",
        color: "rgba(232,160,48,0.72)",
        backdropFilter: "blur(10px)",
      }}
      data-cursor
    >
      <Languages size={13} />
      {content.switchTo}
    </button>
  );
}
