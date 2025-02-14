const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsp = require("@typescript-eslint/parser");

const envGlobals = Object.keys(process.env).reduce((acc, key) => {
  acc[key] = "readonly";
  return acc;
}, {});

module.exports = [
  js.configs.recommended, // JavaScript recommended rules
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsp,
      parserOptions: {
        project: "./tsconfig.json", // Adjust if needed,
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: {
        ...envGlobals,
        process: "true",
        console: "true",
        URL: "true",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
    ignores: ["node_modules", "dist", "coverage", "docs", "eslint.config.js", "src/types/*"],
  },
];
