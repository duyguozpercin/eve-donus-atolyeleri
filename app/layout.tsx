import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eve Dönüş Atölyeleri",
    template: "%s | Eve Dönüş Atölyeleri",
  },
  description:
    "Mindfulness, öz şefkat ve yaratıcı yazarlık atölyeleri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FAF8F1]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}