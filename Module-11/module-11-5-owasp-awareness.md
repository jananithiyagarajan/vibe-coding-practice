## Practical 5: Basic OWASP Awareness (Top 10 Risks Explained)

### Why (in simple terms)

In the world of web security, there is a global community called **OWASP** (Open Web Application Security Project). 

**The OWASP Top 10**:
- This is a list of the 10 most common and dangerous ways hackers break into websites.
- Think of it as the "Top 10 Most Wanted" list for security bugs.
- If you know these 10, you are already ahead of 90% of beginner developers.

### What you'll build

You'll create an "OWASP Risk Explorer" that:
- Explains the most important risks in simple English.
- Shows you how to "fix" them in your Node.js code.
- Provides a checklist for your own projects.

### The "Big Three" for Beginners

| Risk Name | What it is | How to Fix |
| :--- | :--- | :--- |
| **1. Injection** | Hacker sends bad data (like SQL or Script) to your server. | Use **Input Validation** (Module 11.4). |
| **2. Broken Auth** | Hacker steals a session or guesses a weak password. | Use **Hashing** (Module 11.1) and **JWT** (Module 6). |
| **3. Sensitive Data Exposure** | Hacker steals credit cards or passwords because they were not encrypted. | Use **HTTPS** (Module 11.3) and **Environment Variables** (Module 11.2). |

---

### Your Security Checklist (The "Vibe Coding" Standard)

Before you launch any app, ask yourself these 5 questions:

1. **Passwords**: Are they hashed with `bcrypt`? (Never store plain text!)
2. **API Keys**: Are they in a `.env` file? (Is `.env` in your `.gitignore`?)
3. **URL**: Does it start with `https://`? (Is the padlock visible?)
4. **Input**: Am I validating user input before saving it? (Check for `<script>` tags!)
5. **Errors**: Am I showing "Technical Errors" to users? (Never show database errors to a user! Show "Something went wrong" instead.)

---

### ✅ Success Checklist

- [ ] You can name at least 3 OWASP risks.
- [ ] You understand: **Security is a process, not a one-time task.**
- [ ] You have a "Security First" mindset for your next project.

### 🆘 Common Problems

**Problem**: "Security is too hard/expensive"
- **Fix**: Most security tools (like `bcrypt`, `dotenv`, `helmet`) are **FREE** and take 5 minutes to set up.

**Problem**: "My app is too small to be hacked"
- **Fix**: Hackers use "Bots" that scan every website on the internet automatically. They don't care how small you are!

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build an "OWASP Security Scanner" UI.

Requirements:
- A "Project Security Score" dashboard (starts at 0%).
- A checklist of 10 security items (the OWASP Top 10).
- When I "Check" an item (e.g., "Passwords Hashed"), the score goes up.
- Each item should have a "Learn More" tooltip with a simple explanation.
- A "Generate Security Report" button.
- Use a "Cyber-Security/Shield" theme (dark blues, glowing icons, shields).
- Add a "Safe" vs "At Risk" status indicator.

Make it look like a professional security auditing tool for developers!
```
