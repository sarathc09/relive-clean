import BiologicalAgeClock from "../components/BiologicalAgeClock";
import HealthDashboard from "../components/HealthDashboard";
import AISummaryCard from "../components/AISummaryCard";
import { generateLongevityPDF } from "../services/pdfService";
import EvidenceCard from "../components/EvidenceCard";
import { getBestIntervention } from "../core/reasoning/reasoningEngine";
import { generateExplanation } from "../core/reasoning/explanationEngine";
import { getTopInterventionsForDomain } from "../core/reasoning/reasoningEngine";
import AIHealthCoachCard from "../components/AIHealthCoachCard";
import { generateActionPlan } from "../utils/actionPlanEngine";
import ProjectedImprovementCard from "../components/ProjectedImprovementCard";
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
      
          weakestDomain,
          topInterventions,
          explanation
        });
      };
      const weakestDomain = Object.entries(healthDomains).sort(
        (a, b) => a[1] - b[1]
      )[0]?.[0];
      
      const topInterventions =getTopInterventionsForDomain(
        weakestDomain,
        3
    );  
    const actionPlan = generateActionPlan(topInterventions);
      const explanation = generateExplanation(
        weakestDomain,
        topInterventions[0]
        
      );
    return (
        <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">

<div
  id="report-container"
  className="w-full max-w-6xl mx-auto bg-[#111827] border border-white/10 rounded-3xl p-10 shadow-2xl"
>
  
          <h1 className="text-5xl font-bold text-center mb-4">
            {name}'s Longevity Report
          </h1>
  
          <p className="text-center text-gray-400 mb-8">
            Personalized health insights based on your assessment.
          </p>
  
          <div className="flex flex-col gap-14 mb-12">
  
  <BiologicalAgeClock
    biologicalAge={biologicalAge}
    chronologicalAge={chronologicalAge}
  />
  <div className="mt-8 grid grid-cols-4 gap-4 w-full">

<div className="rounded-2xl bg-white/5 p-5 text-center">
  <div className="text-xs uppercase tracking-wider text-gray-400">
    Actual Age
  </div>

  <div className="mt-2 text-3xl font-bold">
    {chronologicalAge}
  </div>
</div>

<div className="rounded-2xl bg-white/5 p-5 text-center">
  <div className="text-xs uppercase tracking-wider text-gray-400">
    Biological Age
  </div>

  <div className="mt-2 text-3xl font-bold text-emerald-400">
    {biologicalAge}
  </div>
</div>

<div className="rounded-2xl bg-white/5 p-5 text-center">
  <div className="text-xs uppercase tracking-wider text-gray-400">
    Difference
  </div>

  <div className="mt-2 text-3xl font-bold">
    {chronologicalAge - biologicalAge}
  </div>
</div>

<div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 text-center">
  <div className="text-xs uppercase tracking-wider text-emerald-300">
    Longevity Score
  </div>

  <div className="mt-2 text-3xl font-bold text-emerald-400">
    {score}
  </div>
</div>

</div>
  
<AISummaryCard
    summary={summaryData}
  />
  <AIHealthCoachCard
  weakestDomain={weakestDomain}
  intervention={topInterventions[0]}
/>
<ProjectedImprovementCard
  score={score}
  biologicalAge={biologicalAge}
  intervention={topInterventions[0]}
/>
  <HealthDashboard
      healthDomains={healthDomains}
  />
    <div className="grid md:grid-cols-2 gap-6 mt-14">
  
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

  
 
  
  </div>
       
  <div className="mt-14 bg-white/5 rounded-2xl p-8">
  
            
     
          {topInterventions.map((item) => (
  <div key={item.id} className="mb-6">
    <EvidenceCard intervention={item} />
  </div>
  
))}

<div className="mt-6 rounded-xl bg-blue-900/20 border border-blue-500/30 p-5">
  <h3 className="font-semibold text-blue-300">
    Why this recommendation?
  </h3>

  <p className="mt-2 text-gray-300">
    {explanation}
  </p>
</div>
</div>
            
  
            
<div className="mt-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/10 via-slate-900 to-cyan-900/10 p-8">

<div className="text-center">

  <h2 className="text-3xl font-bold text-white">
    Ready to Improve Your Biological Age?
  </h2>

  <p className="mt-4 mx-auto max-w-2xl text-gray-300 leading-7">
    Your assessment has identified personalised opportunities to improve your
    long-term health and longevity. Download your report or schedule a
    one-to-one consultation to receive a tailored action plan.
  </p>

</div>

<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

  <button
    onClick={downloadReport}
    className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
  >
    📄 Download Full Report
  </button>

  <a
    href="https://relive.dayschedule.com/longevity-consultation"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600">
      🚀 Book My Longevity Consultation
    </button>
  </a>

</div>

</div>
<div className="mt-16 border-t border-white/10 pt-8">

  <div className="grid gap-8 md:grid-cols-2">

    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
        Medical Disclaimer
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-500">
        This longevity assessment is intended for educational and informational
        purposes only. It is not a medical diagnosis and should not replace
        personalised advice from a qualified healthcare professional.
      </p>
    </div>

    <div className="text-left md:text-right">

      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
        Report Information
      </h3>

      <div className="mt-3 space-y-1 text-sm text-gray-500">

        <p>ReLive Longevity</p>

        <p>Evidence-Driven Health Assessment</p>

        <p>Version 1.0</p>

        <p>© 2026 ReLive. All Rights Reserved.</p>

      </div>

    </div>

  </div>

</div>
          </div>
  
        </div>

 
    );
  }