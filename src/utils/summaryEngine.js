/**
 * src/utils/summaryEngine.js
 *
 * Generates a structured wellness summary based on longevity assessment data.
 *
 * This utility intentionally:
 * - Uses encouraging, evidence-informed language.
 * - Avoids medical diagnoses.
 * - Avoids overstating certainty.
 * - Produces deterministic output.
 */

/**
 * Returns the highest scoring health domain.
 */
function getStrongestDomain(healthDomains = {}) {
    const entries = Object.entries(healthDomains);
  
    if (!entries.length) {
      return null;
    }
  
    return entries.reduce((best, current) =>
      current[1] > best[1] ? current : best
    );
  }
  
  /**
   * Returns the lowest scoring health domain.
   */
  function getWeakestDomain(healthDomains = {}) {
    const entries = Object.entries(healthDomains);
  
    if (!entries.length) {
      return null;
    }
  
    return entries.reduce((lowest, current) =>
      current[1] < lowest[1] ? current : lowest
    );
  }
  
  /**
   * Converts camelCase or snake_case into readable labels.
   */
  function formatLabel(text = "") {
    return text
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  
  /**
   * Determines age comparison text.
   */
  function buildAgeComparison(biologicalAge, chronologicalAge) {
    if (
      typeof biologicalAge !== "number" ||
      typeof chronologicalAge !== "number"
    ) {
      return "Your biological age estimate provides another perspective on your current health profile.";
    }
  
    const diff = biologicalAge - chronologicalAge;
  
    if (Math.abs(diff) < 1) {
      return `Your estimated biological age is broadly similar to your chronological age (${chronologicalAge}).`;
    }
  
    if (diff < 0) {
      return `Your estimated biological age is about ${Math.abs(
        Math.round(diff)
      )} year${Math.abs(Math.round(diff)) === 1 ? "" : "s"} younger than your chronological age (${chronologicalAge}), which may reflect supportive lifestyle habits.`;
    }
  
    return `Your estimated biological age is about ${Math.round(
      diff
    )} year${Math.round(diff) === 1 ? "" : "s"} higher than your chronological age (${chronologicalAge}). This can highlight areas where lifestyle improvements may be beneficial over time.`;
  }
  
  /**
   * Creates an overall title.
   */
  function buildTitle(score) {
    if (score >= 90) return "Excellent Longevity Foundation";
    if (score >= 80) return "Strong Health Profile";
    if (score >= 70) return "Good Progress With Room To Improve";
    if (score >= 60) return "Building a Healthier Foundation";
    return "A Great Place To Start";
  }
  
  /**
   * Safely extracts the top priorities from recommendation data.
   *
   * Accepts:
   * [
   *   {title, priority}
   * ]
   *
   * or
   *
   * [
   *   {name}
   * ]
   *
   * or
   *
   * [
   *   "Sleep"
   * ]
   */
  /*function getTopPriorities(recommendationData = []) {
    if (!Array.isArray(recommendationData)) {
      return [];
    }
  
    return recommendationData
      .slice()
      .sort((a, b) => {
        const pa = typeof a?.priority === "number" ? a.priority : 999;
        const pb = typeof b?.priority === "number" ? b.priority : 999;
        return pa - pb;
      })
      .slice(0, 3)
      .map((item) => {
        if (typeof item === "string") return item;
  
        return (
          item.title ||
          item.name ||
          item.domain ||
          item.category ||
          "Health Improvement"
        );
      });
  }**/
      function getTopPriorities(recommendationData = {}) {
        if (!Array.isArray(recommendationData.priorities)) {
          return [];
        }
      
        return recommendationData.priorities.slice(0, 3);
      }
  
  /**
   * Builds three practical next steps.
   */
  function buildNextSteps(weakestDomain, priorities) {
    const steps = [];
  
    if (weakestDomain) {
      steps.push(
        `Focus first on improving ${formatLabel(
          weakestDomain[0]
        )} through consistent, sustainable habits.`
      );
    }
  
    priorities.forEach((priority) => {
      if (steps.length < 3) {
        steps.push(`Begin implementing recommendations related to ${priority}.`);
      }
    });
  
    while (steps.length < 3) {
      steps.push(
        "Review your progress regularly and make gradual lifestyle improvements."
      );
    }
  
    return steps;
  }
  
  /**
   * Main summary generator.
   */
  export function generateSummary({
    overallScore,
    biologicalAge,
    chronologicalAge,
    healthDomains = {},
    recommendationData = [],
  }) {
    const strongest = getStrongestDomain(healthDomains);
    const weakest = getWeakestDomain(healthDomains);
    const priorities = getTopPriorities(recommendationData);
  
    const strengths = [];
  
    if (strongest) {
      strengths.push(
        `${formatLabel(strongest[0])} is currently your strongest health domain.`
      );
    }
  
    if (
      typeof overallScore === "number" &&
      overallScore >= 80
    ) {
      strengths.push(
        "Your overall assessment suggests several positive lifestyle patterns."
      );
    } else {
      strengths.push(
        "You already have a foundation that can be strengthened through consistent healthy habits."
      );
    }
  
    const opportunities = [];
  
    if (weakest) {
      opportunities.push(
        `${formatLabel(
          weakest[0]
        )} appears to offer the greatest opportunity for improvement.`
      );
    }
  
    priorities.forEach((priority) =>
      opportunities.push(`Prioritize improvements related to ${priority}.`)
    );
  
    const summary = [
      `Your overall longevity score is ${overallScore}/100.`,
      buildAgeComparison(biologicalAge, chronologicalAge),
      strongest
        ? `${formatLabel(
            strongest[0]
          )} stands out as your strongest area.`
        : "",
      weakest
        ? `${formatLabel(
            weakest[0]
          )} may benefit most from additional attention.`
        : "",
      priorities.length
        ? `Your highest priorities are ${priorities.join(", ")}.`
        : "",
      "These insights are intended to support informed lifestyle decisions and should not be considered a medical diagnosis.",
    ]
      .filter(Boolean)
      .join(" ");
  
    return {
      title: buildTitle(overallScore),
      summary,
      strengths,
      opportunities,
      nextSteps: buildNextSteps(weakest, priorities),
    };
  }