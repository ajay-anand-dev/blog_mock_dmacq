/** @type {import('jest').Config} */
const config = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // mock CSS imports
    },
    transformIgnorePatterns: [
        "node_modules/(?!(@tanstack|react-query)/)", // ✅ allow react-query to be transformed
    ],
};
export default config;
