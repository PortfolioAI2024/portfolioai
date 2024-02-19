import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--ff-roboto",
});

export const metadata: Metadata = {
  title: "Portfolio AI",
  description: "Créé des portfolios pour les étudiants à la recherche d'un stage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-roboto antialiased, roboto.variable")}>{children}</body>
    </html>
  );
}
