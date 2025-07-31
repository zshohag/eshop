import type { Metadata } from "next";
import { Poppins, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { NextAuthProvider } from "@/providers/SessionProvider";
import { Providers as QueryProviders } from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/providers/ReduxProvider";
import { ClientWrapper } from "@/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "eshop",
  description: "A modern e-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
      </head>
      <body
        className={`
    ${geistSans.variable} 
    ${geistMono.variable} 
    ${poppins.variable} 
    font-sans
  `}
        suppressHydrationWarning
      >
        <NextAuthProvider>
          <QueryProviders>
            <ReduxProvider>
              <Navbar />
              <ClientWrapper>{children}</ClientWrapper>
            </ReduxProvider>
          </QueryProviders>
        </NextAuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
