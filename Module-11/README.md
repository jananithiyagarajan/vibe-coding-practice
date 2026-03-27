# Module 11: Security & Best Practices

This module teaches you the essentials of keeping your applications, user data, and API keys safe from hackers and malicious actors.

## Practicals

- `module-11-1-hashing-passwords.md` — Hashing Passwords (never store plain text!)
- `module-11-2-protecting-api-keys.md` — Protecting API Keys (keeping secrets secret)
- `module-11-3-https-concepts.md` — HTTPS Concepts (SSL/TLS for beginners)
- `module-11-4-input-validation.md` — Input Validation (don't trust user input)
- `module-11-5-owasp-awareness.md` — Basic OWASP Awareness (Top 10 risks explained)

### Recommended order

1. Hashing Passwords
2. Protecting API Keys
3. HTTPS Concepts
4. Input Validation
5. OWASP Awareness

### Prerequisites

- Complete Module 5 (Node.js & Express)
- Basic understanding of how servers and clients communicate
- Node.js installed

### 🛡 Why Security Matters?

**Security is not an "add-on" - it's a foundation:**
- ✅ **Protect User Privacy**: Ensure passwords and personal data aren't stolen.
- ✅ **Save Money**: Prevent hackers from using your paid API keys (OpenAI/Groq).
- ✅ **Build Trust**: Users only use apps they feel safe in.
- ✅ **Legal Compliance**: Many countries have laws (like GDPR) about data safety.

### Tech Stack

- **Backend**: Node.js, Express, bcryptjs, dotenv, express-validator
- **Security Tools**: environment variables (.env), hashing algorithms
- **Learning Concepts**: Encryption, Hashing, Sanitization, OWASP Top 10
