## Practical 4: Streaming Concepts (Real-time AI)

### Why (in simple terms)

Have you noticed that when you use ChatGPT, the words appear one by one like someone is typing? This is called **Streaming**.

**Why do we use it?**
- **No "Loading" screen**: Without streaming, you have to wait 5-10 seconds for the whole paragraph to generate. With streaming, you see the first word in 0.5 seconds!
- **Better Experience**: It feels alive and interactive, like a real conversation.
- **Lower "Perceived" Latency**: Even if the total time is the same, the user starts reading immediately.

Think of it like:
- **Normal API**: Downloading a whole movie before you can watch it.
- **Streaming API**: Netflix (you start watching while it's still downloading).

### What you'll build

You'll create a "Real-time Writer" that:
- Connects to the Groq Streaming API.
- Sends chunks of text to the frontend as soon as the AI generates them.
- Displays the text appearing word-by-word on the screen.

### Quick start for beginners

**We'll build on the project from Practical 3**

## Step 0: Open your project

1. Open the `ai-model-practice` folder.
2. Open `server.js` in VS Code.

## Step 1: Create the Streaming API

Update `server.js` and add this new endpoint:

```js
// 1. Streaming Chat Endpoint
app.get('/api/chat/stream', async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  // Set headers for Server-Sent Events (SSE)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    console.log(`Streaming response for: ${prompt}`);
    
    // Call Groq with stream: true
    const stream = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      stream: true, // THIS IS THE KEY!
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        // Send the chunk to the browser
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Signal that the stream is finished
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error("❌ Streaming Error:", error.message);
    res.write(`data: ${JSON.stringify({ error: "Streaming failed" })}\n\n`);
    res.end();
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

### Step 3: Test streaming in your browser

Since this uses `GET`, you can test it directly in your browser:
Visit: `http://localhost:3000/api/chat/stream?prompt=Write a short story about a space cat`

**What you're learning:**
- `stream: true` tells the AI to send bits of text as they are ready.
- `res.write()` allows your server to send "partial" responses without closing the connection.
- `text/event-stream` is the special "internet protocol" for streaming data.

---

### ✅ Success Checklist

- [ ] `GET /api/chat/stream` endpoint added.
- [ ] Browser shows chunks of data appearing one by one.
- [ ] You understand: **Streaming** = Immediate feedback, **Normal** = Wait for everything.

### 🆘 Common Problems

**Problem**: "Response is still slow"
- **Fix**: Check your internet speed. Streaming requires a steady connection.

**Problem**: "Browser just waits and shows everything at once"
- **Fix**: Some browsers (and tools like Postman) might buffer the response. Use Chrome or Edge for testing.

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build a "Real-time AI Storyteller" UI.

Requirements:
- A text area: "What kind of story should I write?".
- A "Start Story" button.
- When clicked, use EventSource to connect to http://localhost:3000/api/chat/stream.
- Display the story word-by-word as it arrives.
- Add a "Typewriter" sound effect (optional but cool!).
- A "Stop" button to cancel the stream.
- Use a "Fantasy" or "Retro Typewriter" theme (parchment background, classic fonts).

Make it look like a magical typewriter that writes itself!
```
