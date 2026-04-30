import "./globals.css";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-poppins" });

export const metadata = {
  title: "Fashion Designer",
  description: "Custom-made dresses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
