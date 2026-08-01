export default function AISummaryCard({ summary }) {
    if (!summary) return null;
  
    return (
        <div className="w-full mt-8 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-4 md:p-6">
      
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">🧠</div>
      
            <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                AI Longevity Summary
              </h2>
      
              <p className="text-xs md:text-sm text-gray-400">
                Personalized insights based on your assessment
              </p>
            </div>
          </div>
      
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 md:p-5 mb-6">
      
            <p className="text-xs uppercase tracking-widest text-emerald-300">
              Overall Outlook
            </p>
      
            <h3 className="text-xl md:text-2xl font-bold text-emerald-400 mt-2">
              {summary.title}
            </h3>
      
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      
            <div className="rounded-xl bg-white/5 p-4 md:p-5">
      
              <p className="text-xs uppercase tracking-widest text-gray-400">
                💚 Strongest Area
              </p>
      
              <p className="mt-3 text-base md:text-lg font-semibold text-white">
                {summary.strengths?.[0] || "—"}
              </p>
      
            </div>
      
            <div className="rounded-xl bg-white/5 p-4 md:p-5">
      
              <p className="text-xs uppercase tracking-widest text-gray-400">
                ⚠ Biggest Opportunity
              </p>
      
              <p className="mt-3 text-base md:text-lg font-semibold text-white">
                {summary.opportunities?.[0] || "—"}
              </p>
      
            </div>
      
          </div>
          <div className="rounded-xl bg-white/5 p-4 md:p-5">

  <p className="text-xs uppercase tracking-widest text-gray-400">
    Executive Summary
  </p>

  <p className="mt-3 text-sm md:text-base leading-7 text-gray-300">
    {summary.summary}
  </p>

</div>
      
          
      
            
      
          
      
        </div>
      );
  }