/** @type {import('next').NextConfig} */
const nextConfig = {
    // distDir: 'build',
    // output: 'standalone',
    // turbopack: {
    //     resolveAlias: {
    //         'mapbox-gl': 'maplibre-gl',
    //     },
    // },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    // Enforce HTTPS
                    // {
                    //     key: 'Strict-Transport-Security',
                    //     value: 'max-age=63072000; includeSubDomains; preload'
                    // },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
//   })

// module.exports = withBundleAnalyzer(nextConfig)
