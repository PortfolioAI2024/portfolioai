"use client";
import useSWR from "swr";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/clerk-react";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--ff-roboto",
});

export default function RootLayout({ children }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <html lang="en">
                <body
                    className={cn("font-roboto antialiased, roboto.variable")}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
