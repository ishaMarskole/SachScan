interface CredibilityBreakdown {
  language: number
  source: number
  bias: 'Low' | 'Medium' | 'High'
}

interface AnalysisSectionProps {
  credibility_breakdown: CredibilityBreakdown
  claims: string[]
  evidence: string[]
}

export default function AnalysisSection({
  credibility_breakdown,
  claims,
  evidence,
}: AnalysisSectionProps) {
  const biasColors = {
    Low: 'bg-green text-black',
    Medium: 'bg-yellow-400 text-black',
    High: 'bg-pink text-black',
  }

  const ScoreBar = ({ label, value }: { label: string; value: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-bold uppercase">{label}</span>
        <span className="font-bold">{value}%</span>
      </div>
      <div className="h-4 brutal-card overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            value >= 70 ? 'bg-green' : value >= 40 ? 'bg-yellow-400' : 'bg-pink'
          }`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Credibility Breakdown */}
      <div className="md:col-span-1 brutal-card p-6 md:p-8 bg-white" style={{ transform: 'rotate(-1deg)' }}>
        <h3 className="text-xl font-bold uppercase mb-6">📊 Credibility Scores</h3>
        <ScoreBar label="Language Quality" value={credibility_breakdown.language} />
        <ScoreBar label="Source Reliability" value={credibility_breakdown.source} />

        <div className="mt-6 border-t-4 border-black pt-4">
          <p className="text-xs font-bold uppercase mb-2">Bias Level</p>
          <div
            className={`brutal-badge ${biasColors[credibility_breakdown.bias]} text-sm font-bold block text-center py-2`}
          >
            {credibility_breakdown.bias}
          </div>
        </div>
      </div>

      {/* Claims */}
      <div className="md:col-span-1 brutal-card p-6 md:p-8 bg-white" style={{ transform: 'rotate(1deg)' }}>
        <h3 className="text-xl font-bold uppercase mb-4">💬 Key Claims</h3>
        <div className="space-y-2">
          {claims && claims.length > 0 ? (
            claims.slice(0, 5).map((claim, idx) => (
              <div
                key={idx}
                className="brutal-badge bg-blue-200 text-black border-2 border-black py-2 px-3 block text-left text-sm"
              >
                <strong>{idx + 1}.</strong> {claim}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">No major claims identified.</p>
          )}
        </div>
      </div>

      {/* Evidence */}
      <div className="md:col-span-1 brutal-card p-6 md:p-8 bg-white" style={{ transform: 'rotate(-1deg)' }}>
        <h3 className="text-xl font-bold uppercase mb-4">✓ Evidence Found</h3>
        <div className="space-y-2">
          {evidence && evidence.length > 0 ? (
            evidence.slice(0, 5).map((ev, idx) => (
              <div
                key={idx}
                className="brutal-badge bg-green-200 text-black border-2 border-black py-2 px-3 block text-left text-sm"
              >
                <strong>✓</strong> {ev}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">Limited evidence provided.</p>
          )}
        </div>
      </div>
    </div>
  )
}
