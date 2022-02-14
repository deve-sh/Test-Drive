const validateCallStack = require("./validateCallStack");

const error = (errorMessage) => {
	erroredCase = true;
	throw new Error(errorMessage);
};

const test = (testName, callback) => {
	try {
		currentBlockTestCaseCount += 1;
		validateCallStack("test", error);
		testCount++;
		callback();
		console.log(`\t✓ ${testName}`);
		callStackForTests.pop();
	} catch (err) {
		console.error(`\t✕ ${testName}`);
		console.error(err);
	}
};

const describe = (suiteName, callback) => {
	try {
		validateCallStack("describe", error);
		currentBlockTestCaseCount = 0;
		testSuiteCount++;
		console.log(`Running Suite: ${suiteName}`);
		callback(); // Consists of 'test', 'expect' and 'it' blocks.
		if (!currentBlockTestCaseCount)
			throw new Error(
				`You have an empty test suite: ${suiteName}. Please remove it or add test cases inside it.`
			);
		if (erroredCase) throw new Error(`Test Suite ${suiteName} failed.`);
		console.log(`✓ ${suiteName}`);
		callStackForTests.pop();
	} catch (err) {
		console.error(`Test Suite Failed: ${suiteName}`);
		if (err.message) console.error(err);
	}
};

const fn = (functionCallback) => {
	const mockFunc = (...args) => {
		mockFunc.mock.calls += 1;
		// Add args in a later implementation.
		return functionCallback(...args);
	};
	mockFunc.mock = { calls: 0, callArgs: [] };
	return mockFunc;
};

const expect = (expression) => {
	validateCallStack("expect", error);
	const received = expression;
	const createExpectationErorr = (expected, receivedVal) =>
		error(`\nExpected: ${expected}\nReceived: ${receivedVal || received}\n`);

	const toBe = (expected, negated = false) => {
		const passesCase = negated ? received === expected : received !== expected;
		return passesCase ? createExpectationErorr(expected) : null;
	};
	const toNotEqual = (expected) => toBe(expected, true);

	// For Mocked Functions
	const toHaveBeenCalledTimes = (nTimes) => {
		const func = expression;
		if (!(func instanceof Function) || !func.mock)
			return error("Expression is not of type function");
		if (func.mock.calls.length !== nTimes)
			return createExpectationErorr(nTimes, func.mock.calls.length);
	};

	callStackForTests.pop();

	return {
		toBe,
		toEqual: toBe,
		toNotEqual,
		notToBe: toNotEqual,
		toHaveBeenCalledTimes,
	};
};

global.describe = describe;
global.test = test;
global.it = test;
global.expect = expect;
global.fn = fn;

// Big Help: https://medium.com/dailyjs/how-does-jest-work-929d0de0fa03
