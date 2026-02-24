// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TRPCProvider } from "@/lib/providers/TRPCProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: "MOBOUI — Mobile UI Components for Flutter, React Native & Expo",
    description: "Production-ready mobile UI kit with 30+ components for Flutter, React Native & Expo. Copy, paste, and ship beautiful apps faster.",
    keywords: ["mobile ui", "flutter components", "react native ui", "expo components", "ui kit", "app design"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased font-body selection:bg-amber-500 selection:text-black transition-colors duration-300`}
            >
                <TRPCProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-grow">
                                {children}
                            </main>
                            <Footer />
                        </div>
                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                                style: {
                                    background: '#0a0a0a',
                                    color: '#fff',
                                    border: '1px solid #262626',
                                    borderRadius: '12px',
                                },
                            }}
                        />
                    </ThemeProvider>
                </TRPCProvider>
            </body>
        </html>
    );
}
