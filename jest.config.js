//Jest is hitting CSS imports and trying to parse them as if they were JavaScript.
//The moduleNameMapper setting tells Jest how to interpret files with different extensions.
module.exports = {
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
    },
};