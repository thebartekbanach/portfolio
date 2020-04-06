require("jest-ts-auto-mock");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const makeModuleNameMapper = require("./tests/rootImports");

module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	globals: {
		"ts-jest": {
			tsConfig: "tsconfig.jest.json",
			compiler: "ttypescript",
			babelConfig: ".babelrc"
		}
	},
	testRegex: "(/__tests__/.*\\.ispec)\\.(jsx?|tsx?)",
	testPathIgnorePatterns: ["/node_modules/", "/.next/"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverage: true,
	setupFilesAfterEnv: ["<rootDir>/tests/setupEnzyme.ts", "<rootDir>/tests/setupGlobals.ts"],
	moduleNameMapper: makeModuleNameMapper(),
	snapshotSerializers: ["enzyme-to-json/serializer"]
};
