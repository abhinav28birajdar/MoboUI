import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/playground",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: "frame-src 'self' https://snack.expo.dev https://dartpad.dev;",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
