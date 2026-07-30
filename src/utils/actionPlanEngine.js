export function generateActionPlan(interventions = []) {
    const next30Days = [];
    const dailyHabits = [];
    const milestones = [];
    const expectedOutcomes = [];
  
    interventions.slice(0, 3).forEach((item, index) => {
      next30Days.push({
        week: index + 1,
        title: item.title,
        action:
          item.whyItWorks ||
          item.description ||
          "Follow the recommended intervention consistently."
      });
  
      if (item.recommendedDose) {
        dailyHabits.push({
          habit: item.title,
          frequency: item.recommendedDose.frequency,
          duration: item.recommendedDose.duration,
          intensity: item.recommendedDose.intensity
        });
      }
  
      if (item.expectedImpact) {
        expectedOutcomes.push({
          intervention: item.title,
          longevityScore: item.expectedImpact.longevityScore,
          biologicalAge: item.expectedImpact.biologicalAge
        });
      }
    });
  
    milestones.push(
      "Complete all recommended habits consistently for 30 days."
    );
  
    milestones.push(
      "Repeat the ReLive Assessment after 30 days."
    );
  
    return {
      next30Days,
      dailyHabits,
      milestones,
      expectedOutcomes
    };
  }