import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deadman Vault - Digital Inheritance System",
  description: "Secure your digital assets with automated inheritance. Create vaults with deadman switch functionality on Base blockchain.",
  keywords: ["deadman vault", "digital inheritance", "crypto inheritance", "ethereum", "base blockchain", "smart contracts"],
  authors: [{ name: "Deadman Vault Team" }],
  openGraph: {
    title: "Deadman Vault - Digital Inheritance System",
    description: "Secure your digital assets with automated inheritance",
    type: "website",
  },
};

import Web3Provider from "@/components/Web3Provider";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get('cookie')
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider cookies={cookies}>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
