import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Playfair_Display, Montserrat } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-playfair",
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${playfair.variable} ${montserrat.variable} text-primary-700`}
    >
      <Component {...pageProps} />
    </main>
  );
}
