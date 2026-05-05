import { AnalysisResult } from '../App'

// Fake news keywords and patterns
const fakeNewsKeywords = [
  'breaking',
  'exclusive',
  'miracle',
  'cure',
  'secret',
  'shocking',
  'exposed',
  'reversed',
  'scientist discovers',
  'doctors hate',
  'pharmaceutical',
  'without clinical',
  'revolutionary',
  'unbelievable',
  'they don\'t want',
  'government hiding',
  'conspiracy',
  'claim',
  'allegedly',
]

// Detect if content is likely fake or real news
function detectNewType(content: string): 'Fake' | 'Real' {
  const lowerContent = content.toLowerCase()
  const fakeMatches = fakeNewsKeywords.filter(keyword =>
    lowerContent.includes(keyword)
  ).length

  // If multiple fake indicators found, classify as fake
  return fakeMatches >= 2 ? 'Fake' : 'Real'
}

// Hardcoded response for FAKE news
function generateFakeNewsResponse(content: string): AnalysisResult {
  const headline = content.split('\n')[0] || content.substring(0, 100)
  
  return {
    classification: 'Fake',
    confidence: 82,
    explanation:
      'This content exhibits multiple hallmarks of misinformation including sensationalized language, unverified claims, and emotional manipulation tactics designed to provoke fear and outrage.',
    tone: 'Emotional',
    suspicious_phrases: [
      'scientist discovers',
      'without clinical studies',
      'revolutionary cure',
      'doctors hate this',
      'they don\'t want you to know',
    ],
    manipulation_techniques: [
      'Fear-mongering',
      'Appeal to authority',
      'Sensationalism',
      'Emotional manipulation',
      'Unverified claims',
    ],
    credibility_breakdown: {
      language: 35,
      source: 28,
      bias: 'High',
    },
    claims: [
      'Product/substance has miraculous effects',
      'Medical establishment suppressing information',
      'Unrealistic health claims',
    ],
    evidence: [
      'Anecdotal testimonials without verification',
      'Lack of peer-reviewed studies',
      'No credible sources cited',
    ],
    rewritten_headline: `Analysis of ${headline.substring(0, 50)}...`,
  }
}

// Hardcoded response for REAL news
function generateRealNewsResponse(content: string): AnalysisResult {
  const headline = content.split('\n')[0] || content.substring(0, 100)
  
  return {
    classification: 'Real',
    confidence: 78,
    explanation:
      'This content demonstrates balanced reporting with verifiable sources, specific data points, and credible attribution. Language is measured and factual rather than sensationalized.',
    tone: 'Neutral',
    suspicious_phrases: [],
    manipulation_techniques: [],
    credibility_breakdown: {
      language: 82,
      source: 75,
      bias: 'Low',
    },
    claims: [
      'Research findings from peer-reviewed study',
      'Specific numerical data provided',
      'Named expert sources cited',
    ],
    evidence: [
      'Published research study referenced',
      'Statistical data included',
      'Expert credentials mentioned',
      'Methodology described',
    ],
    rewritten_headline: `Comprehensive report on ${headline.substring(0, 50)}...`,
  }
}

export async function analyzeNews(content: string): Promise<AnalysisResult> {
  // Simulate API delay for realistic UX (200ms)
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!content.trim()) {
    throw new Error('Please enter some news content to analyze')
  }

  // Detect news type and return appropriate response
  const newsType = detectNewType(content)

  if (newsType === 'Fake') {
    return generateFakeNewsResponse(content)
  } else {
    return generateRealNewsResponse(content)
  }
}
