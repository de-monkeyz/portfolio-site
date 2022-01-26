/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase, { defaultConfig }) => {
  return {
    reactStrictMode: true,
    experimental: {
      workerThreads: false,
      cpus: 1,
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              dimensions: false,
              replaceAttrValues: {
                "#000": "currentColor",
              },
            },
          },
        ],
      });
      return config;
    },
  };
};

module.exports = nextConfig;
