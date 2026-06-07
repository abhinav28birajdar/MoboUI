// src/app/layout.tsx
import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
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
                className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased font-body selection:bg-primary selection:text-primary-foreground`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    forcedTheme="dark"
                    enableSystem={false}
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
                                background: '#111113',
                                color: '#fafafa',
                                border: '1px solid rgba(39,39,42,0.5)',
                                borderRadius: '12px',
                            },
                        }}
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
