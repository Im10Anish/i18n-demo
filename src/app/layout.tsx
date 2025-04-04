import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LocalProvider } from "./hooks/useLocale";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js i18n demo",
  description: "Internationalization demo for Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalProvider>
          <main>{children}</main>
        </LocalProvider>
      </body>
    </html>
  );
}
