module.exports = {
    jest: (config) => {
      // Add your Jest customizations here
      config.preset = "ts-jest";
      config.transform={
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    config.transformIgnorePatterns= [
        "node_modules/(?!variables/.*)"
      ]
      return config;
    },
  };
  