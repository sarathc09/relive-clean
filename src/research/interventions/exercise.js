export const exerciseInterventions = [
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

whyItWorks:
  "Regular walking improves cardiovascular health, insulin sensitivity, metabolic health and supports healthy ageing.",
  
      evidence: {
        level: 5,
        confidence: 0.97,
        quality: "Very High"
      },
      improves: [
        "heart",
        "fitness",
        "metabolism"
      ],
  
      mechanisms: [
        "Improves insulin sensitivity",
        "Improves endothelial function",
        "Improves mitochondrial efficiency"
      ],
  
      biomarkers: [
        "HbA1c",
        "Blood Pressure",
        "Resting Heart Rate"
      ],
  
      recommendedDose: {
        frequency: "Daily",
        duration: "30–60 minutes",
        intensity: "Moderate"
      },
  
      safety: {
        rating: "Very Safe",
        contraindications: []
      },
  
      expectedImpact: {
        longevityScore: "+3 to +6",
        biologicalAge: "-0.5 to -2 years"
      },
      
      references: [
        {
          organisation: "World Health Organization",
          type: "Physical Activity Guideline"
        },
        {
          organisation: "American College of Sports Medicine",
          type: "Exercise Guideline"
        }
      ]
    },
    {
      id: "strength-training",
    
      title: "Strength Training",
    
      category: "Exercise",

      
    
      description:
        "Regular resistance training improves muscle mass, strength, insulin sensitivity and healthy ageing.",
    
      evidence: {
        level: 5,
        confidence: 0.96,
        quality: "Very High"
      },
    
      safety: {
        rating: "Safe",
        contraindications: [
          "Recent major injury",
          "Unstable cardiovascular disease without medical clearance"
        ]
      },
    
      improves: [
        "fitness",
        "metabolism",
        "recovery"
      ],
    
      mechanisms: [
        "Increases muscle protein synthesis",
        "Improves insulin sensitivity",
        "Improves mitochondrial function",
        "Reduces age-related muscle loss"
      ],
    
      biomarkers: [
        "HbA1c",
        "Fasting Glucose",
        "Lean Body Mass"
      ],
    
      recommendedDose: {
        frequency: "2–3 sessions/week",
        duration: "30–60 minutes",
        intensity: "Moderate to Vigorous"
      },
    
      expectedImpact: {
        longevityScore: "+4 to +8",
        biologicalAge: "-1 to -2 years"
      },
    
      whyItWorks:
        "Resistance training preserves muscle, improves metabolic health and supports healthy ageing.",
    
      references: [
        {
          organisation: "American College of Sports Medicine",
          type: "Guideline"
        }
      ]
    },
    {
      id: "zone2-cardio",
    
      title: "Zone 2 Cardio",
    
      category: "Exercise",
    
      description:
        "Zone 2 aerobic training improves mitochondrial health, cardiovascular fitness and endurance.",
    
      evidence: {
        level: 4,
        confidence: 0.94,
        quality: "High"
      },
    
      safety: {
        rating: "Safe",
        contraindications: [
          "Consult a physician before beginning vigorous exercise if you have known cardiovascular disease or concerning symptoms."
        ]
      },
    
      improves: [
        "heart",
        "fitness",
        "metabolism"
      ],
    
      mechanisms: [
        "Improves mitochondrial function",
        "Improves fat oxidation",
        "Increases aerobic capacity",
        "Improves insulin sensitivity"
      ],
    
      biomarkers: [
        "VO₂ Max",
        "Resting Heart Rate",
        "HbA1c"
      ],
    
      recommendedDose: {
        frequency: "3–5 sessions/week",
        duration: "30–45 minutes",
        intensity: "Zone 2"
      },
    
      expectedImpact: {
        longevityScore: "+4 to +7",
        biologicalAge: "-1 to -2 years"
      },
    
      whyItWorks:
        "Zone 2 training improves cardiovascular fitness and mitochondrial efficiency, two key components of healthy ageing.",
    
      references: [
        {
          organisation: "American College of Sports Medicine",
          type: "Exercise Guideline"
        }
      ]
    }
  ];