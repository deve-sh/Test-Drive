// Validates that test/it blocks aren't called outside 'describe' and expect expressions aren't called outside 'test/it'.

function validateCallStack(current = "test", error) {
	const parent = {
		test: "describe",
		expect: "test",
	};

	error =
		error ||
		((errorMessage) => {
			throw new Error(errorMessage);
		});

	if (current === "describe") {
		if (callStackForTests.length)
			return error(
				"describe blocks cannot be nested. They must be at the root of your test cases."
			);
	} else if (
		!callStackForTests.length ||
		callStackForTests[callStackForTests.length - 1] !== parent[current]
	)
		return error(
			`${current} blocks need to be inside a ${parent[current]} block.`
		);
	callStackForTests.push(current);
}

module.exports = validateCallStack;
