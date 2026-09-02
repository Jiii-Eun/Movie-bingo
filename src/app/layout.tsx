import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import NavLayout from "@/components/layouts/header/NavLayout";
import QueryProvider from "@/components/providers/QueryProvider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bingo",
  description: "ott 서비스 모음",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <QueryProvider>
            <Suspense>
              <NavLayout />
            </Suspense>

            <main className="flex-1">{children}</main>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
