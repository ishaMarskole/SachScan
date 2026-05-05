import { AnalysisResult } from '../App'

interface ResultCardProps {
  result: AnalysisResult
}

export default function ResultCard({ result }: ResultCardProps) {
  const isReal = result.classification === 'Real'
  const bgColor = isReal ? 'bg-green-50' : 'bg-pink-50'
  const borderColor = isReal ? 'border-green-300' : 'border-pink-300'
  const badgeBg = isReal ? 'bg-green' : 'bg-pink'
  const badgeText = isReal ? '✓ REAL' : '⚠ FAKE'

  return (
    <div
      className={`brutal-card ${bgColor} border-4 ${borderColor} p-8 md:p-10`}
      style={{ transform: 'rotate(1deg)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Classification Badge */}
        <div className="md:col-span-1 flex justify-center">
          <div
            className={`${badgeBg} text-white brutal-badge text-2xl font-bold px-6 py-4 rotate-12`}
          >
            {badgeText}
          </div>
        </div>

        {/* Confidence */}
        <div className="md:col-span-1 text-center">
          <p className="text-xs font-bold uppercase text-gray-700 mb-2">Confidence</p>
          <div className="text-5xl font-bold">{result.confidence}%</div>
          <div className="mt-4 h-3 brutal-card overflow-hidden">
            <div
              className={`h-full ${isReal ? 'bg-green' : 'bg-pink'} transition-all duration-500`}
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Tone */}
        <div className="md:col-span-1 text-center">
          <p className="text-xs font-bold uppercase text-gray-700 mb-2">Tone</p>
          <div className={`text-2xl font-bold p-3 brutal-badge bg-yellow-200`}>
            {result.tone}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-8 border-t-4 border-black pt-6">
        <p className="text-xs font-bold uppercase text-gray-700 mb-3">Analysis</p>
        <p className="text-base md:text-lg leading-relaxed">{result.explanation}</p>
      </div>
    </div>
  )
}
