
const healthLabelMap = {
    sleep: "🌙 Sleep Quality",
    brain: "🧠 Brain Health",
    heart: "❤️ Heart Health",
    metabolism: "⚡ Metabolic Health",
    fitness: "💪 Physical Fitness",
    recovery: "🔄 Recovery",
    inflammation: "🛡 Inflammation",
    immunity: "🧬 Immune Health",
    stress: "🧘 Stress Resilience",
    longevity: "⏳ Longevity",
  };
export default function EvidenceCard({ intervention }) {
    if (!intervention) return null;
  
    return (
<div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-xl">
  
        <div className="flex justify-between items-start">
  
          <div>
          <h3 className="text-3xl font-bold tracking-tight text-white">
              {intervention.title}
            </h3>
  
            <div className="mt-2 flex items-center gap-3">

<span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300">
  {intervention.category}
</span>

<span className="text-sm text-gray-400">
  Evidence Level {intervention.evidence?.level}/5
</span>


</div>

<p className="mt-3 max-w-4xl text-base leading-7 text-gray-300">
{intervention.description}
</p>
          </div>
  
          <div className="text-right">
  
            <div className="text-emerald-400 font-bold">
              ★★★★★
            </div>
  
            <div className="text-sm text-gray-400">
              {Math.round(
                (intervention.evidence?.confidence ?? 0) * 100
              )}% Confidence
            </div>
  
          </div>
  
        </div>
  
        <div className="mt-6">

        <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
  🧬 Why it Works
</div>

<div className="mt-4 rounded-xl bg-slate-800/60 border border-slate-700 p-4">

  <p className="text-gray-300 leading-7">
    {intervention.whyItWorks}
  </p>

  {intervention.mechanisms?.length > 0 && (
    <div className="mt-5">

      <div className="text-sm uppercase tracking-wide text-gray-400 mb-3">
        Key Mechanisms
      </div>

      <div className="grid md:grid-cols-2 gap-3">

        {intervention.mechanisms.map((mechanism) => (
          <div
            key={mechanism}
            className="flex items-start gap-2 rounded-lg bg-slate-900/70 px-3 py-2"
          >
            <span className="text-emerald-400">✓</span>

            <span className="text-sm text-gray-300">
              {mechanism}
            </span>
          </div>
        ))}

      </div>

    </div>
  )}

</div>

</div>
        <div className="mt-6">

        <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
    🎯 Best For
    </div>

  <div className="mt-3 flex flex-wrap gap-2">

    {intervention.improves?.map((item) => (
      <span
        key={item}
        className="rounded-full bg-slate-800 px-3 py-1 text-sm"
      >
        {healthLabelMap[item] ?? item}
      </span>
    ))}

  </div>

</div>
  
<div className="mt-6">

<div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
  📈 Expected Impact
</div>

<div className="mt-4 grid grid-cols-2 gap-4">

  <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">

    <div className="text-sm text-gray-400">
      Longevity Score
    </div>

    <div className="mt-2 text-2xl font-bold text-emerald-400">
      {intervention.expectedImpact?.longevityScore}
    </div>

  </div>

  <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">

    <div className="text-sm text-gray-400">
      Biological Age
    </div>

    <div className="mt-2 text-2xl font-bold text-emerald-400">
      {intervention.expectedImpact?.biologicalAge}
    </div>

  </div>

</div>

</div>
  
<div className="mt-6">

<div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
  🛡 Safety
</div>

<div className="mt-3 inline-flex rounded-full bg-green-500/20 px-4 py-2 text-green-300">

  {intervention.safety?.rating}

</div>

</div>
        <div className="mt-5 border-t border-slate-700 pt-4">
      <details>
      <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
          📚 Scientific References
        </div>
    
        <div className="mt-3 space-y-2">
          {intervention.references?.map((ref, index) => (
            <div
              key={index}
              className="rounded-lg bg-slate-800 p-3"
            >
              <div className="font-semibold">
                {ref.organisation}
              </div>
    
              <div className="text-sm text-gray-400">
                {ref.type}
              </div>
            </div>
          ))}
        </div>
      </details>
    </div>
  
      </div>
      
      );
    }