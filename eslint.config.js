const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsp = require("@typescript-eslint/parser");
const globals = require("globals");

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
        ...globals.node,
        ...globals.browser,
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
  },
  {
    ignores: ["node_modules/", "dist/", "coverage/", "docs/", "__tests__", "src/types/*", "eslint.config.js"],
  },
];
