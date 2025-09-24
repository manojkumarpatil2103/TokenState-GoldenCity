import "@testing-library/jest-dom";

import "resize-observer-polyfill/polyfill";

// If you don't have a global ResizeObserver polyfill, add this:
global.ResizeObserver = require("resize-observer-polyfill");
