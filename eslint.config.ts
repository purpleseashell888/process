import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parser: tseslint.parser
		},
		plugins: {
			js,
			prettier: prettierPlugin
		},
		rules: {
			...js.configs.recommended.rules,
			"prettier/prettier": "error" // ⭐让 Prettier 错误显示为 ESLint 错误
		}
	},

	// TypeScript 推荐规则
	...tseslint.configs.recommended,

	// React
	pluginReact.configs.flat.recommended,

	// ⭐禁用与 prettier 冲突的 ESLint 规则
	prettier
];
