import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import storybookPlugin from "eslint-plugin-storybook";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import unicornPlugin from "eslint-plugin-unicorn";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	prettierConfig,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			prettier: prettierPlugin,
			"unused-imports": unusedImportsPlugin,
			unicorn: unicornPlugin,
			"@typescript-eslint": typescriptEslintPlugin,
		},
		rules: {
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"unused-imports/no-unused-imports": "error",
			"unicorn/filename-case": "off",
			"prettier/prettier": "error",
			"@typescript-eslint/no-explicit-any": "warn",
		},
	},
	...storybookPlugin.configs["flat/recommended"],
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
		"node_modules/**",
		"dist/**",
		".open-next/**",
		"coverage/**",
		"storybook-static/**",
		"*.config.js",
		"*.config.mjs",
		"*.config.ts",
		".storybook/**",
	]),
]);

export default eslintConfig;
