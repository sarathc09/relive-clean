import BiologicalAgeClock from "../components/BiologicalAgeClock";
import HealthDashboard from "../components/HealthDashboard";
import AISummaryCard from "../components/AISummaryCard";
import { generateLongevityPDF } from "../services/pdfService";
export default function ResultsPage({
    name,
    score,
    biologicalAge,
    chronologicalAge,
    healthDomains,
    summaryData,
    recommendationData,
    recommendations,
    strengths,
    risks,
  }) {
    const downloadReport = () => {
        generateLongevityPDF({
          name,
          score,
          biologicalAge,
          chronologicalAge,
          summaryData,
          healthDomains,
          strengths,
          risks,
          recommendations,
        });
      };
        
    return (
        <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">

<div
  id="report-container"
  className="w-full max-w-5xl mx-auto bg-[#111827] border border-white/10 rounded-3xl p-10 shadow-2xl"
>
  
          <h1 className="text-5xl font-bold text-center mb-4">
            {name}'s Longevity Report
          </h1>
  
          <p className="text-center text-gray-400 mb-8">
            Personalized health insights based on your assessment.
          </p>
  
          <div className="flex flex-col items-center mb-10">
  
  <BiologicalAgeClock
    biologicalAge={biologicalAge}
    chronologicalAge={chronologicalAge}
  />
   <div className="mt-6 text-center">
  
  <div className="text-6xl font-bold text-emerald-400">
    {score}
  </div>

  <div className="text-xl text-gray-300">
    Longevity Score
  </div>

</div>
<AISummaryCard
    summary={summaryData}
  />
  <HealthDashboard
      healthDomains={healthDomains}
  />
  
 
  
  </div>
          <div className="grid md:grid-cols-2 gap-6">
  
            <div className="bg-emerald-500/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">
                Strengths
              </h2>
  
              {strengths.map((item, index) => (
                <p key={index}>✓ {item}</p>
              ))}
            </div>
  
            <div className="bg-red-500/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">
                Risks
              </h2>
  
              {risks.map((item, index) => (
                <p key={index}>⚠ {item}</p>
              ))}
            </div>
  
          </div>
  
          <div className="mt-8 bg-white/5 rounded-2xl p-6">
  
            <h2 className="text-xl font-bold mb-4">
              Recommended Actions
            </h2>
  
            {recommendations.map((item, index) => (
              <p key={index}>✓ {item}</p>
            ))}
  
  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

  <button
    type="button"
    onClick={downloadReport}
    className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
  >
    📄 Download PDF Report
  </button>

  <a
    href="https://relive.dayschedule.com/longevity-consultation"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button
      type="button"
      className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
    >
      Claim Your Free Strategy Call
    </button>
  </a>

</div>
          </div>
  
        </div>
  {/* Hidden PDF Template */}
 

      </div>
    );
  }