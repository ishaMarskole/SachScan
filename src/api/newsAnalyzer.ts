import { AnalysisResult } from '../App'

export async function analyzeNews(content: string): Promise<AnalysisResult> {
  const apiKey = import.meta.env.VITE_GEMINI_KEY || ''

  if (!apiKey) {
    throw new Error('Gemini API key not configured. Set VITE_GEMINI_KEY in .env.local')
  }

  const systemPrompt = `You are an expert fake news detector and media analyst. Analyze the provided news content and return a detailed JSON analysis.

IMPORTANT: You MUST return ONLY valid JSON, no other text.

Return this exact JSON structure:
{
  "classification": "Real" or "Fake",
  "confidence": number between 0-100,
  "explanation": "brief 2-3 sentence explanation",
  "tone": "Emotional" or "Neutral" or "Biased",
  "suspicious_phrases": ["phrase1", "phrase2"],
  "manipulation_techniques": ["technique1", "technique2"],
  "credibility_breakdown": {
    "language": number 0-100,
    "source": number 0-100,
    "bias": "Low" or "Medium" or "High"
  },
  "claims": ["claim1", "claim2"],
  "evidence": ["evidence1", "evidence2"],
  "rewritten_headline": "neutral rewrite of headline"
}

Analyze for:
- Sensationalism, emotional language, ALL CAPS words
- Unverified claims without sources
- Logical fallacies
- Bias indicators
- Credible vs unverifiable information
- Manipulation techniques (fear-mongering, bandwagon, appeal to authority, etc.)`

  const userPrompt = `${systemPrompt}

---

Analyze this news content:

"""
${content}
"""

Return ONLY the JSON response, no other text.`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.error?.message || `API error: ${response.statusText}`
      )
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('Invalid response format from Gemini API')
    }

    const responseText = data.candidates[0].content.parts[0].text

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from API response')
    }

    const result = JSON.parse(jsonMatch[0]) as AnalysisResult

    // Validate result
    if (
      !result.classification ||
      typeof result.confidence !== 'number' ||
      !result.explanation
    ) {
      throw new Error('Invalid response format from API')
    }

    return result
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
