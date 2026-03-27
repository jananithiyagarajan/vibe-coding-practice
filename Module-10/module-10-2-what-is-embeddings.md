## Practical 2: What are Embeddings? (Text to Numbers)

### Why (in simple terms)

Computers are great at math (numbers) but terrible at "understanding" language (text).

**The Challenge**: 
How do you tell a computer that "cat" is similar to "kitten", but "car" is totally different?
- **Keywords**: Searching for "cat" won't find "kitten".
- **Meaning**: Searching for "feline" should find "cat".

**The Solution: Embeddings**
Embeddings are a way to turn **text into a long list of numbers** (called a "Vector").
- "Cat" becomes `[0.12, -0.45, 0.88, ...]`
- "Kitten" becomes `[0.11, -0.44, 0.89, ...]` (very similar numbers!)
- "Car" becomes `[0.99, 0.01, -0.22, ...]` (totally different numbers!)

Think of it like **GPS Coordinates for Meaning**:
- Two points close together on a map mean they are physically near each other.
- Two points (vectors) close together in "AI Space" mean they have a similar meaning.

### What you'll build

You'll create an "Embedding Explorer" that:
- Turns different words into numbers (vectors).
- Calculates the "Distance" between words.
- Shows you that "King" and "Queen" are closer than "King" and "Apple".

### Quick start for beginners

**We'll build on the project from Practical 1**

## Step 0: Open your project

1. Open the `rag-basics-practice` folder.
2. Open your terminal in VS Code.

## Step 1: Install a local embedding tool

For learning, we'll use a simple library that doesn't need a credit card.
```bash
npm install sentence-similarity
```

## Step 2: Create the Embedding Tester

Create a file named `embedding-test.js` and paste this:

```js
const similarity = require('sentence-similarity');
const similarityScore = require('similarity-score');

// 1. Our list of words to compare
const words = [
  "cat",
  "kitten",
  "dog",
  "puppy",
  "car",
  "truck",
  "banana",
  "apple"
];

// 2. Simple function to compare two words
function compare(word1, word2) {
  // In a real RAG, we use a complex AI model to get vectors.
  // Here, we're using a simpler version to show the concept.
  const score = similarityScore(word1, word2);
  return (score * 100).toFixed(2);
}

console.log("--- Similarity Scores (higher is more similar) ---");
console.log(`cat vs kitten: ${compare("cat", "kitten")}%`);
console.log(`cat vs dog: ${compare("cat", "dog")}%`);
console.log(`cat vs car: ${compare("cat", "car")}%`);
console.log(`apple vs banana: ${compare("apple", "banana")}%`);
console.log(`apple vs car: ${compare("apple", "car")}%`);

// 3. Why this matters for RAG:
console.log("\n--- The RAG 'Search' Concept ---");
const query = "feline friend";
const database = ["The cat is sleeping", "I love my new car", "Apples are red"];

database.forEach(doc => {
  const score = compare(query, doc);
  console.log(`Query: '${query}' | Doc: '${doc}' | Match: ${score}%`);
});
```

## Step 3: Run the test

In terminal, type:
```bash
node embedding-test.js
```

**What you're learning:**
- AI doesn't see "c-a-t", it sees a **pattern of meaning**.
- Even if the words are different ("feline" vs "cat"), the **meaning** (vector) is similar.
- This is how Google and ChatGPT "understand" what you're looking for!

---

### ✅ Success Checklist

- [ ] `sentence-similarity` installed.
- [ ] You saw how "cat" and "kitten" score higher than "cat" and "car".
- [ ] You understand: **Embedding** = Converting meaning into numbers.

### 🆘 Common Problems

**Problem**: "Scores look weird"
- **Fix**: Simple libraries aren't as smart as OpenAI. Real embeddings use thousands of numbers to be perfectly accurate!

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build an "AI Meaning Map" (Embedding Visualizer).

Requirements:
- A blank 2D canvas (The "AI Space").
- An input box to "Add a word".
- When I add a word, show it as a "Glowing Point" on the map.
- Words with similar meanings (like "Happy" and "Joyful") should fly towards each other.
- Words with different meanings (like "Happy" and "Bicycle") should stay far apart.
- When I hover over a point, show its "Coordinates" (simulated vector).

Make it look like a floating galaxy of words with cool gravity effects!
```
