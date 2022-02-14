#!/usr/bin/env node

// A simple test runner.
// Run it like 'testdrive <directory/filename>'

const testDirectory = process.argv[2];

if (!testDirectory)
	return console.error("Please provide a directory/file name to run tests on.");

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const directoryName = path.resolve(process.cwd(), testDirectory);
const directoryStat = fs.statSync(directoryName);

// Initialize counts
global.testCount = 0;
global.testSuiteCount = 0;
global.erroredCase = false;

// To map call stacks, to ensure 'expect', 'it' and 'test' blocks are not called outside the appropriate blocks.
global.callStackForTests = [];
global.currentBlockTestCaseCount = 0;

require("./TestDrive"); // Initialize functions to run tests.

const startTime = performance.now();
if (directoryStat.isDirectory()) {
	// Recursively go to each file inside the directory, check if it has '.test' in its name
	const getAllFiles = require("./getAllFiles");
	const testFiles = getAllFiles(directoryName).filter((fileName) =>
		fileName.includes(".test")
	);
	for (let i = 0; i < testFiles.length; i++) {
		const fileRelativePath = testFiles[i].split(process.cwd()).pop();
		console.log(`Running Tests from .${fileRelativePath}`);
		require(`.${fileRelativePath}`);
	}
} else {
	// It's a normal file. Just require it and run the test cases.
	let fileName = directoryName;
	console.log(`Running Tests from ${fileName}`);
	require(fileName);
}

// Print out Stats after run
if (!global.erroredCase) {
	const finishTime = performance.now();
	console.log(
		"Finished Running Tests in ",
		parseInt(finishTime - startTime) + "ms"
	);
	console.log("Suites Run: ", global.testSuiteCount);
	console.log("Test Cases Run: ", global.testCount);
	process.exit(0);
} else process.exit(1); // Errored Exit
