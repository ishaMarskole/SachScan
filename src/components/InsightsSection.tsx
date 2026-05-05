interface InsightsSectionProps {
  suspicious_phrases: string[]
  manipulation_techniques: string[]
  original_text: string
}

export default function InsightsSection({
  suspicious_phrases,
  manipulation_techniques,
  original_text,
}: InsightsSectionProps) {
  const highlightText = (text: string, phrases: string[]) => {
    if (!phrases || phrases.length === 0) return text

    let highlighted = text
    phrases.forEach((phrase) => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi')
      highlighted = highlighted.replace(
        regex,
        `<mark style="background: #FFD93D; padding: 2px 4px; border: 1px solid #000;">$&</mark>`
      )
    })
    return highlighted
  }

  const colors = [
    'bg-pink text-black',
    'bg-purple text-white',
    'bg-yellow-400 text-black',
    'bg-green text-black',
    'bg-lavender text-black',
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Suspicious Phrases */}
      <div className="brutal-card p-6 md:p-8 bg-white" style={{ transform: 'rotate(-1.5deg)' }}>
        <h3 className="text-xl font-bold uppercase mb-4">🚩 Suspicious Phrases</h3>
        {suspicious_phrases && suspicious_phrases.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {suspicious_phrases.slice(0, 6).map((phrase, idx) => (
              <span
                key={idx}
                className={`brutal-badge ${colors[idx % colors.length]} font-bold`}
                style={{ transform: `rotate(${idx % 2 === 0 ? -5 : 5}deg)` }}
              >
                {phrase}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No suspicious phrases detected.</p>
        )}

        {/* Highlighted text preview */}
        <div className="mt-6 border-t-4 border-black pt-4">
          <p className="text-xs font-bold uppercase text-gray-700 mb-2">Highlighted in Text:</p>
          <div
            className="brutal-card p-3 text-sm leading-relaxed bg-cream font-mono overflow-y-auto max-h-32"
            dangerouslySetInnerHTML={{
              __html: highlightText(original_text.substring(0, 200), suspicious_phrases),
            }}
          />
        </div>
      </div>

      {/* Manipulation Techniques */}
      <div className="brutal-card p-6 md:p-8 bg-white" style={{ transform: 'rotate(1.5deg)' }}>
        <h3 className="text-xl font-bold uppercase mb-4">⚙️ Techniques Detected</h3>
        {manipulation_techniques && manipulation_techniques.length > 0 ? (
          <div className="space-y-2">
            {manipulation_techniques.map((technique, idx) => (
              <div
                key={idx}
                className="brutal-badge bg-red-200 text-black border-2 border-black py-2 px-3 block text-left"
                style={{ transform: `rotate(${idx % 2 === 0 ? -2 : 2}deg)` }}
              >
                <strong>•</strong> {technique}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No manipulation techniques detected.</p>
        )}
      </div>
    </div>
  )
}
