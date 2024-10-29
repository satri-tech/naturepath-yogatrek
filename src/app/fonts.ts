// src/app/fonts.ts
import { Noto_Sans_Display, Petrona } from "next/font/google";

// Configure the Petrona font
export const petrona = Petrona({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const noto = Noto_Sans_Display({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
