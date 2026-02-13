import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillHub - AI Agent Skills Marketplace",
  description: "Add new capabilities to your AI Agent with one click",
  keywords: ["AI Agent", "Skills", "OpenClaw", "Marketplace", "Automation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
