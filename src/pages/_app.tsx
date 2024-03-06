import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <LanguageProvider>
      <main className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
        <Analytics />
      </main>
    </LanguageProvider>
  );
};

export default MyApp;
