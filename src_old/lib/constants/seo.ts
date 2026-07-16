import { Metadata } from "next";

export const siteConfig = {
  name: "MOBOUI",
  description: "Build Mobile Apps Faster. Enterprise-grade mobile UI component library for Flutter, React Native, Expo, and Web.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "https://moboui.com/og.jpg",
  twitterHandle: "@moboui",
  keywords: [
    "mobile ui",
    "component library",
    "react native components",
    "flutter components",
    "expo components",
    "ui kit",
    "mobile development",
  ],
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "MOBOUI Team",
      url: siteConfig.url,
    },
  ],
  creator: "MOBOUI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
