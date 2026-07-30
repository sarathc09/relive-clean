export default function PriorityActionCard({
    weakestDomain,
    score,
    intervention
  }) {
    if (!intervention) return null;
  
    return (
      <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-900/10 p-6">
  
        <div className="flex items-center gap-3 mb-5">
  
          <div className="text-3xl">🎯</div>
  
          <div>
            <h2 className="text-2xl font-bold text-white">
              Your Highest Priority
            </h2>
  
            <p className="text-gray-400">
              Focus here first for the greatest potential impact.
            </p>
          </div>
  
        </div>
  
        <div className="grid md:grid-cols-2 gap-6">
  
          <div>
  
            <p className="text-sm text-gray-400">
            🎯 Priority Focus
            </p>
  
            <h3 className="text-2xl font-bold capitalize">
              {weakestDomain}
            </h3>
  
            <div className="mt-4">
  
              <p className="text-sm text-gray-400">
              Current Health Score
              </p>
  
              <div className="text-4xl font-bold text-red-400">
                {score}/100
              </div>
  
            </div>
  
          </div>
  
          <div>
  
            <p className="text-sm text-gray-400">
              Recommended First Action
            </p>
  
            <h3 className="text-2xl font-bold">
              {intervention.title}
            </h3>
  
            <div className="flex gap-3 mt-4">
  
              <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
                ★★★★★ {intervention.evidence.quality}
              </span>
  
              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
                {Math.round(intervention.evidence.confidence * 100)}% Confidence
              </span>
  
            </div>
  
          </div>
  
        </div>
  
        <div className="mt-6 rounded-xl bg-slate-800 p-4">
  
          <h4 className="font-semibold mb-2">
            Why this matters
          </h4>
  
          <p className="text-gray-300">
            Improving your <strong>{weakestDomain}</strong> health is expected to
            have the greatest positive impact on your overall longevity profile
            based on your current assessment.
          </p>
  
        </div>
  
      </div>
    );
  }