interface RewriteSectionProps {
  original: string
  rewritten: string
  isShown: boolean
  onToggle: () => void
}

export default function RewriteSection({
  original,
  rewritten,
  isShown,
  onToggle,
}: RewriteSectionProps) {
  return (
    <div className="brutal-card p-6 md:p-8 bg-white" style={{ transform: 'rotate(0.5deg)' }}>
      <h3 className="text-2xl font-bold uppercase mb-6">📝 Rewrite Neutrally</h3>

      <button
        onClick={onToggle}
        className="brutal-btn bg-purple text-white py-3 md:py-4 px-6 mb-6"
      >
        {isShown ? 'HIDE REWRITE' : 'SHOW NEUTRAL VERSION'}
      </button>

      {isShown && (
        <div className="space-y-6">
          <div className="brutal-card p-4 md:p-6 bg-pink-50 border-pink-300">
            <p className="text-xs font-bold uppercase text-gray-700 mb-2">Original (Potentially Biased):</p>
            <p className="text-base md:text-lg italic text-gray-800">{original}</p>
          </div>

          <div className="text-center">
            <div className="inline-block">
              <div className="border-4 border-black rounded-full w-12 h-12 flex items-center justify-center font-bold bg-yellow-400">
                ↓
              </div>
            </div>
          </div>

          <div className="brutal-card p-4 md:p-6 bg-green-50 border-green-300">
            <p className="text-xs font-bold uppercase text-gray-700 mb-2">Rewritten (Neutral & Factual):</p>
            <p className="text-base md:text-lg text-gray-800 font-semibold">{rewritten}</p>
          </div>

          <div className="border-t-4 border-black pt-4">
            <p className="text-xs font-bold uppercase text-gray-700 mb-3">Key Changes:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Removed sensationalism and emotional language</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Focused on facts and verifiable information</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Eliminated bias and manipulative framing</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
