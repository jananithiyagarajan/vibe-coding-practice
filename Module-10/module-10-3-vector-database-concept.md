## Practical 3: Vector Database Concept (Storing Memories)

### Why (in simple terms)

Standard databases (like SQL or Excel) are great at finding exact matches.

**The Problem**:
- If you search for "feline" in Excel, it won't find "cat".
- A "Vector Database" is built specifically to find **meaning** instead of just **letters**.

**How it works**:
1. You take a piece of text (e.g., "The cat is on the mat").
2. You turn it into an **Embedding** (a list of numbers).
3. You save those numbers in the **Vector Database**.
4. When you search, the database finds the numbers that are "closest" to your search.

Think of it like a **"Semantic Search Engine"**:
- **Normal Database**: Finds "Blueberry" if you type "Blueberry".
- **Vector Database**: Finds "Blueberry" if you type "A small, round, blue fruit that grows on a bush".

### What you'll build

You'll create a "Mini Vector DB" in your Node.js code that:
- Stores several "Documents" (sentences).
- Searches for them using a **Query**.
- Returns the most "Meaningful" match, even if the words don't match!

### Quick start for beginners

**We'll build on the project from Practical 2**

## Step 0: Open your project

1. Open the `rag-basics-practice` folder.
2. Open your terminal in VS Code.

## Step 1: Create the Mini Vector DB

Create a file named `vector-db.js` and paste this:

```js
const similarityScore = require('similarity-score');

class MiniVectorDB {
  constructor() {
    this.storage = [];
  }

  // 1. Add a document (In a real DB, we'd store its Embedding here)
  addDocument(text) {
    this.storage.push({
      text: text,
      id: this.storage.length + 1
    });
    console.log(`Added to DB: "${text}"`);
  }

  // 2. Search for the most similar document
  search(query, limit = 1) {
    console.log(`\nSearching for: "${query}"...`);
    
    // We compare the query to every document in our storage
    const results = this.storage.map(doc => {
      return {
        ...doc,
        score: similarityScore(query, doc.text)
      };
    });

    // Sort by highest score (most similar)
    return results.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}

// --- TEST OUR MINI DB ---
const db = new MiniVectorDB();

// Add some "knowledge"
db.addDocument("JavaScript is a popular programming language.");
db.addDocument("The Eiffel Tower is in Paris, France.");
db.addDocument("Apples and oranges are healthy fruits.");
db.addDocument("A golden retriever is a friendly dog breed.");

// Test a search with different words but same meaning
const query1 = "Which city has the Eiffel Tower?";
const result1 = db.search(query1);
console.log(`Top Match: "${result1[0].text}" (Score: ${result1[0].score.toFixed(2)})`);

const query2 = "Tell me about coding languages.";
const result2 = db.search(query2);
console.log(`Top Match: "${result2[0].text}" (Score: ${result2[0].score.toFixed(2)})`);

const query3 = "I want to learn about animals.";
const result3 = db.search(query3);
console.log(`Top Match: "${result3[0].text}" (Score: ${result3[0].score.toFixed(2)})`);
```

## Step 2: Run the test

In terminal, type:
```bash
node vector-db.js
```

**What you're learning:**
- The database doesn't just "match words" - it looks for the **best fit**.
- This is the **heart of RAG**: Finding the right "Knowledge" to give the AI.
- In a real app, we'd use a service like **Pinecone** or **Supabase** to handle millions of documents.

---

### ✅ Success Checklist

- [ ] `vector-db.js` created and runs.
- [ ] You saw how it finds "Paris" even when searching for "City".
- [ ] You understand: **Vector DB** = Searching by meaning.

### 🆘 Common Problems

**Problem**: "Score is 0 for everything"
- **Fix**: Check your `similarity-score` installation. Make sure you're passing strings to the search function.

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build a "Semantic Search Engine" UI.

Requirements:
- A search bar at the top: "Ask me anything...".
- A list of "Knowledge Blocks" (cards with text).
- When I type in the search bar, the cards should "Reorder" themselves.
- The most relevant card should "Glow" and move to the top.
- Show a "Similarity Score" on each card (e.g., "95% Match").
- Add a "Add Knowledge" form to create new cards.

Make it look like a high-tech "Library of the Future" with floating cards and data-stream effects!
```
