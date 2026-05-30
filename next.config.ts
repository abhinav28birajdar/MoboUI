import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // ========================================
    // Performance & Optimization
    // ========================================
    
    // Enable SWCMinify for production builds
    swcMinify: true,

    // Experimental features for better performance
    experimental: {
        // Turbopack for faster builds (opt-in)
        // turbopack: true,
    },

    // ========================================
    // Code Quality
    // ========================================
    
    // ESLint configuration
    eslint: {
        // Fail on errors in production, warn in development
        ignoreDuringBuilds: process.env.NODE_ENV === "development",
        dirs: ["src", "app"],
    },

    // TypeScript strict mode
    typescript: {
        tsconfigPath: "./tsconfig.json",
    },

    // ========================================
    // Headers & Security
    // ========================================
    
    async headers() {
        return [
            // Security headers for all pages
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                ],
            },
            // CSP for playground (allows embedded content)
            {
                source: "/playground",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: "frame-src 'self' https://snack.expo.dev https://dartpad.dev;",
                    },
                ],
            },
            // Cache static assets
            {
                source: "/public/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            // Cache images
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },

    // ========================================
    // Redirects
    // ========================================
    
    async redirects() {
        return [
            // Old URLs to new URLs
            // {
            //     source: '/old-page',
            //     destination: '/new-page',
            //     permanent: true, // 301 redirect
            // },
        ];
    },

    // ========================================
    // Rewrites
    // ========================================
    
    async rewrites() {
        return {
            beforeFiles: [
                // Rewrite /api to /api/
                // {
                //     source: '/api/:path*',
                //     destination: '/api/:path*',
                // },
            ],
        };
    },

    // ========================================
    // Image Optimization
    // ========================================
    
    images: {
        // Supported formats
        formats: ["image/webp", "image/avif"],

        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

        // Image sizes for srcset
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

        // Allowed image domains
        domains: [
            "localhost",
            "yourdomain.com",
            // Add your Supabase storage domain:
            // "your-project.supabase.co",
        ],

        // Cache optimization
        minimumCacheTTL: 31536000, // 1 year
    },

    // ========================================
    // Environment Variables
    // ========================================
    
    env: {
        // Make variables available globally
        // NEXT_PUBLIC_* are automatically exposed
    },

    // ========================================
    // Webpack & Build
    // ========================================
    
    webpack: (config, { isServer }) => {
        // Custom webpack configuration
        return config;
    },

    // ========================================
    // Output & Build
    // ========================================
    
    // Standalone build for Docker
    output: "standalone",

    // ========================================
    // Root Directory
    // ========================================
    
    // Next.js app directory
    appDir: true,
};

export default nextConfig;
