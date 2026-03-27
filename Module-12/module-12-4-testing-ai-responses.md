## Practical 4: Testing AI Response Quality (Evaluating LLM Output)

### Why (in simple terms)

Testing code is easy: `2 + 2` should always be `4`. But testing AI is hard because it can give a different answer every time!

**The Problem: "Stochastic" (Random) Responses**
- AI might be helpful today but rude tomorrow.
- AI might give a correct answer in 50 words today but 500 words tomorrow.
- AI might "hallucinate" facts that look real but are fake.

**The Solution: LLM Evaluation**
We don't test for "Exact Matches." Instead, we test for **Criteria**:
1. **Relevance**: Did it actually answer the question?
2. **Format**: If we asked for JSON, did we get JSON?
3. **Tone**: Is it professional or too casual?
4. **Accuracy**: Is the information correct?

### What you'll build

You'll create an "AI Quality Guard" that:
- Sends a prompt to Groq AI.
- Runs a "Validation Check" on the response.
- Scores the AI's answer from 0 to 100 based on your rules.

### Quick start for beginners

**We'll build on the project from Practical 3**

## Step 0: Open your project

1. Open the `testing-practice` folder.
2. Open your terminal in VS Code.

## Step 1: Install the tools

In terminal, type:

```bash
npm install groq-sdk dotenv
```

## Step 2: Create the AI Quality Guard

Create a file named `ai-evaluator.js` and paste this:

```js
require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testAIQuality(prompt, expectedCriteria) {
    console.log(`\n--- Testing Prompt: "${prompt}" ---`);
    
    try {
        const chat = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192",
        });

        const response = chat.choices[0].message.content;
        console.log("AI Response:", response.substring(0, 100) + "...");

        // --- EVALUATION LOGIC ---
        let score = 100;
        let deductions = [];

        // 1. Check for Length (Conciseness)
        if (expectedCriteria.maxWords && response.split(' ').length > expectedCriteria.maxWords) {
            score -= 20;
            deductions.push("Too long (failed conciseness check)");
        }

        // 2. Check for Keyword (Relevance)
        if (expectedCriteria.mustInclude && !response.toLowerCase().includes(expectedCriteria.mustInclude.toLowerCase())) {
            score -= 50;
            deductions.push(`Missing required keyword: "${expectedCriteria.mustInclude}"`);
        }

        // 3. Check for Prohibited Words (Safety)
        if (expectedCriteria.noMention && response.toLowerCase().includes(expectedCriteria.noMention.toLowerCase())) {
            score -= 30;
            deductions.push(`Used prohibited word: "${expectedCriteria.noMention}"`);
        }

        console.log(`\nFinal Quality Score: ${score}/100`);
        if (deductions.length > 0) {
            console.log("Issues found:", deductions.join(", "));
        } else {
            console.log("✅ Perfect Score!");
        }

    } catch (e) {
        console.log("Error calling AI API");
    }
}

// RUN THE TESTS
async function runAllTests() {
    // Test 1: Asking for a recipe (must include "eggs")
    await testAIQuality("Give me a 1-sentence recipe for an omelette", {
        maxWords: 20,
        mustInclude: "eggs"
    });

    // Test 2: Asking for a joke (must NOT mention "politics")
    await testAIQuality("Tell me a funny joke about space", {
        maxWords: 50,
        noMention: "politics"
    });
}

runAllTests();
```

## Step 3: Run the evaluator

In terminal, type:
```bash
node ai-evaluator.js
```

**What you're learning:**
- AI testing is about **Heuristics** (rules of thumb), not exact matches.
- You can "Automate" the quality check of your AI app.
- This is how professional teams ensure their AI bots don't say the wrong thing.

---

### ✅ Success Checklist

- [ ] `ai-evaluator.js` runs and calls the Groq API.
- [ ] You saw the "Quality Score" change based on your criteria.
- [ ] You understand: **AI Testing** = Verifying rules and patterns.

### 🆘 Common Problems

**Problem**: "Score is always 100"
- **Fix**: Try setting very strict criteria (e.g., `maxWords: 5`) and see the score drop!

**Problem**: "AI is too random"
- **Fix**: Use `temperature: 0` in your Groq API call to make the AI more consistent.

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build an "AI Quality Dashboard".

Requirements:
- A "Test Case" builder where I can set "Must Include" and "Max Length" rules.
- A "Run Test" button.
- When clicked, show a "Glow Effect" on the AI response area.
- A "Quality Gauge" (0-100) that fills up based on the score.
- A "Red Flag" list for any failed criteria.
- A "Comparison" view showing multiple AI responses for the same prompt.
- Use a "Future/Quality Control" theme (dark mode, holographic displays, gauges).

Make it look like a high-tech control room for an AI company!
```
