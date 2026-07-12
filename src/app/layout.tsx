// src/app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { PageAnimate } from "@/components/layout/PageAnimate";
import LoginPromptModal from "@/components/global/login-prompt-modal";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-heading",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-body",
});

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-code",
});

export const metadata: Metadata = {
    title: "MOBOUI — Mobile UI Components for Flutter, React Native & Expo",
    description: "Production-ready mobile UI kit with 50+ components for Flutter, React Native & Expo. Copy, paste, and ship beautiful apps faster.",
    keywords: ["mobile ui", "flutter components", "react native ui", "expo components", "ui kit", "app design"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body
                className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased bg-bg-base text-text-primary min-h-screen relative overflow-x-hidden`}
            >
                {/* Noise Overlay */}
                <div className="fixed inset-0 pointer-events-none bg-noise z-50 opacity-[0.6]" />
                
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    forcedTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen relative z-10">
                        <Navbar />
                        <LoginPromptModal />
                        <main className="flex-grow flex flex-col pt-20">
                            <PageAnimate>
                                {children}
                            </PageAnimate>
                        </main>
                        <Footer />
                    </div>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                background: '#0F0F12',
                                color: '#FAFAFA',
                                border: '1px solid rgba(39,39,42,0.6)',
                                borderRadius: '10px',
                            },
                        }}
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
