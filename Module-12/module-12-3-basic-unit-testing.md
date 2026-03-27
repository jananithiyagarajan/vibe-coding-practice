## Practical 3: Basic Unit Testing (Jest for beginners)

### Why (in simple terms)

In Practical 1, we tested the whole "Car" (API). In **Unit Testing**, we test the "Spark Plug" (a single function).

**Why do we do this?**
- **Isolate the Problem**: If the car doesn't start, is it the engine, the battery, or the key? Unit tests tell you exactly which "unit" is broken.
- **Speed**: You can run 1,000 unit tests in less than a second.
- **Confidence**: When you change a small piece of code, you can be 100% sure you didn't break something else.

Think of it like:
- **API Testing**: Tasting the whole soup.
- **Unit Testing**: Tasting the salt, the pepper, and the water separately to make sure they are good.

### What you'll build

You'll create a "Math & Logic Utility" and write your first **Automated Tests** using **Jest**.

### Quick start for beginners

**We'll build on the project from Practical 2**

## Step 0: Open your project

1. Open the `testing-practice` folder.
2. Open your terminal in VS Code.

## Step 1: Install Jest

In terminal, type:

```bash
npm install jest --save-dev
```

## Step 2: Update package.json

Open `package.json` and change the `"scripts"` section:

```json
"scripts": {
  "test": "jest"
}
```

## Step 3: Create a Function to Test

Create a file named `math.js` and paste this:

```js
// 1. Simple math functions
function add(a, b) {
  return a + b;
}

function calculateDiscount(price, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Invalid discount");
  }
  return price - (price * (discountPercent / 100));
}

// 2. Export them so the test can see them
module.exports = { add, calculateDiscount };
```

## Step 4: Create the Test File

Create a file named `math.test.js` (Jest looks for files ending in `.test.js`):

```js
const { add, calculateDiscount } = require('./math');

// 1. Test the 'add' function
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

// 2. Test the 'calculateDiscount' function
test('calculates 20% discount on 100 to be 80', () => {
  expect(calculateDiscount(100, 20)).toBe(80);
});

// 3. Test for "Edge Cases" (Errors)
test('throws error for invalid discount', () => {
  expect(() => calculateDiscount(100, 150)).toThrow("Invalid discount");
});
```

## Step 5: Run the tests

In terminal, type:
```bash
npm test
```

**What you're learning:**
- `test()` defines a single "unit" of code to check.
- `expect()` and `toBe()` are how we tell the computer "The answer should be X."
- If the code changes and the answer is no longer X, the test **Fails** (Red).

---

### ✅ Success Checklist

- [ ] `jest` installed and `package.json` updated.
- [ ] `npm test` runs and shows 3 "PASS" marks.
- [ ] You changed a number in `math.js` and saw the test **Fail**.
- [ ] You understand: **Unit Test** = Testing a single function.

### 🆘 Common Problems

**Problem**: "jest: command not found"
- **Fix**: Make sure you ran `npm install jest` and updated `package.json`.

**Problem**: "No tests found"
- **Fix**: Make sure your test file ends in `.test.js` (e.g., `math.test.js`).

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build a "Unit Testing Dashboard".

Requirements:
- A list of my "Functions" (add, calculateDiscount).
- A "Run Test" button next to each function.
- When clicked, it should show a "Green Check" (Pass) or "Red X" (Fail).
- Display a "Test Coverage" bar (how much of the code is tested).
- An "Edit Code" area where I can try to "Break" the function.
- Use a "Science/Laboratory" theme (green and white, test tube icons).

Make it look like a high-tech lab for verifying code quality!
```
