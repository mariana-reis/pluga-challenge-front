import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './'
})

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}

export default createJestConfig(config)
