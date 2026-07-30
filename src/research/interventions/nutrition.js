export const nutritionInterventions = [
    {
      id: "mediterranean-diet",
  
      title: "Mediterranean-style Diet",
  
      category: "Nutrition",
  
      description:
        "A Mediterranean-style dietary pattern is one of the best studied nutritional approaches for improving cardiovascular, metabolic and long-term health.",
  
      evidence: {
        level: 5,
        confidence: 0.97,
        quality: "Very High"
      },
  
      safety: {
        rating: "Very Safe",
        contraindications: [
          "Food allergies",
          "Individual dietary restrictions"
        ]
      },
  
      improves: [
        "heart",
        "metabolism",
        "brain"
      ],
  
      mechanisms: [
        "Reduces systemic inflammation",
        "Improves lipid profile",
        "Improves insulin sensitivity",
        "Supports gut microbiome diversity"
      ],
  
      biomarkers: [
        "LDL Cholesterol",
        "HbA1c",
        "CRP",
        "Triglycerides"
      ],
  
      recommendedDose: {
        frequency: "Daily",
        duration: "Long-term lifestyle",
        intensity: "High adherence"
      },
  
      expectedImpact: {
        longevityScore: "+4 to +8",
        biologicalAge: "-1 to -3 years"
      },
  
      whyItWorks:
        "A Mediterranean-style diet is associated with improved cardiovascular health, metabolic health and healthy ageing in multiple long-term studies.",
  
      references: [
        {
          organisation: "European Society of Cardiology",
          type: "Guideline"
        },
        {
          organisation: "American Heart Association",
          type: "Dietary Guidance"
        }
      ]
    }
  ];