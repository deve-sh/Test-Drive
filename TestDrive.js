const error = (errorMessage) => {
	erroredCase = true;
	throw new Error(errorMessage);
};

const test = (testName, callback) => {
	try {
		global.testCount++;
		callback();
		console.log(`\t✓ ${testName}`);
	} catch (err) {
		console.error(`\t✕ ${testName}`);
		console.error(err);
	}
};

const it = test;

const describe = (suiteName, callback) => {
	try {
		global.testSuiteCount++;
		console.log(`Running Suite: ${suiteName}`);
		callback(); // Consists of 'test', 'expect' and 'it' blocks.
		if (erroredCase) throw new Error("");
		console.log(`✓ ${suiteName}`);
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

// Big Help: https://medium.com/dailyjs/how-does-jest-work-929d0de0fa03
