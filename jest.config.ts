import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*'],
  coverageReporters: ['json', 'lcov'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/build'],
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
}

export default config
