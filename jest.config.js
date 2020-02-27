// eslint-disable-next-line no-undef
module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	globals: {
		"ts-jest": {
			tsConfig: "tsconfig.jest.json"
		}
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	testPathIgnorePatterns: ["/lib/", "/node_modules/"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverage: true,
	setupFilesAfterEnv: ["<rootDir>/tests/setupEnzyme.ts", "<rootDir>/tests/setupGlobals.ts"]
};
