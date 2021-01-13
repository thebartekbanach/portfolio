/* eslint-disable @typescript-eslint/no-var-requires */
const { nextI18NextRewrites } = require("next-i18next/rewrites");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const localeSubpaths = {
	en: "en"
};

module.exports = {
	rewrites: async () => nextI18NextRewrites(localeSubpaths),
	publicRuntimeConfig: {
		localeSubpaths
	},
	env: {
		EMAIL_GATEWAY_API_ADDRESS: process.env.EMAIL_GATEWAY_API_ADDRESS
	},
	webpack: (config, options) => {
		if (config.resolve.plugins) {
			config.resolve.plugins.push(new TsConfigPathsPlugin());
		} else {
			config.resolve.plugins = [new TsConfigPathsPlugin()];
		}

		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/
			},
			use: ["@svgr/webpack"]
		});

		if (!options.isServer && config.mode === "development") {
			const path = require("path");
			const { I18NextHMRPlugin } = require("i18next-hmr/plugin");

			config.plugins.push(
				new I18NextHMRPlugin({
					localesDir: path.resolve(__dirname, "public/locales")
				})
			);
		}

		return config;
	}
};
