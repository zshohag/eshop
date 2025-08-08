// import type { Metadata } from "next";
// import { Poppins, Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Navbar } from "@/components/shared/Navbar";
// import { NextAuthProvider } from "@/providers/SessionProvider";
// import { Providers as QueryProviders } from "@/providers/QueryProvider";
// import { Toaster } from "react-hot-toast";
// import ReduxProvider from "@/providers/ReduxProvider";
// import { ClientWrapper } from "@/components/ClientWrapper";
// import { ThemeProvider } from "@/components/Theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["400", "500", "600", "700"],
// });

// export const metadata: Metadata = {
//   title: "eshop",
//   description: "A modern e-commerce app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
//       </head>
//       <body
//         className={`
//     ${geistSans.variable}
//     ${geistMono.variable}
//     ${poppins.variable}
//     font-sans
//   `}
//         suppressHydrationWarning
//       >
//         <ThemeProvider attribute="class" defaultTheme="system">
//           <NextAuthProvider>
//             <QueryProviders>
//               <ReduxProvider>
//                 <Navbar />
//                 <ClientWrapper>{children}</ClientWrapper>
//               </ReduxProvider>
//             </QueryProviders>
//           </NextAuthProvider>
//           <Toaster position="top-center" reverseOrder={false} />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

////////

// import type { Metadata } from "next";
// import { Poppins, Geist, Geist_Mono, Montserrat } from "next/font/google"; // ✅ Added Montserrat
// import "./globals.css";
// import { Navbar } from "@/components/shared/Navbar";
// import { NextAuthProvider } from "@/providers/SessionProvider";
// import { Providers as QueryProviders } from "@/providers/QueryProvider";
// import { Toaster } from "react-hot-toast";
// import ReduxProvider from "@/providers/ReduxProvider";
// import { ClientWrapper } from "@/components/ClientWrapper";
// import { ThemeProvider } from "@/components/Theme-provider";

// // Existing fonts
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["400", "500", "600", "700"],
// });

// // ✅ New Montserrat font setup
// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-montserrat",
//   weight: ["400", "500", "600", "700", "800"],
// });

// export const metadata: Metadata = {
//   title: "eshop",
//   description: "A modern e-commerce app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
//       </head>
//       <body
//         className={`
//           ${geistSans.variable} 
//           ${geistMono.variable} 
//           ${poppins.variable} 
//           ${montserrat.variable}   /* ✅ Added Montserrat */
//           font-sans
//         `}
//         suppressHydrationWarning
//       >
//         <ThemeProvider attribute="class" defaultTheme="system">
//           <NextAuthProvider>
//             <QueryProviders>
//               <ReduxProvider>
//                 <Navbar />
//                 <ClientWrapper>{children}</ClientWrapper>
//               </ReduxProvider>
//             </QueryProviders>
//           </NextAuthProvider>
//           <Toaster position="top-center" reverseOrder={false} />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


/////////

import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google"; // ✅ Removed Poppins
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { NextAuthProvider } from "@/providers/SessionProvider";
import { Providers as QueryProviders } from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/providers/ReduxProvider";
import { ClientWrapper } from "@/components/ClientWrapper";
import { ThemeProvider } from "@/components/Theme-provider";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"], // ✅ Common weights
});

export const metadata: Metadata = {
  title: "eshop",
  description: "A modern e-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${montserrat.variable} /* ✅ Only Montserrat for sans-serif */
          font-sans
        `}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <NextAuthProvider>
            <QueryProviders>
              <ReduxProvider>
                <Navbar />
                <ClientWrapper>{children}</ClientWrapper>
              </ReduxProvider>
            </QueryProviders>
          </NextAuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
