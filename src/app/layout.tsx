import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillHub - AI Agent Skills Marketplace",
  description: "一键为你的 AI Agent 添加新能力 — 搜索、安装、开始使用",
  keywords: ["AI Agent", "Skills", "OpenClaw", "Marketplace", "Automation"],
  openGraph: {
    title: "SkillHub - AI Agent Skills Marketplace",
    description: "一键为你的 AI Agent 添加新能力",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
