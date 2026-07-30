export default function AIHealthCoachCard({
    weakestDomain,
    intervention
  }) {
    if (!intervention) return null;
  
    return (
      <div className=" w-full mb-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-slate-950 p-8 shadow-xl">
  
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl">🧠</div>
  
          <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
              AI Health Coach
            </h2>
  
            <p className="text-gray-400">
              Your personalised action plan
            </p>
          </div>
        </div>
  
        {/* Main Message */}
  
        <div className="rounded-2xl bg-white/5 p-6">
  
          <div className="text-sm uppercase tracking-widest text-emerald-400">
            Primary Focus
          </div>
  
          <div className="text-4xl font-bold mt-2">
            {weakestDomain}
          </div>
  
          <p className="mt-5 text-lg text-gray-300 leading-8">
            Improving{" "}
            <span className="text-emerald-400 font-semibold">
              {weakestDomain}
            </span>{" "}
            is expected to provide the greatest positive impact on your overall
            longevity profile.
          </p>
  
        </div>
  
        {/* Recommendation */}
  
        <div className="grid md:grid-cols-2 gap-5 mt-6">
  
          <div className="rounded-2xl bg-slate-800/60 p-5">
  
            <div className="text-sm uppercase text-gray-400">
              Today's Action
            </div>
  
            <div className="text-2xl font-bold mt-2">
              {intervention.title}
            </div>
  
            <div className="mt-4 space-y-2 text-gray-300">
  
              <div>
                ⏱ {intervention.recommendedDose?.duration}
              </div>
  
              <div>
                📅 {intervention.recommendedDose?.frequency}
              </div>
  
              <div>
                💪 {intervention.recommendedDose?.intensity}
              </div>
  
            </div>
  
          </div>
  
          <div className="rounded-2xl bg-slate-800/60 p-5">
  
            <div className="text-sm uppercase text-gray-400">
              Expected Benefit
            </div>
  
            <div className="mt-4 space-y-3">
  
              <div>
                ⭐ Longevity Score{" "}
                <span className="text-emerald-400 font-semibold">
                  {intervention.expectedImpact?.longevityScore}
                </span>
              </div>
  
              <div>
                ⏳ Biological Age{" "}
                <span className="text-emerald-400 font-semibold">
                  {intervention.expectedImpact?.biologicalAge}
                </span>
              </div>
  
              <div>
                🧪 Confidence{" "}
                <span className="text-blue-400 font-semibold">
                  {Math.round(intervention.evidence.confidence * 100)}%
                </span>
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
    );
  }