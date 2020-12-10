// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:@typescript-eslint/recommended"
	],
	plugins: ["react", "@typescript-eslint", "prettier"],
	env: {
		es6: true,
		browser: true,
		jest: true,
		node: true
	},
	rules: {
		"prettier/prettier": ["error", { singleQuote: false }],
		"@typescript-eslint/explicit-member-accessibility": 0,
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"react/display-name": 0,
		"react/react-in-jsx-scope": 0,
		"react/prop-types": 0,
		"no-mixed-spaces-and-tabs": "off",
		"no-extra-boolean-cast": 0,
		"import/order": [
			"error",
			{
				groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
				"newlines-between": "always",
				pathGroups: [
					{
						pattern: "~/**/*.svg",
						group: "internal",
						position: "after"
					},
					{
						pattern: "~/**",
						group: "internal",
						position: "before"
					}
				],
				alphabetize: {
					order: "asc",
					caseInsensitive: true
				}
			}
		]
	},
	settings: {
		react: {
			pragma: "React",
			version: "detect"
		},
		"import/resolver": {
			webpack: {
				config: {
					resolve: {
						extensions: [".ts", ".tsx"],
						alias: {
							"~": path.resolve(__dirname, "./")
						}
					}
				}
			}
		}
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module"
	}
};
