
import { exerciseInterventions } from "../research/interventions/exercise";
import { nutritionInterventions } from "../research/interventions/nutrition";
import { sleepInterventions } from "../research/interventions/sleep";

const interventions = [
  ...exerciseInterventions,
  ...nutritionInterventions,
  ...sleepInterventions
];

export function getRecommendationById(id) {
  return interventions.find(
    intervention => intervention.id === id
  );
}

export function getRecommendationsForDomain(domain) {
  return interventions.filter(intervention =>
    intervention.improves.includes(domain)
  );
}

export function getAllInterventions() {
  return interventions;
}