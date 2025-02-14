import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsp from "@typescript-eslint/parser";
import globals from "globals";

export default [
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
    ignores: ["node_modules/", "dist/", "coverage/", "docs/", "__tests__", "src/types/*"],
  },
];
