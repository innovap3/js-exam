module.exports = {
  roots: ['<rootDir>/src/'],
  moduleFileExtensions: ['js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.js',
};
