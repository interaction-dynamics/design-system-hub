import type { Config } from 'jest'

const config: Config = {
  testMatch: ['<rootDir>/src/**/*.test.{tsx,ts}'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/$1',
  },
  verbose: true,
}

export default config
