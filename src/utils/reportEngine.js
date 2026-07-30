/**
 * ============================================================================
 * ReLive Longevity
 * Report Engine
 * ============================================================================
 *
 * Generates a clean, serializable report object from the longevity assessment.
 *
 * Design Goals
 * ------------
 * ✓ Pure function
 * ✓ No UI logic
 * ✓ No HTML
 * ✓ No side effects
 * ✓ Easy to export to PDF
 * ✓ Easy to send via API
 * ✓ Easy to store in database
 * ✓ Versioned for future upgrades
 * ============================================================================
 */

/**
 * Returns a simple health risk category based on the longevity score.
 */

function calculateRiskLevel(score = 0) {
    if (score >= 90) return "Low";
    if (score >= 75) return "Moderate";
    if (score >= 60) return "Elevated";
    return "High";
  }
  
  /**
   * Generates a report object.
   */
  export function generateReportData({
    name = "User",
    overallScore = 0,
    biologicalAge = 0,
    chronologicalAge = 0,
    healthDomains = {},
    recommendationData = {},
    summaryData = {},
  }) {
    const ageDifference = Number(
      (biologicalAge - chronologicalAge).toFixed(1)
    );
  
    return {
      report: {
        title: "ReLive Evidence-Driven Longevity Report",
        version: "RC1",
        generatedAt: new Date().toISOString(),
        reportType: "Assessment-Based Longevity Report"
      },
     
  
      metadata: {
        reportType: "Longevity Assessment",
        generatedBy: "ReLive AI",
      },
  
      user: {
        name,
      },
  
      assessment: {
        Longevity Health Score,
        Estimated Biological Age,
        chronologicalAge,
        ageDifference,
        riskLevel: calculateRiskLevel(overallScore),
        confidence: {
          level: "Moderate",
          basis: "Questionnaire-based assessment"
        }
        disclaimer: {
          title: "Important Notice",
          text:
            "This report provides evidence-informed wellness guidance based on your questionnaire responses. It is not a medical diagnosis and should not replace professional medical advice."
        }
      },
  
      summary: {
        title: summaryData?.title ?? "",
        summary: summaryData?.summary ?? "",
        strengths: [...(summaryData?.strengths ?? [])],
        opportunities: [...(summaryData?.opportunities ?? [])],
      },
  
      // Health domains are stored as an object
      // Example:
      // {
      //   sleep: 78,
      //   heart: 65,
      //   brain: 72
      // }
      healthDomains: {
        ...healthDomains,
      },
  
      // Entire recommendation engine output
      recommendations: {
        ...recommendationData,
      },
  
      nextSteps: [...(summaryData?.nextSteps ?? [])],
    };
  }
  
  export default generateReportData;