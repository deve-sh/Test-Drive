# Test Drive / tesg

A very simple test runner, inspired by Jest and articles related to it and it's inner workings.

### Min Requirements

NodeJS > `14.0.0`

### Get Started

```bash
npm i -g tesg
```

### Run Tests

```bash
tesg <directory/filename>
```

In case of a directory, the files to be tested should have `.test` in their name.

### Examples of Tests

```javascript
// ✅ Valid
describe("Suite 1", () => {
	test("Test Case 1", () => {
		expect(1 === 2).toBe(false);
	});
});

describe("Suite 2", () => {
	test("Test Case 2", () => {
		expect(1 === 2).toEqual(false);
	});

	test("Test Case 3", () => {
		expect(1 == true).toEqual(true);
	});
});

// ❌ Invalid
describe("Suite 3", () => {
    // No test cases. Will throw an error.
})

test("Test case 4", () => ...); // Cannot put it/test functions outside a 'describe' block.

expect(1 === 1).toBe(true); // Cannot put an expect block outside of a 'test/it' block.
```

### Available Assertions

- `toBe`
- `notToBe`
- `toNotBe`
- `toEqual`
- `toHaveBeenCalledTimes` - In case of mocked functions

#### Limitations

Assertions don't work on Objects yet, will add support for it later.

Async operations are not supported yet.

### Contribution & Issues

[Raise an issue](https://github.com/deve-sh/Test-Drive/issues/new)

[Create a Pull Request](https://github.com/deve-sh/Test-Drive/compare)

Contributions and feedback are welcome, this is a weekend project built out of curiousity, any good changes will be merged.
