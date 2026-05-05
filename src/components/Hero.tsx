export default function Hero() {
  return (
    <div className="text-center">
      {/* Main heading with decorative rotation */}
      <div style={{ transform: 'rotate(-2deg)' }}>
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-tight">
          SATYA<span className="text-yellow-400">SCAN</span>
        </h1>
      </div>

      {/* Subheading */}
      <p className="mt-4 text-lg md:text-xl font-bold uppercase text-gray-700">
        AI-Powered Fake News Detector
      </p>

      {/* Tagline */}
      <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto text-gray-600">
        Analyze news credibility with AI. Detect manipulation, highlight bias, and get instant insights.
      </p>

      {/* Decorative badge */}
      <div
        className="mt-8 inline-block brutal-badge bg-purple text-white font-bold"
        style={{ transform: 'rotate(8deg)' }}
      >
        POWERED BY AI
      </div>
    </div>
  )
}
