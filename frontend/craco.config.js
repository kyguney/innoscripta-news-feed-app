const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@compositions": path.resolve(__dirname, "src/compositions"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
    },
  },
};
