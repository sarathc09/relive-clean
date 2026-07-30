import { getRecommendationsForDomain } from "../../evidence/evidenceEngine";
import { recommendationMap } from "./recommendationMap";
import { getRecommendationById } from "../../evidence/evidenceEngine";
export function getBestIntervention(domain) {
  const mappedIds = recommendationMap[domain] || [];

  if (mappedIds.length === 0) {
    return null;
  }

  // Get all mapped interventions
  const interventions = mappedIds
    .map(id => getRecommendationById(id))
    .filter(Boolean);

  if (interventions.length === 0) {
    return null;
  }

  // Rank by Evidence × Confidence
  interventions.sort((a, b) => {
    const scoreA = a.evidence.level * a.evidence.confidence;
    const scoreB = b.evidence.level * b.evidence.confidence;

    return scoreB - scoreA;
  });

  return interventions[0];
}
export function getTopInterventionsForDomain(domain, limit = 3) {
  const mappedIds = recommendationMap[domain] || [];

  const interventions = mappedIds
    .map(id => getRecommendationById(id))
    .filter(Boolean);

  return interventions
    .sort((a, b) => {
      const scoreA = a.evidence.level * a.evidence.confidence;
      const scoreB = b.evidence.level * b.evidence.confidence;

      return scoreB - scoreA;
    })
    .slice(0, limit);
}
export function rankInterventions(domain) {
  const interventions = getRecommendationsForDomain(domain);

  return interventions.sort((a, b) => {
    const scoreA =
      a.evidence.level * a.evidence.confidence;

    const scoreB =
      b.evidence.level * b.evidence.confidence;

    return scoreB - scoreA;
  });
}