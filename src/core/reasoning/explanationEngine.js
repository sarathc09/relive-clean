export function generateExplanation(
    weakestDomain,
    intervention
  ) {
    if (!intervention) return "";
  
    return `Your lowest health domain is ${capitalize(
      weakestDomain
    )}. ${intervention.title} has been selected because it has ${intervention.evidence.quality.toLowerCase()} scientific evidence, is rated ${intervention.safety.rating.toLowerCase()}, and is expected to improve ${intervention.improves.join(", ")}.`;
  }
  
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }