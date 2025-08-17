/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

const jestConfig = {
    // Runs some code to configure or set up the testing framework before each test
    setupFiles: ["jest-canvas-mock"],

    // Runs some code after the testing framework has been installed in the environment
    setupFilesAfterEnv: ["jest-extended"],

    // The test environment that will be used for testing
    testEnvironment: "jest-environment-jsdom",

    // The glob patterns Jest uses to detect test files
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

    // Maximum number of workers used to run tests
    maxWorkers: "50%",

    // Module name mapping (for imports, CSS, etc.)
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "babel-jest",
        "^@ui/components$": "<rootDir>/src/ui/components",
        "^@ui/core$": "<rootDir>/src/ui/core",
        "^@ui/display-objects$": "<rootDir>/src/ui/display-objects",
        "^@ui/elements$": "<rootDir>/src/ui/elements",
        "^@ui/renderer$": "<rootDir>/src/ui/renderer",
        "^@util/constants$": "<rootDir>/src/util/constants",
        "^@util/hooks$": "<rootDir>/src/util/hooks",
        "^@util/misc$": "<rootDir>/src/util/misc",
        "^@util/scenegraph$": "<rootDir>/src/util/scenegraph",
        "^@util/types$": "<rootDir>/src/util/types",
        "^@util/vega-lite$": "<rootDir>/src/util/vega-lite",
    },

    // Transform configuration
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",   // TypeScript files
        "^.+\\.js$": "babel-jest",      // JavaScript files (needed for ESM in node_modules)
    },

    // Transform ignore patterns (allow ESM modules in node_modules to be transformed)
    transformIgnorePatterns: [
        "/node_modules/(?!(?:@d3fc/d3fc-technical-indicator)/)",
    ],

    // Add more Jest options as needed...
    // snapshotSerializers: [],
    // verbose: false,
    // resetMocks: false,
};

export default jestConfig;
