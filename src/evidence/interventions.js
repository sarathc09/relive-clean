export const interventions = [
    {
      id: "walking",
  
      metadata: {
        version: "1.0",
        reviewedOn: "2026-07-25",
        nextReview: "2026-10-25",
        reviewedBy: "Chief Science Officer"
      },
  
      title: "Daily Walking",
  
      category: "Exercise",
  
      description:
        "Walking is one of the safest and most evidence-supported lifestyle interventions for improving overall health and healthy ageing.",
  
      evidence: {
        level: 5,
        confidence: 0.97,
        quality: "Very High"
      },
  
      safety: {
        rating: "Very Safe",
        contraindications: []
      },
  
      improves: [
        "heart",
        "fitness",
        "metabolism"
      ],
  
      mechanisms: [
        "Improves insulin sensitivity",
        "Improves endothelial function",
        "Improves mitochondrial efficiency",
        "Improves cardiovascular fitness"
      ],
  
      biomarkers: [
        "HbA1c",
        "Blood Pressure",
        "Resting Heart Rate"
      ],
  
      hallmarks: [
        "Mitochondrial Dysfunction",
        "Deregulated Nutrient Sensing"
      ],
  
      recommendedFor: [
        "Low Activity",
        "Poor Fitness",
        "High BMI"
      ],
  
      expectedImpact: {
        longevityScore: "+3 to +6",
        biologicalAge: "-0.5 to -2 years"
      },
  
      whyItWorks:
        "Regular walking improves cardiovascular health, insulin sensitivity, metabolic health and overall healthy ageing.",
  
      references: [
        {
          organisation: "World Health Organization",
          type: "Physical Activity Guidelines"
        },
        {
          organisation: "American Heart Association",
          type: "Guideline"
        }
      ]
    }
  ];