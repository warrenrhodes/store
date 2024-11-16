"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nature's Gift Store",
  description: "N.Gift Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isServerSideRendering, setIsServerSideRendering] = useState(true);

  useEffect(() => {
    setIsServerSideRendering(false);
  }, []);

  if (isServerSideRendering) {
    return <div></div>;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <ToasterProvider />
          <Header />
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
