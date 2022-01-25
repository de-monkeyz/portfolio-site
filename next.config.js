/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

module.exports = nextConfig;
