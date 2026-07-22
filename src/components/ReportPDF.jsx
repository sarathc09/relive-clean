export default function ReportPDF({
    name,
    score,
    biologicalAge,
    chronologicalAge,
    summaryData,
    healthDomains,
    strengths,
    risks,
    recommendations,
  }) {
    return (
      <div
        id="pdf-report"
        className="bg-white text-gray-900 p-10 w-[794px] min-h-[1123px]"
      >
        {/* Header */}
        <div className="border-b pb-6 mb-8">
          <h1 className="text-4xl font-bold">
            ReLive Longevity Report
          </h1>
  
          <p className="text-gray-600 mt-2">
            Personalized Health Assessment
          </p>
        </div>
  
        {/* Patient */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold">
            Participant
          </h2>
  
          <p className="mt-2">
            <strong>Name:</strong> {name}
          </p>
        </div>
  
        {/* Score */}
        <div className="grid grid-cols-3 gap-6 mb-8">
  
          <div className="border rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Longevity Score
            </p>
  
            <p className="text-4xl font-bold">
              {score}
            </p>
          </div>
  
          <div className="border rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Biological Age
            </p>
  
            <p className="text-4xl font-bold">
              {biologicalAge}
            </p>
          </div>
  
          <div className="border rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Chronological Age
            </p>
  
            <p className="text-4xl font-bold">
              {chronologicalAge}
            </p>
          </div>
  
        </div>
  
        {/* AI Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            AI Health Summary
          </h2>
  
          <p>
            {summaryData.summary}
          </p>
        </div>
  
        {/* Domains */}
        <div className="mb-8">
  
          <h2 className="text-xl font-bold mb-4">
            Health Domains
          </h2>
  
          {Object.entries(healthDomains).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b py-2"
            >
              <span>{key}</span>
  
              <span>{value}</span>
            </div>
          ))}
  
        </div>
  
        {/* Strengths */}
  
        <div className="mb-6">
  
          <h2 className="text-xl font-bold">
            Strengths
          </h2>
  
          <ul className="list-disc ml-6 mt-2">
            {strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
  
        </div>
  
        {/* Risks */}
  
        <div className="mb-6">
  
          <h2 className="text-xl font-bold">
            Areas for Improvement
          </h2>
  
          <ul className="list-disc ml-6 mt-2">
            {risks.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
  
        </div>
  
        {/* Recommendations */}
  
        <div>
  
          <h2 className="text-xl font-bold">
            Recommended Actions
          </h2>
  
          <ul className="list-disc ml-6 mt-2">
            {recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
  
        </div>
  
      </div>
    );
  }