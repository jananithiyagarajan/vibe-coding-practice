## Practical 2: Debugging AI-Generated Code (When the AI Makes Mistakes)

### Why (in simple terms)

AI like ChatGPT, Claude, or GitHub Copilot can write code 100x faster than humans. But sometimes, they are **confidentially wrong**.

**The Problem: "Hallucinations" and Logic Errors**
- AI might use a library that doesn't exist.
- AI might forget to `require()` a package.
- AI might write code that works in an older version of Node.js but not yours.
- AI might make a "typo" in a variable name that takes you hours to find.

**The Solution: The "Debug Loop"**
Instead of just copying and pasting, you must follow a process:
1. **Read**: Don't just paste. Scan for `require` or `import` statements.
2. **Run**: Start the server and watch the terminal.
3. **Trace**: If it crashes, read the *exact* line number in the error.
4. **Log**: Use `console.log()` to see what the AI is actually thinking.

### What you'll build

You'll take a piece of "Broken AI Code" and fix it using professional debugging techniques.

### Quick start for beginners

**We'll build on the project from Practical 1**

## Step 0: Open your project

1. Open the `testing-practice` folder.
2. Open your terminal in VS Code.

## Step 1: Create the "Broken" Code

Create a file named `broken-ai-code.js` and paste this (it has 3 intentional bugs!):

```js
const express = require('express');
const app = express();

// Bug 1: Missing JSON middleware (AI often forgets this!)
// app.use(express.json()); 

let items = ["Apple", "Banana"];

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    // Bug 2: AI used 'request.body' instead of 'req.body'
    const newItem = request.body.item; 
    
    // Bug 3: No error check for empty item
    items.push(newItem);
    res.json(items);
});

app.listen(3000, () => console.log('Broken API running...'));
```

## Step 2: Identify the Bugs

1. Run the code: `node broken-ai-code.js`.
2. Try to add an item: 
   ```bash
   curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"item":"Orange"}'
   ```
3. **Watch it crash!** You'll see: `ReferenceError: request is not defined`.

## Step 3: Fix the AI's mistakes

**Fixing Bug 2**: Change `request.body` to `req.body`.
**Fixing Bug 1**: Add `app.use(express.json());` at the top.
**Fixing Bug 3**: Add an `if (!newItem)` check.

---

### ✅ Success Checklist

- [ ] You identified why `request` was causing a crash.
- [ ] You added the missing `express.json()` middleware.
- [ ] Your code now runs without crashing.
- [ ] You understand: **AI code is a draft, not a final product.**

### 🆘 The "AI Debugging" Checklist

When AI code fails, check these 4 things:
1. **Missing Imports**: Did it forget `require('dotenv').config()` or `const express = ...`?
2. **Variable Names**: Did it use `req` in one line and `request` in another?
3. **Missing Middleware**: Did it forget `app.use(express.json())`?
4. **Incorrect Logic**: Is it trying to access a property that doesn't exist?

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build a "Code Debugger Simulator".

Requirements:
- A "Code Editor" view on the left with a piece of "Broken AI Code".
- A "Terminal" view on the right.
- A "Debug" button.
- When clicked, highlight the "Bugs" in the code (using red underlines).
- Show a "Fix" button for each bug that explains what the AI did wrong.
- An "Analyze" button that gives a "Reliability Score" for the AI code.
- Use a "Developer/IDE" theme (dark mode, syntax highlighting, icons).

Make it look like a high-tech tool for verifying AI-generated code!
```
