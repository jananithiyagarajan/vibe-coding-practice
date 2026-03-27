## Practical 5: Cost Awareness and Token Management

### Why (in simple terms)

AI isn't free. Even if you use a free tier like Groq, professional APIs (like OpenAI or Anthropic) charge you based on **Tokens**.

**What is a Token?**
Think of tokens as "pieces" of words. 1,000 tokens is roughly 750 words (about the size of a short news article).

**Why do we care?**
- **Input Costs**: Every word you send (including long System Prompts) costs money.
- **Output Costs**: Every word the AI writes costs money.
- **Context Limits**: AI can only "remember" a certain number of tokens. If you send too much, it "forgets" the beginning of the chat!

**The Golden Rule**: 
Be concise. Don't ask for a "1,000-word essay" if a "2-sentence summary" will do.

### What you'll build

You'll create a "Token Tracker" that:
- Estimates how many tokens your prompt uses.
- Calls the Groq API and retrieves the *actual* token count from the response.
- Displays the "Cost" (even if it's $0 on Groq) to teach you professional habits.

### Quick start for beginners

**We'll build on the project from Practical 4**

## Step 0: Open your project

1. Open the `ai-model-practice` folder.
2. Open `server.js` in VS Code.

## Step 1: Create the Token Tracker API

Update `server.js` and add this new endpoint:

```js
// 1. Token Tracker Endpoint
app.post('/api/tokens/track', async (req, res) => {
  const { prompt, model = "llama3-8b-8192" } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    console.log(`Tracking tokens for prompt to: ${model}`);
    
    // Call the Groq API
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
    });

    // 2. Extract Token Usage from the API response
    // Most AI APIs return a 'usage' object
    const usage = completion.usage;
    
    // 3. Simple Cost Calculation (Simulated)
    // Rates vary by model. Let's assume $0.05 per 1M tokens for Llama 3 8B
    const ratePerMillion = 0.05; 
    const totalTokens = usage.total_tokens;
    const estimatedCost = (totalTokens / 1000000) * ratePerMillion;

    res.json({
      model_used: model,
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
      total_tokens: totalTokens,
      estimated_cost_usd: estimatedCost.toFixed(6), // Show 6 decimal places
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error("❌ Token Error:", error.message);
    res.status(500).json({ error: "Failed to track tokens" });
  }
});
```

## Step 2: Run the server

In terminal, type:
```bash
node server.js
```

---

## Let's test it (easy way)

### Step 3: Test Token Counting

Open a new terminal and try this command:

```bash
curl -X POST http://localhost:3000/api/tokens/track \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Write a 500-word essay on the history of the internet.","model":"llama3-70b-8192"}'
```

**What you're learning:**
- **Prompt Tokens**: The "cost" of your question.
- **Completion Tokens**: The "cost" of the AI's answer.
- **Total Tokens**: The sum of both.
- Large models (like 70B) are usually more expensive and use more tokens than small models (like 8B).

---

### ✅ Success Checklist

- [ ] `POST /api/tokens/track` endpoint added.
- [ ] Response includes `prompt_tokens`, `completion_tokens`, and `total_tokens`.
- [ ] Estimated cost is calculated and displayed.
- [ ] You understand: **More words** = More tokens = Higher cost.

### 🆘 Common Problems

**Problem**: "Usage object is missing"
- **Fix**: Some older APIs might not return usage data. Groq and OpenAI always do. Check your API version.

**Problem**: "Cost is $0.000000"
- **Fix**: For very short prompts, the cost is extremely low. Try a much longer prompt to see the numbers change.

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build an "AI Budget Manager" UI.

Requirements:
- A text area for my prompt.
- A toggle to choose between "Economy Model" (8B) and "Premium Model" (70B).
- A "Calculate Cost" button.
- When clicked, call POST http://localhost:3000/api/tokens/track.
- Display a "Token Receipt" showing:
  - Input Tokens 📥
  - Output Tokens 📤
  - Total Tokens 💎
  - Estimated Cost 💰
- Use a "Financial/Banking" theme (greens, golds, clean lines, coin icons).
- Add a "Warning" if the prompt is too long (e.g., > 1000 tokens).

Make it look like a professional usage dashboard for an AI company!
```
