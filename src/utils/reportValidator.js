export function validateReport(report) {
    if (!report) {
      throw new Error("Report data is required.");
    }
  
    if (!report.name?.trim()) {
      throw new Error("Participant name is missing.");
    }
  
    if (typeof report.score !== "number") {
      throw new Error("Invalid longevity score.");
    }
  
    if (typeof report.biologicalAge !== "number") {
      throw new Error("Invalid biological age.");
    }
  
    if (typeof report.chronologicalAge !== "number") {
      throw new Error("Invalid chronological age.");
    }
  
    if (!report.healthDomains) {
      throw new Error("Health domains are missing.");
    }
  
    if (!report.summaryData?.executiveSummary) {
      throw new Error("Executive summary is missing.");
    }
  
    return true;
  }