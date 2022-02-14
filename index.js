// A simple test runner.
// Run it like 'testdrive'

// Initialize counts
global.testCount = 0;
global.testSuiteCount = 0;
global.erroredCase = false;

// To map call stacks, to ensure 'expect', 'it' and 'test' blocks are not called outside the appropriate blocks.
global.callStackForTests = [];
global.currentBlockTestCaseCount = 0;

require("./TestDrive");
