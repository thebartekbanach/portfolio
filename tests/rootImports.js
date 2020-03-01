// source: https://gist.github.com/timosadchiy/87a5c3799ed44837c4d9de48a02a10bc

/**
 * Converts paths defined in tsconfig.json to the format of
 * moduleNameMapper in jest.config.js.
 *
 * For example, {'@alias/*': [ 'path/to/alias/*' ]}
 * Becomes {'@alias/(.*)': [ '<rootDir>/path/to/alias/$1' ]}
 *
 * @param {string} srcPath
 * @param {string} tsconfigPath
 */
function makeModuleNameMapper(srcPath = "<rootDir>", tsconfigPath = "../tsconfig.json") {
	// Get paths from tsconfig
	const { paths } = require(tsconfigPath).compilerOptions;

	const aliases = {};

	// Iterate over paths and convert them into moduleNameMapper format
	Object.keys(paths).forEach(item => {
		const key = item.replace("/*", "/(.*)");
		const path = paths[item][0].replace("/*", "/$1");
		aliases[key] = srcPath + "/" + path;
	});
	return aliases;
}

module.exports = makeModuleNameMapper;
