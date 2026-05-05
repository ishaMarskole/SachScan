interface InputSectionProps {
  input: string
  onInputChange: (value: string) => void
  onAnalyze: (text: string) => void
  loading: boolean
  onLoadSample: (type: 'fake' | 'real') => void
}

export default function InputSection({
  input,
  onInputChange,
  onAnalyze,
  loading,
  onLoadSample,
}: InputSectionProps) {
  return (
    <div className="brutal-card p-6 md:p-8 bg-white" style={{ transform: 'rotate(-1deg)' }}>
      <h2 className="text-2xl font-bold uppercase mb-4">Paste News Content</h2>

      <textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Paste your news article, headline, or content here..."
        className="brutal-input p-4 h-40 md:h-48 resize-none font-mono"
        disabled={loading}
      />

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <button
          onClick={() => onAnalyze(input)}
          disabled={loading || !input.trim()}
          className="brutal-btn bg-primary text-white flex-1 py-3 md:py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'ANALYZING...' : 'ANALYZE NOW'}
        </button>
      </div>

      <div className="mt-6 border-t-4 border-black pt-6">
        <p className="text-sm font-bold uppercase text-gray-700 mb-3">Or Try Sample:</p>
        <div className="flex gap-3">
          <button
            onClick={() => onLoadSample('fake')}
            disabled={loading}
            className="brutal-badge bg-pink text-black font-bold cursor-pointer hover:bg-pink-200 transition-colors"
          >
            📰 FAKE NEWS
          </button>
          <button
            onClick={() => onLoadSample('real')}
            disabled={loading}
            className="brutal-badge bg-green text-black font-bold cursor-pointer hover:bg-green-200 transition-colors"
          >
            ✓ REAL NEWS
          </button>
        </div>
      </div>
    </div>
  )
}
