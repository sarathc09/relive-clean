export function getEvidenceStars(level) {
    switch (level) {
      case 5:
        return "★★★★★";
  
      case 4:
        return "★★★★☆";
  
      case 3:
        return "★★★☆☆";
  
      case 2:
        return "★★☆☆☆";
  
      default:
        return "★☆☆☆☆";
    }
  }
  
  export function getEvidenceLabel(level) {
    switch (level) {
      case 5:
        return "Very High";
  
      case 4:
        return "High";
  
      case 3:
        return "Moderate";
  
      case 2:
        return "Low";
  
      default:
        return "Very Low";
    }
  }