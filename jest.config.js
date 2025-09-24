module.exports = {
  testEnvironment: "jsdom",

  // Transform JS/JSX using babel-jest
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  // File extensions Jest will look for
  moduleFileExtensions: ["js", "jsx"],

  // Mock static assets like images
  moduleNameMapper: {
    // Images
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",

    // CSS/SASS/SCSS modules
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },

  // Optional: Ignore node_modules except your src files
  transformIgnorePatterns: ["/node_modules/"],
};
