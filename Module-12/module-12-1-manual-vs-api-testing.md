## Practical 1: Manual Testing vs API Testing (Postman & Curl)

### Why (in simple terms)

Imagine you're building a car.
- **Manual Testing**: You sit in the car, turn the key, and see if it starts. You do this every time you change something.
- **API Testing (Automated)**: You have a machine that flips the switch for you and checks the engine in 1 second.

**The Problem with Manual Testing**:
As your app grows, you'll have 50 different buttons and 20 different forms. Clicking every single one manually after every small change takes hours and you *will* miss something.

**The Solution: API Testing**:
Instead of using a browser, we use tools like **Postman** or **Curl** to send "test messages" to our server. This is faster, more reliable, and can be automated.

### What you'll build

You'll take a simple Note API and test it using two professional methods:
1. **The "Hacker" Way**: Using `curl` in your terminal.
2. **The "Pro" Way**: Using **Postman** (or a similar GUI tool).

### Quick start for beginners

## Step 0: Create a new folder

1. Create folder `testing-practice` on your desktop.
2. Open it in VS Code.

## Step 1: Create a simple API to test

Create a file named `server.js` and paste this:

```js
const express = require('express');
const app = express();
app.use(express.json());

let notes = [
  { id: 1, content: "Learn testing" }
];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });
  
  const newNote = { id: notes.length + 1, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
```

Run it: `node server.js`

## Step 2: The "Hacker" Way (Curl)

Open a **new** terminal and run these "test" commands:

**Test 1: Get all notes**
```bash
curl http://localhost:3000/notes
```

**Test 2: Create a note (Success)**
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"content": "Automated testing is cool"}'
```

**Test 3: Create a note (Failure Test)**
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{}'
```
*Did you get a 400 error? If yes, your API is working correctly!*

## Step 3: The "Pro" Way (Postman)

1. Download and open [Postman](https://www.postman.com/downloads/).
2. Create a "New Request".
3. Set method to `GET` and URL to `http://localhost:3000/notes`. Click **Send**.
4. Create another request, set to `POST`, URL to `http://localhost:3000/notes`.
5. Go to **Body** tab → Select **raw** → Select **JSON**.
6. Paste: `{"content": "Testing from Postman"}` and click **Send**.

---

### ✅ Success Checklist

- [ ] You can explain why manual clicking is slower than API testing.
- [ ] You successfully sent a `POST` request using `curl`.
- [ ] You successfully sent a `POST` request using Postman.
- [ ] You "broke" the API on purpose to see the error message.

### 🆘 Common Problems

**Problem**: "Connection refused"
- **Fix**: Make sure your `server.js` is still running in the first terminal.

**Problem**: "Empty response"
- **Fix**: Check if you are sending the right JSON format: `{"content": "text"}`.

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build an "API Testing Dashboard".

Requirements:
- A list of my API endpoints (GET /notes, POST /notes).
- A "Status Indicator" (Green/Red) for each endpoint.
- A "Run All Tests" button.
- When clicked, it should simulate sending requests to the backend.
- Show "Pass/Fail" results with checkmarks and X icons.
- Display the "Response Time" for each test.
- Use a "Professional/Clean" dashboard theme (white, gray, light blue).

Make it look like a high-end testing tool for developers!
```
