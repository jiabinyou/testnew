module.exports = {
    collectCoverage: false,
    verbose: true,
    globals: {},
    preset: 'ts-jest',
    testRegex: 'test/.*\\.test\\.ts$',
    transform: {
        '\\.(ts)x?$': 'ts-jest',
    },
    testTimeout: 10000,
};
