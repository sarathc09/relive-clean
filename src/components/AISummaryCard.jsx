export default function AISummaryCard({ summary }) {
    if (!summary) return null;
  
    return (
        <div className="w-full mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
      
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">🧠</div>
      
            <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
                AI Longevity Summary
              </h2>
      
              <p className="text-gray-400 text-sm">
                Personalized insights based on your assessment
              </p>
            </div>
          </div>
      
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 mb-6">
      
            <p className="text-xs uppercase tracking-widest text-emerald-300">
              Overall Outlook
            </p>
      
            <h3 className="text-2xl font-bold text-emerald-400 mt-2">
              {summary.title}
            </h3>
      
          </div>
      
          <div className="grid md:grid-cols-2 gap-4 mb-6">
      
            <div className="rounded-xl bg-white/5 p-5">
      
              <p className="text-xs uppercase tracking-widest text-gray-400">
                💚 Strongest Area
              </p>
      
              <p className="mt-3 text-lg font-semibold text-white">
                {summary.strengths?.[0] || "—"}
              </p>
      
            </div>
      
            <div className="rounded-xl bg-white/5 p-5">
      
              <p className="text-xs uppercase tracking-widest text-gray-400">
                ⚠ Biggest Opportunity
              </p>
      
              <p className="mt-3 text-lg font-semibold text-white">
                {summary.opportunities?.[0] || "—"}
              </p>
      
            </div>
      
          </div>
      
          
      
            
      
          
      
        </div>
      );
  }