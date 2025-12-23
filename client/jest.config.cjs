module.exports = {
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  setupFilesAfterEnv: ["<rootDir>/src/test/setup.js"],

  moduleFileExtensions: ["js", "jsx"],

  testPathIgnorePatterns: [
    "/e2e/",
    "e2e.spec.js",
  ],

  moduleNameMapper: {
    "\\.(svg|png|jpg|jpeg|gif|webp)(\\?url)?$": "<rootDir>/__mocks__/fileMock.js",
  },
};
