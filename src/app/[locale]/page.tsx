import {setRequestLocale} from "next-intl/server";
import {siteContent} from "@/content/siteContent";
import type {Locale} from "@/i18n/routing";
import HomePage from "@/components/HomePage";

type Props = {
  params: Promise<{locale: Locale}>;
};

export default async function Page({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <HomePage content={siteContent[locale]} />;
}
