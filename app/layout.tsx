import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import type { ReactNode } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Fashion Designer",
  description: "Custom-made dresses",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} font-sans`}>
        <NextTopLoader
          color="#000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
        />
        {children}
      </body>
    </html>
  );
}
