## Practical 2: Protecting API Keys (Keeping Secrets Secret)

### Why (in simple terms)

Imagine you have a "Gold Card" that gives you free access to any store. If you leave that card on your front porch, anyone can take it and spend your money.

**The Problem: Hardcoded API Keys**
- Your API keys (like Groq or OpenAI) are like your Gold Card.
- If you put them directly in your code (`const key = "gsk_123456789"`), and you upload that code to GitHub, the **whole world** can see it.
- Bots crawl GitHub every second looking for these keys. Within minutes, a hacker could use up your entire AI budget!

**The Solution: Environment Variables (.env)**
- You keep your keys in a separate "Secret File" named `.env`.
- You tell Git to **ignore** this file so it never leaves your computer.
- Your code "borrows" the keys from this secret file only when it's running.

### What you'll build

You'll create a "Secret Keeper" setup that:
- Uses the `dotenv` library to load secrets.
- Prevents your secrets from being shared.
- Shows you how to safely use keys in your code.

### Quick start for beginners

**We'll build on the project from Practical 1**

## Step 0: Open your project

1. Open the `security-practice` folder.
2. Open your terminal in VS Code.

## Step 1: Install the tools

In terminal, type:

```bash
npm install dotenv
```

## Step 2: Create the Secret File

1. Create a file named `.env` (no name, just the extension).
2. Paste your "fake" secrets inside:

```
GROQ_API_KEY=gsk_my_secret_key_123
DB_PASSWORD=my_super_secure_db_password
PORT=3000
```

## Step 3: Create the Safety Gate (.gitignore)

**This is the most important step!**
1. Create a file named `.gitignore`.
2. Type `.env` inside it.

```
.env
node_modules
```

**What this does**: It tells Git: "Never, ever upload the `.env` file to the internet."

## Step 4: Create the Secret Keeper Code

Create a file named `secret-keeper.js` and paste this:

```js
// 1. Load the secrets from .env
require('dotenv').config();

// 2. Access the secrets safely
const apiKey = process.env.GROQ_API_KEY;
const dbPass = process.env.DB_PASSWORD;
const port = process.env.PORT || 5000;

console.log("--- 🛡 Secret Keeper Active ---");

if (apiKey) {
    console.log(`✅ API Key loaded: ${apiKey.substring(0, 4)}... (Rest is hidden)`);
} else {
    console.log("❌ Error: API Key not found in .env file!");
}

console.log(`✅ Running on Port: ${port}`);

// NEVER DO THIS IN REAL LIFE:
// console.log("Hacker's Dream:", apiKey); 
```

## Step 5: Run the code

In terminal, type:
```bash
node secret-keeper.js
```

---

### ✅ Success Checklist

- [ ] `dotenv` installed.
- [ ] `.env` file created with your keys.
- [ ] `.gitignore` file created and contains `.env`.
- [ ] `secret-keeper.js` successfully reads the keys.
- [ ] You understand: **Never upload .env to GitHub.**

### 🆘 Common Problems

**Problem**: "process.env is undefined"
- **Fix**: Make sure you called `require('dotenv').config();` at the very top of your file.

**Problem**: ".env is being uploaded to GitHub"
- **Fix**: Check your `.gitignore` file. It must be named exactly `.gitignore` (with a dot).

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build a "Secret Key Vault" UI.

Requirements:
- A "Vault Door" that is locked.
- A section to input my API Keys (don't show the characters - use password type).
- A "Lock Vault" button.
- When clicked, show an animation of the key being "Hidden" in a .env file.
- A "Check Safety" button that tells me if my .gitignore is set up correctly.
- Add a "Warning" alert if any key is visible in plain text.
- Use a "Secure Vault/Bank" theme (gold, black, metallic textures).

Make it look like a high-security digital safe for my app's secrets!
```
