# SatyaScan AI Integration Guide

## Overview

SatyaScan uses OpenAI's GPT-3.5-Turbo API directly from the browser to analyze news content and detect fake news with structured insights.

## API Configuration

### 1. Get Your OpenAI API Key

1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in with your OpenAI account (create one if needed)
3. Click "Create new secret key"
4. Copy the key immediately (you won't see it again)

### 2. Add to Environment

Create `.env.local` in project root:
```env
VITE_OPENAI_KEY=sk_test_YOUR_KEY_HERE
```

The key is now available to the app via `import.meta.env.VITE_OPENAI_KEY`

## API Flow

```
User Input
    ↓
Frontend (React Component)
    ↓
newsAnalyzer.ts (API call)
    ↓
OpenAI GPT-3.5-Turbo API
    ↓
Structured JSON Response
    ↓
Display Results in UI
```

## Response Structure

The AI returns this JSON:

```json
{
  "classification": "Real" or "Fake",
  "confidence": 85,
  "explanation": "Brief 2-3 sentence analysis...",
  "tone": "Emotional" or "Neutral" or "Biased",
  "suspicious_phrases": ["phrase1", "phrase2"],
  "manipulation_techniques": ["fear-mongering", "appeal to authority"],
  "credibility_breakdown": {
    "language": 75,
    "source": 60,
    "bias": "High"
  },
  "claims": ["claim1", "claim2"],
  "evidence": ["evidence1", "evidence2"],
  "rewritten_headline": "Neutral version of headline"
}
```

## Customization

### Change AI Model

Edit `src/api/newsAnalyzer.ts` line ~39:

```typescript
// Current (faster, cheaper)
model: 'gpt-3.5-turbo',

// Upgrade to GPT-4 (slower, more accurate)
model: 'gpt-4',
```

### Modify the Analysis Prompt

Edit `src/api/newsAnalyzer.ts` around line ~11:

```typescript
const systemPrompt = `Your custom instructions here...`

const userPrompt = `Custom user prompt here...`
```

#### Example: Detect Specific Fake News Patterns

```typescript
const systemPrompt = `You are an expert at detecting COVID misinformation.
Focus on:
- Unverified vaccine claims
- Conspiracy theories
- False statistics
...`
```

### Add Custom Response Fields

Modify the response interface in `src/App.tsx`:

```typescript
export interface AnalysisResult {
  classification: 'Real' | 'Fake'
  confidence: number
  explanation: string
  // Add custom fields:
  my_custom_field: string
  another_field: number
  // ...
}
```

Then update the API prompt to include these in the JSON response.

## Error Handling

The app handles these common errors:

1. **Missing API Key**
   ```
   "OpenAI API key not configured. Set VITE_OPENAI_KEY in .env.local"
   ```
   **Fix**: Add the key to `.env.local` and restart dev server

2. **Invalid API Key**
   ```
   "Unauthorized" or "API error"
   ```
   **Fix**: Check key is correct at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

3. **Rate Limited**
   ```
   "Rate limit exceeded"
   ```
   **Fix**: Wait a few minutes or upgrade your API plan

4. **JSON Parse Error**
   ```
   "Could not parse JSON from API response"
   ```
   **Fix**: The AI response wasn't valid JSON. Try rephrasing the prompt.

## API Costs

**GPT-3.5-Turbo**
- ~$0.0005 per analysis request
- ~$10/month for 20,000 analyses

**GPT-4**
- ~$0.03 per analysis request
- ~$600/month for 20,000 analyses

*Prices vary based on input/output tokens*

## Rate Limits

Free tier: 3 requests/min, 200/day  
Paid tier: Higher limits based on plan

## Response Time

- **First request**: ~3-5 seconds (API warmup)
- **Subsequent requests**: ~2-3 seconds
- **Network dependent**: Can vary based on internet speed

## Security Best Practices

1. ✅ API key is only in `.env.local` (not committed to git)
2. ✅ Key is read-only (can't be used to delete/modify)
3. ✅ Only `gpt-3.5-turbo` endpoint is called
4. ✅ No user data is stored by default

## Monitoring API Usage

Visit [platform.openai.com/account/billing/overview](https://platform.openai.com/account/billing/overview) to:
- Monitor usage
- Set spending limits
- View API logs

## Advanced: Using a Backend Proxy

For production, consider proxying API calls through your own backend:

```typescript
// Instead of calling OpenAI directly:
const response = await fetch('https://api.openai.com/v1/chat/completions', ...)

// Call your backend:
const response = await fetch('/api/analyze', {
  method: 'POST',
  body: JSON.stringify({ content: userInput })
})
```

This:
- Hides your API key
- Adds rate limiting
- Logs requests
- Enables caching

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "env is not defined" | Import types: Add `vite-env.d.ts` (included) |
| "API key not found" | Restart dev server after adding `.env.local` |
| "CORS error" | Not applicable - calling OpenAI directly (works) |
| "Timeout" | Increase timeout or check network |
| "Bad JSON response" | Modify prompt to ensure valid JSON output |

## References

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Model Pricing](https://openai.com/pricing)
- [API Status](https://status.openai.com/)
- [Rate Limits](https://platform.openai.com/docs/guides/rate-limits)

---

**Need help?** Check the main [README.md](README.md) or [QUICKSTART.md](QUICKSTART.md)
