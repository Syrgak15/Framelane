import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["dayalopticalsindia.com"],
    },

    transpilePackages: [],
    webpack: (config) => {
        config.externals = config.externals || {};
        config.externals["typeorm"] = "commonjs typeorm";
        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
