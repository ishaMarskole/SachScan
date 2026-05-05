import { useState } from 'react'
import Hero from './components/Hero'
import InputSection from './components/InputSection'
import ResultCard from './components/ResultCard'
import InsightsSection from './components/InsightsSection'
import AnalysisSection from './components/AnalysisSection'
import RewriteSection from './components/RewriteSection'
import { analyzeNews } from './api/newsAnalyzer'

export interface AnalysisResult {
  classification: 'Real' | 'Fake'
  confidence: number
  explanation: string
  tone: 'Emotional' | 'Neutral' | 'Biased'
  suspicious_phrases: string[]
  manipulation_techniques: string[]
  credibility_breakdown: {
    language: number
    source: number
    bias: 'Low' | 'Medium' | 'High'
  }
  claims: string[]
  evidence: string[]
  rewritten_headline: string
}

function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rewriteShown, setRewriteShown] = useState(false)

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) {
      setError('Please enter some news content to analyze')
      return
    }

    setLoading(true)
    setError('')
    setRewriteShown(false)

    try {
      const analysisResult = await analyzeNews(text)
      setResult(analysisResult)
    } catch (err) {
      setError('Failed to analyze. Please check your API key and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadSample = (type: 'fake' | 'real') => {
    const samples = {
      fake: 'BREAKING: Scientist discovers that drinking coffee backwards reverses aging! Local doctor claims 3 cups daily can make you 10 years younger. "We are revolutionizing medicine," he said without any clinical studies. Celebrities are already doing it!',
      real: 'New Study Shows Benefits of Regular Exercise. Researchers at Stanford University conducted a 5-year longitudinal study involving 2,500 participants. The findings, published in the Journal of Medical Research, indicate that 30 minutes of daily physical activity reduces cardiovascular disease risk by 15%. "These results are consistent with previous research," said Dr. Sarah Chen, lead researcher.'
    }
    setInput(samples[type])
  }

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      {/* Decorative shapes */}
      <div className="fixed -top-20 -right-20 w-64 h-64 border-4 border-black rounded-full opacity-10 z-0"></div>
      <div className="fixed bottom-20 -left-32 w-96 h-96 border-4 border-black rounded-full opacity-10 z-0" style={{ transform: 'rotate(45deg)' }}></div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        <Hero />

        <div className="mt-12 md:mt-16">
          <InputSection
            input={input}
            onInputChange={setInput}
            onAnalyze={handleAnalyze}
            loading={loading}
            onLoadSample={loadSample}
          />
        </div>

        {error && (
          <div className="mt-8 brutal-card p-6 bg-pink-50 border-pink-300">
            <p className="text-black font-bold">{error}</p>
          </div>
        )}

        {loading && (
          <div className="mt-8 brutal-card p-12 text-center">
            <div className="inline-block">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-black border-t-yellow-400 rounded-full"></div>
              </div>
            </div>
            <p className="mt-6 text-lg font-bold">ANALYZING...</p>
          </div>
        )}

        {result && !loading && (
          <>
            <div className="mt-8">
              <ResultCard result={result} />
            </div>

            <div className="mt-8">
              <InsightsSection
                suspicious_phrases={result.suspicious_phrases}
                manipulation_techniques={result.manipulation_techniques}
                original_text={input}
              />
            </div>

            <div className="mt-8">
              <AnalysisSection
                credibility_breakdown={result.credibility_breakdown}
                claims={result.claims}
                evidence={result.evidence}
              />
            </div>

            <div className="mt-8">
              <RewriteSection
                original={input.split('\n')[0] || input.substring(0, 100)}
                rewritten={result.rewritten_headline}
                isShown={rewriteShown}
                onToggle={() => setRewriteShown(!rewriteShown)}
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
