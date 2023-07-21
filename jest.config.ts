import type { Config } from 'jest';

const names = ['common', 'server'];

const config: Config = {
    roots: ['<rootDir>'],
    verbose: true,
    testEnvironment: 'node',
    projects: names.map((name) => {
        return {
            displayName: name,
            testMatch: [`<rootDir>/packages/${name}/src/__tests__/**/*.test.ts`],
        };
    }),
    testPathIgnorePatterns: ['node_modules', 'dist'],
    modulePathIgnorePatterns: ['<rootDir>/terraform/*'],
    coverageDirectory: '<rootDir>/reports/coverage',
    collectCoverage: true,
    testResultsProcessor: 'jest-sonar-reporter',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
    collectCoverageFrom: [
        '<rootDir>/packages/**/*.ts',
        '!**/node_modules/**',
        '!**/dist/**',
        '!**/*.d.ts',
        '!**/__tests__/**',
        '!**/*.{config,settings}.[t|j]s',
        '!**/manifests/**',
    ],
    // moving to global
    // see https://github.com/jestjs/jest/issues/13576#issuecomment-1641843961
    reporters: [
        'default',
        [
            'jest-junit',
            {
                suiteName: `jest`,
                outputDirectory: `<rootDir>/reports/jest`,
                outputName: 'junit.xml',
                addFileAttribute: 'true',
                ancestorSeparator: ' › ',
            },
        ],
    ],
};

export default config;
