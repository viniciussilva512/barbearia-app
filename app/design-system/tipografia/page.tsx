import {
  Archivo_Narrow,
  Barlow_Condensed,
  Bebas_Neue,
  DM_Sans,
  Inter,
  Manrope,
  Oswald,
  Source_Sans_3,
} from "next/font/google";

import { TypographyLab } from "./typography-lab";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-lab-a-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-lab-a-body",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-lab-b-display",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-lab-b-body",
  subsets: ["latin"],
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-lab-c-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-lab-c-body",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-lab-d-display",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-lab-d-body",
  subsets: ["latin"],
  display: "swap",
});

export default function TypographyPage() {
  return (
    <main
      className={[
        barlowCondensed.variable,
        inter.variable,
        oswald.variable,
        manrope.variable,
        archivoNarrow.variable,
        dmSans.variable,
        bebasNeue.variable,
        sourceSans3.variable,
      ].join(" ")}
    >
      <TypographyLab />
    </main>
  );
}