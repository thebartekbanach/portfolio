/* eslint-disable @typescript-eslint/no-var-requires */
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {
	pl: "pl"
};

module.exports = {
	rewrites: async () => nextI18NextRewrites(localeSubpaths),
	publicRuntimeConfig: {
		localeSubpaths
	},
	webpack: config => {
		if (config.resolve.plugins) {
			config.resolve.plugins.push(new TsConfigPathsPlugin());
		} else {
			config.resolve.plugins = [new TsConfigPathsPlugin()];
		}

		return config;
	}
};
