export default {
    preset: "ts-jest", // Add ESM preset for ts-jest
    transform: {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    moduleNameMapper: {
      "^axios$": require.resolve("axios"),
    },
    transformIgnorePatterns: [
        "node_modules/(?!variables/.*)"
      ]
    };
  