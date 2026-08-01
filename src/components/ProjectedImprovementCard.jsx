export default function ProjectedImprovementCard({
    score,
    biologicalAge,
    intervention,
  }) {
    if (!intervention) return null;
  
    const scoreText = intervention.expectedImpact?.longevityScore ?? "+0";
    const ageText = intervention.expectedImpact?.biologicalAge ?? "0";
  
    // Extract first number from strings like "+3 to +6"
    const scoreIncrease =
      parseInt(scoreText.replace(/[^\d]/g, "").slice(0, 1)) || 0;
  
    const projectedScore = Math.min(100, score + scoreIncrease);
  
    // Extract first decimal/int from strings like "-0.5 to -2 years"
    const ageMatch = ageText.match(/-?\d+(\.\d+)?/);
    const ageReduction = ageMatch ? Math.abs(parseFloat(ageMatch[0])) : 0;
  
    const projectedAge = (
      biologicalAge - ageReduction
    ).toFixed(1);
  
    return (
      <div className="mt-8 rounded-2xl md:rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-slate-950 p-4 md:p-8">
  
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">📈</span>
  
          <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Projected Improvement
            </h2>
  
            <p className="text-sm md:text-base text-gray-400">
              Based on consistent adherence for approximately 90 days
            </p>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
  
          <div className="rounded-2xl bg-slate-800/60 p-6">
  
            <div className="text-sm uppercase text-gray-400">
              Longevity Score
            </div>
  
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
  
            <div className="flex flex-col justify-between min-h-[92px]">
  <div>
    <div className="text-gray-400 text-sm">
      Current
    </div>

    <div className="text-3xl md:text-5xl font-bold">
      {score}
    </div>
  </div>

  <div className="h-6" />
</div>
  
              <div className="flex items-center justify-center text-3xl">
                →
              </div>
  
              <div className="flex flex-col items-end justify-between min-h-[92px]">
  <div>
    <div className="text-gray-400 text-sm">
      Potential
    </div>

    <div className="text-3xl md:text-5xl font-bold text-emerald-400">
      {projectedScore}
    </div>
  </div>

  <div className="mt-2 text-sm font-semibold text-emerald-300">
    +{scoreIncrease} Points
  </div>
</div>
  
            </div>
  
          </div>
  
          <div className="rounded-2xl bg-slate-800/60 p-6">
  
            <div className="text-sm uppercase text-gray-400">
              Biological Age
            </div>
  
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
  
            <div className="flex flex-col justify-between min-h-[92px]">
  <div>
    <div className="text-gray-400 text-sm">
      Current
    </div>

    <div className="text-3xl md:text-5xl font-bold">
    {biologicalAge}
    </div>
  </div>

  <div className="h-6" />
</div>
  
              <div className="flex items-center justify-center text-3xl">
                →
              </div>
  
              <div className="flex flex-col items-end justify-between min-h-[92px]">

  <div>
    <div className="text-gray-400 text-sm">
      Potential
    </div>

    <div className="text-3xl md:text-5xl font-bold text-emerald-400">
      {projectedAge}
    </div>
  </div>

  <div className="text-sm font-semibold text-emerald-300">
    -{ageReduction} Years
  </div>

</div>
  
            </div>
  
          </div>
  
        </div>
        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">

<div className="flex items-center gap-3">

  <div className="text-3xl">
    ⏳
  </div>

  <div>

    <h3 className="text-lg font-semibold">
      Expected Timeline
    </h3>

    <p className="text-gray-400">
      Based on consistent adherence to your personalised plan
    </p>

  </div>

</div>

<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">

<div className="rounded-xl bg-slate-800 p-3 md:p-4 text-center">

    <div className="text-sm text-gray-400">
      Week 2
    </div>

    <div className="mt-2 font-semibold leading-tight">
  Energy
  <br />
  Recovery
</div>

  </div>

  <div className="rounded-xl bg-slate-800 p-3 md:p-4 text-center">

    <div className="text-sm text-gray-400">
      Week 6
    </div>

    <div className="mt-2 font-semibold leading-tight">
  Fitness
  <br />
  Improvement
</div>

  </div>

  <div className="rounded-xl bg-slate-800 p-3 md:p-4 text-center">

    <div className="text-sm text-gray-400">
      Month 3
    </div>

    <div className="mt-2 font-semibold leading-tight">
  Maximum
  <br />
  Benefit
</div>

  </div>

</div>
<div className="mt-6 border-t border-white/10 pt-5 text-center">

<div className="flex justify-center">

<div className="inline-flex max-w-full flex-wrap justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 px-4 py-2 text-sm font-semibold text-emerald-400">
  Confidence: {Math.round((intervention.evidence?.confidence ?? 0) * 100)}%
</div>

</div>

  <p className="mt-2 text-sm leading-6 text-gray-400">
    Projected outcomes assume consistent adherence to your personalised
    programme for approximately 90 days. Individual results may vary.
  </p>

</div>
</div>

      </div>
    );
  }