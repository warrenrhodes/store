import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

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
