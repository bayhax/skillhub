import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://skillhub-teal.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "SkillHub - AI Agent Skills Marketplace",
    template: "%s | SkillHub",
  },
  description: "Discover and install 150+ AI Agent skills. Add new capabilities to your OpenClaw Agent with one click — Search, Install, Start using.",
  keywords: ["AI Agent", "Skills", "OpenClaw", "Marketplace", "Automation", "MCP", "Claude", "Agent Skills", "AI Tools"],
  authors: [{ name: "SkillHub Community" }],
  creator: "SkillHub",
  publisher: "SkillHub",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "zh": "/zh",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    url: siteUrl,
    siteName: "SkillHub",
    title: "SkillHub - AI Agent Skills Marketplace",
    description: "Discover and install 150+ AI Agent skills. Add new capabilities to your OpenClaw Agent with one click.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkillHub - AI Agent Skills Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillHub - AI Agent Skills Marketplace",
    description: "Discover and install 150+ AI Agent skills. Add new capabilities to your OpenClaw Agent with one click.",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
