/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  testTimeout: 10000,
  testPathIgnorePatterns: ["<rootDir>/.build/"],
};
