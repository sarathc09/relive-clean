/**
 * Longevity Recommendation Engine
 *
 * Generates personalized health recommendations from quiz answers,
 * health-domain scores, and biological age. Designed for easy extension
 * with blood biomarkers and wearable-device data via registered rule hooks.
 */

// ---------------------------------------------------------------------------
// Constants & domain catalog
// ---------------------------------------------------------------------------

/** Quiz answer indices — keep in sync with questions in App.jsx */
export const ANSWER_INDEX = {
  SLEEP: 0,
  EXERCISE: 1,
  STRESS: 2,
  ENERGY: 3,
  DIET: 4,
  HYDRATION: 5,
  SMOKING: 6,
  ALCOHOL: 7,
  STEPS: 8,
  STRENGTH: 9,
};

/** Score thresholds for domain analysis */
const THRESHOLDS = {
  LOW: 50,
  MODERATE: 65,
  HIGH: 80,
};

/** Impact weights used to rank recommendations (higher = more urgent) */
const IMPACT = {
  CRITICAL: 10,
  VERY_HIGH: 9,
  HIGH: 8,
  MODERATE: 6,
  LOW: 4,
  MINIMAL: 2,
};

/**
 * Canonical health domains. Each entry defines metadata used when
 * healthDomains is passed as a plain score map.
 */
const DOMAIN_CATALOG = {
  sleep: {
    label: "Sleep",
    icon: "Moon",
    category: "recovery",
  },
  fitness: {
    label: "Fitness",
    icon: "Activity",
    category: "movement",
  },
  stress: {
    label: "Stress Management",
    icon: "Brain",
    category: "mental-wellness",
  },
  energy: {
    label: "Energy",
    icon: "Zap",
    category: "vitality",
  },
  nutrition: {
    label: "Nutrition",
    icon: "Apple",
    category: "nutrition",
  },
  hydration: {
    label: "Hydration",
    icon: "Droplets",
    category: "nutrition",
  },
  lifestyle: {
    label: "Lifestyle Habits",
    icon: "Heart",
    category: "habits",
  },
  activity: {
    label: "Daily Activity",
    icon: "Footprints",
    category: "movement",
  },
  strength: {
    label: "Strength Training",
    icon: "Dumbbell",
    category: "movement",
  },
};

// ---------------------------------------------------------------------------
// Extension registries (biomarkers & wearables)
// ---------------------------------------------------------------------------

/**
 * Register functions that return extra recommendations from lab data.
 * Each rule: (biomarkers, context) => Recommendation[]
 *
 * @example
 * registerBiomarkerRule((biomarkers) => {
 *   if (biomarkers.hba1c > 5.7) return [createRecommendation({ ... })];
 *   return [];
 * });
 */
const biomarkerRules = [];

/**
 * Register functions that return extra recommendations from wearable data.
 * Each rule: (wearableData, context) => Recommendation[]
 *
 * @example
 * registerWearableRule((data) => {
 *   if (data.avgHrv < 40) return [createRecommendation({ ... })];
 *   return [];
 * });
 */
const wearableRules = [];

/** @param {(biomarkers: object, context: object) => object[]} rule */
export function registerBiomarkerRule(rule) {
  biomarkerRules.push(rule);
}

/** @param {(wearableData: object, context: object) => object[]} rule */
export function registerWearableRule(rule) {
  wearableRules.push(rule);
}

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------

let recommendationCounter = 0;

/**
 * Build a standardized recommendation object.
 * @param {object} params
 * @returns {object}
 */
function createRecommendation({
  id,
  category,
  title,
  description,
  impact,
  priority,
  icon,
}) {
  recommendationCounter += 1;

  return {
    id: id ?? `rec-${recommendationCounter}`,
    category,
    title,
    description,
    impact,
    priority,
    icon,
  };
}

/**
 * Normalize healthDomains into a consistent array of { id, label, score, icon, category }.
 * Accepts:
 *   - { sleep: 72, fitness: 45 }
 *   - { sleep: { score: 72 }, fitness: { score: 45, label: "Fitness" } }
 *   - [{ id: "sleep", score: 72 }, ...]
 *
 * @param {object|object[]|null|undefined} healthDomains
 * @returns {object[]}
 */
function normalizeHealthDomains(healthDomains) {
  if (!healthDomains) return [];

  if (Array.isArray(healthDomains)) {
    return healthDomains.map((domain) => {
      const meta = DOMAIN_CATALOG[domain.id] ?? {};
      return {
        id: domain.id,
        label: domain.label ?? domain.name ?? meta.label ?? domain.id,
        score: clampScore(domain.score ?? domain.value ?? 0),
        icon: domain.icon ?? meta.icon ?? "Activity",
        category: domain.category ?? meta.category ?? "general",
      };
    });
  }

  return Object.entries(healthDomains).map(([id, value]) => {
    const meta = DOMAIN_CATALOG[id] ?? {};
    const score =
      typeof value === "number" ? value : clampScore(value?.score ?? value?.value ?? 0);

    return {
      id,
      label: (typeof value === "object" && value.label) || meta.label || id,
      score,
      icon: (typeof value === "object" && value.icon) || meta.icon || "Activity",
      category: (typeof value === "object" && value.category) || meta.category || "general",
    };
  });
}

/** @param {number} score */
function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

/** @param {number} score */
function scoreToPriority(score) {
  if (score < 30) return "critical";
  if (score < THRESHOLDS.LOW) return "high";
  if (score < THRESHOLDS.MODERATE) return "medium";
  return "low";
}

/** @param {number} score */
function impactFromLowScore(score) {
  if (score < 30) return IMPACT.CRITICAL;
  if (score < THRESHOLDS.LOW) return IMPACT.HIGH;
  if (score < THRESHOLDS.MODERATE) return IMPACT.MODERATE;
  return IMPACT.LOW;
}

/**
 * Safely read a quiz answer.
 * @param {string[]} answers
 * @param {number} index
 * @returns {string|undefined}
 */
function getAnswer(answers, index) {
  return Array.isArray(answers) ? answers[index] : undefined;
}

/**
 * Normalize biologicalAge — supports a number or { value, chronologicalAge }.
 * @param {number|object} biologicalAge
 * @returns {{ value: number, chronologicalAge: number|null, delta: number|null }}
 */
function normalizeBiologicalAge(biologicalAge) {
  if (typeof biologicalAge === "number") {
    return { value: biologicalAge, chronologicalAge: null, delta: null };
  }

  if (biologicalAge && typeof biologicalAge === "object") {
    const value = biologicalAge.value ?? biologicalAge.biologicalAge ?? 0;
    const chronologicalAge =
      biologicalAge.chronologicalAge ?? biologicalAge.actualAge ?? null;
    const delta =
      chronologicalAge != null ? value - chronologicalAge : biologicalAge.delta ?? null;

    return { value, chronologicalAge, delta };
  }

  return { value: 0, chronologicalAge: null, delta: null };
}

// ---------------------------------------------------------------------------
// Domain-based analysis
// ---------------------------------------------------------------------------

/** Per-domain recommendation templates for low-scoring areas */
const DOMAIN_IMPROVEMENTS = {
  sleep: {
    title: "Optimize Your Sleep",
    description:
      "Aim for 7–8 hours of consistent, high-quality sleep. Maintain a regular bedtime, limit screens before bed, and keep your room cool and dark.",
    icon: "Moon",
    category: "recovery",
  },
  fitness: {
    title: "Increase Weekly Exercise",
    description:
      "Build toward at least 150 minutes of moderate aerobic activity per week. Mix cardio with mobility work for cardiovascular and metabolic benefits.",
    icon: "Activity",
    category: "movement",
  },
  stress: {
    title: "Reduce Chronic Stress",
    description:
      "Practice daily stress-reduction techniques such as breathwork, meditation, or short walks. Chronic stress accelerates biological aging.",
    icon: "Brain",
    category: "mental-wellness",
  },
  energy: {
    title: "Stabilize Daily Energy",
    description:
      "Balance protein, complex carbs, and healthy fats across meals. Prioritize sleep and movement to reduce mid-day energy crashes.",
    icon: "Zap",
    category: "vitality",
  },
  nutrition: {
    title: "Improve Diet Quality",
    description:
      "Center meals on whole foods: vegetables, lean protein, healthy fats, and fiber. Reduce ultra-processed foods, added sugars, and excess sodium.",
    icon: "Apple",
    category: "nutrition",
  },
  hydration: {
    title: "Increase Daily Hydration",
    description:
      "Target 2–3 liters of water daily. Proper hydration supports cognition, recovery, and cardiovascular function.",
    icon: "Droplets",
    category: "nutrition",
  },
  lifestyle: {
    title: "Address Lifestyle Risk Factors",
    description:
      "Reduce or eliminate smoking and limit alcohol. These habits have an outsized impact on longevity and biological age.",
    icon: "Heart",
    category: "habits",
  },
  activity: {
    title: "Move More Throughout the Day",
    description:
      "Increase daily steps toward 8,000–10,000. Frequent movement lowers mortality risk even outside structured exercise.",
    icon: "Footprints",
    category: "movement",
  },
  strength: {
    title: "Add Strength Training",
    description:
      "Resistance train 2–3 times per week. Muscle mass preserves metabolic health, bone density, and functional independence with age.",
    icon: "Dumbbell",
    category: "movement",
  },
};

/** Per-domain strength messages for high-scoring areas */
const DOMAIN_STRENGTHS = {
  sleep: "Consistent, restorative sleep supports recovery and cellular repair.",
  fitness: "Regular exercise is one of the strongest predictors of healthy aging.",
  stress: "Effective stress management protects cardiovascular and cognitive health.",
  energy: "Stable daily energy reflects balanced nutrition, sleep, and recovery.",
  nutrition: "A nutrient-dense diet fuels longevity pathways and reduces disease risk.",
  hydration: "Adequate hydration supports metabolism, cognition, and physical performance.",
  lifestyle: "Avoiding smoking and excess alcohol significantly lowers long-term health risk.",
  activity: "High daily step counts reduce cardiovascular and all-cause mortality risk.",
  strength: "Strength training preserves muscle mass and metabolic health as you age.",
};

/**
 * Build recommendations for domains scoring below the low threshold.
 * @param {object[]} domains
 * @returns {object[]}
 */
function buildDomainRecommendations(domains) {
  return domains
    .filter((domain) => domain.score < THRESHOLDS.LOW)
    .map((domain) => {
      const template = DOMAIN_IMPROVEMENTS[domain.id] ?? {
        title: `Improve ${domain.label}`,
        description: `Your ${domain.label.toLowerCase()} score is below optimal. Focused changes in this area can meaningfully improve your longevity outlook.`,
        icon: domain.icon,
        category: domain.category,
      };

      return createRecommendation({
        id: `domain-${domain.id}`,
        category: template.category,
        title: template.title,
        description: template.description,
        impact: impactFromLowScore(domain.score),
        priority: scoreToPriority(domain.score),
        icon: template.icon,
      });
    });
}

/**
 * Identify strengths from high-scoring domains.
 * @param {object[]} domains
 * @returns {string[]}
 */
function identifyDomainStrengths(domains) {
  const strengths = domains
    .filter((domain) => domain.score >= THRESHOLDS.HIGH)
    .map((domain) => {
      const message = DOMAIN_STRENGTHS[domain.id];
      return message ? `${domain.label}: ${message}` : `Strong ${domain.label} habits`;
    });

  return strengths;
}

// ---------------------------------------------------------------------------
// Answer-based warnings & recommendations
// ---------------------------------------------------------------------------

/**
 * Warning rules keyed by lifestyle risk factors from quiz answers.
 * Each rule returns a warning string when triggered.
 */
const WARNING_RULES = [
  {
    id: "smoking",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.SMOKING) === "Yes",
    message:
      "Smoking is the single largest modifiable risk factor for premature aging and chronic disease.",
    impact: IMPACT.CRITICAL,
  },
  {
    id: "smoking-occasional",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.SMOKING) === "Occasionally",
    message:
      "Even occasional smoking increases cardiovascular and cancer risk. Complete cessation is recommended.",
    impact: IMPACT.VERY_HIGH,
  },
  {
    id: "alcohol",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.ALCOHOL) === "Frequently",
    message:
      "Frequent alcohol consumption accelerates liver aging, disrupts sleep, and raises long-term disease risk.",
    impact: IMPACT.HIGH,
  },
  {
    id: "poor-sleep",
    test: (answers) => {
      const sleep = getAnswer(answers, ANSWER_INDEX.SLEEP);
      return sleep === "<5" || sleep === "5-6";
    },
    message:
      "Chronic sleep deprivation impairs immune function, accelerates cellular aging, and increases metabolic disease risk.",
    impact: IMPACT.HIGH,
  },
  {
    id: "high-stress",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.STRESS) === "High",
    message:
      "Sustained high stress elevates cortisol, promoting inflammation and faster biological aging.",
    impact: IMPACT.MODERATE,
  },
  {
    id: "sedentary",
    test: (answers) => {
      const steps = getAnswer(answers, ANSWER_INDEX.STEPS);
      return steps === "<3000" || steps === "3000-7000";
    },
    message:
      "Low daily movement is linked to higher mortality. Increasing steps is one of the fastest wins for longevity.",
    impact: IMPACT.HIGH,
  },
  {
    id: "poor-hydration",
    test: (answers) => {
      const hydration = getAnswer(answers, ANSWER_INDEX.HYDRATION);
      return hydration === "<1L" || hydration === "1-2L";
    },
    message:
      "Inadequate hydration affects energy, cognition, and cardiovascular strain. Aim for at least 2 liters daily.",
    impact: IMPACT.MODERATE,
  },
  {
    id: "poor-diet",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.DIET) === "Poor",
    message:
      "A poor diet drives inflammation, insulin resistance, and accelerated aging. Nutrition changes yield compounding benefits.",
    impact: IMPACT.HIGH,
  },
];

/**
 * Answer-specific recommendations that complement domain analysis.
 * Triggered when a specific answer indicates room for improvement.
 */
const ANSWER_RECOMMENDATIONS = [
  {
    id: "rec-sleep",
    test: (answers) => {
      const sleep = getAnswer(answers, ANSWER_INDEX.SLEEP);
      return sleep === "<5" || sleep === "5-6";
    },
    category: "recovery",
    title: "Prioritize 7–8 Hours of Sleep",
    description:
      "Set a consistent bedtime and wake time. Reduce caffeine after noon and create a wind-down routine without screens.",
    impact: IMPACT.HIGH,
    priority: "high",
    icon: "Moon",
  },
  {
    id: "rec-exercise",
    test: (answers) => {
      const exercise = getAnswer(answers, ANSWER_INDEX.EXERCISE);
      return exercise === "0" || exercise === "1-2";
    },
    category: "movement",
    title: "Exercise 3–4 Times Per Week",
    description:
      "Start with 20–30 minute sessions combining walking, cycling, or swimming. Consistency matters more than intensity at first.",
    impact: IMPACT.HIGH,
    priority: "high",
    icon: "Activity",
  },
  {
    id: "rec-stress",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.STRESS) === "High",
    category: "mental-wellness",
    title: "Implement Daily Stress Reduction",
    description:
      "Try 10 minutes of guided breathing, journaling, or a nature walk. Lowering cortisol directly supports longevity markers.",
    impact: IMPACT.MODERATE,
    priority: "medium",
    icon: "Brain",
  },
  {
    id: "rec-smoking",
    test: (answers) => {
      const smoking = getAnswer(answers, ANSWER_INDEX.SMOKING);
      return smoking === "Yes" || smoking === "Occasionally";
    },
    category: "habits",
    title: "Make Smoking Cessation Your Top Priority",
    description:
      "Quitting smoking can add years to your life expectancy. Consider nicotine replacement, counseling, or a structured cessation program.",
    impact: IMPACT.CRITICAL,
    priority: "critical",
    icon: "Heart",
  },
  {
    id: "rec-alcohol",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.ALCOHOL) === "Frequently",
    category: "habits",
    title: "Reduce Alcohol Consumption",
    description:
      "Limit alcohol to occasional use. Even moderate reduction improves sleep quality, liver health, and biological age markers.",
    impact: IMPACT.HIGH,
    priority: "high",
    icon: "Wine",
  },
  {
    id: "rec-steps",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.STEPS) === "<3000",
    category: "movement",
    title: "Increase Daily Walking to 8,000+ Steps",
    description:
      "Add short walks after meals, take stairs, or schedule a daily 30-minute walk. Small increments compound over time.",
    impact: IMPACT.HIGH,
    priority: "high",
    icon: "Footprints",
  },
  {
    id: "rec-strength",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.STRENGTH) === "Never",
    category: "movement",
    title: "Start Strength Training 2–3× Weekly",
    description:
      "Begin with bodyweight exercises: squats, push-ups, and rows. Resistance training is essential for preserving muscle with age.",
    impact: IMPACT.MODERATE,
    priority: "medium",
    icon: "Dumbbell",
  },
  {
    id: "rec-hydration",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.HYDRATION) === "<1L",
    category: "nutrition",
    title: "Increase Water Intake",
    description:
      "Carry a water bottle and set hourly reminders. Target 2–3 liters daily, more if you exercise or live in a warm climate.",
    impact: IMPACT.MODERATE,
    priority: "medium",
    icon: "Droplets",
  },
  {
    id: "rec-diet",
    test: (answers) => getAnswer(answers, ANSWER_INDEX.DIET) === "Poor",
    category: "nutrition",
    title: "Upgrade Your Diet Quality",
    description:
      "Replace processed snacks with whole foods. Add a serving of vegetables to every meal and prioritize lean protein sources.",
    impact: IMPACT.HIGH,
    priority: "high",
    icon: "Apple",
  },
];

/**
 * Answer-based strength signals for positive lifestyle habits.
 */
const ANSWER_STRENGTHS = [
  {
    test: (answers) => getAnswer(answers, ANSWER_INDEX.SLEEP) === "7-8",
    label: "Healthy Sleep Duration",
  },
  {
    test: (answers) => getAnswer(answers, ANSWER_INDEX.EXERCISE) === "5+",
    label: "Highly Active Lifestyle",
  },
  {
    test: (answers) => getAnswer(answers, ANSWER_INDEX.STRESS) === "Low",
    label: "Low Stress Levels",
  },
  {
    test: (answers) => getAnswer(answers, ANSWER_INDEX.DIET) === "Excellent",
    label: "Excellent Nutrition",
  },
  {
    test: (answers) => getAnswer(answers, ANSWER_INDEX.HYDRATION) === "3L+",
    label: "Excellent Hydration",
  },
  {
    test: (answers) => getAnswer(answers, ANSWER_INDEX.SMOKING) === "No",
    label: "Non-Smoker",
  },
  {
    test: (answers) => getAnswer(answers, ANSWER_INDEX.ALCOHOL) === "Never",
    label: "No Alcohol Consumption",
  },
  {
    test: (answers) => getAnswer(answers, ANSWER_INDEX.STEPS) === "10000+",
    label: "High Daily Step Count",
  },
  {
    test: (answers) => {
      const strength = getAnswer(answers, ANSWER_INDEX.STRENGTH);
      return strength === "3-4x" || strength === "5+";
    },
    label: "Consistent Strength Training",
  },
];

/**
 * Detect lifestyle warnings from quiz answers.
 * @param {string[]} answers
 * @returns {string[]}
 */
function detectWarnings(answers) {
  if (!Array.isArray(answers) || answers.length === 0) return [];

  return WARNING_RULES.filter((rule) => rule.test(answers)).map(
    (rule) => rule.message
  );
}

/**
 * Build answer-triggered recommendations.
 * @param {string[]} answers
 * @returns {object[]}
 */
function buildAnswerRecommendations(answers) {
  if (!Array.isArray(answers) || answers.length === 0) return [];

  return ANSWER_RECOMMENDATIONS.filter((rule) => rule.test(answers)).map(
    (rule) =>
      createRecommendation({
        id: rule.id,
        category: rule.category,
        title: rule.title,
        description: rule.description,
        impact: rule.impact,
        priority: rule.priority,
        icon: rule.icon,
      })
  );
}

/**
 * Collect strengths from positive quiz answers.
 * @param {string[]} answers
 * @returns {string[]}
 */
function identifyAnswerStrengths(answers) {
  if (!Array.isArray(answers) || answers.length === 0) return [];

  return ANSWER_STRENGTHS.filter((rule) => rule.test(answers)).map(
    (rule) => rule.label
  );
}

// ---------------------------------------------------------------------------
// Biological age context
// ---------------------------------------------------------------------------

/**
 * Add a biological-age recommendation when aging faster than chronological age.
 * @param {object} ageInfo
 * @returns {object|null}
 */
function buildBiologicalAgeRecommendation(ageInfo) {
  const { value, delta } = ageInfo;

  if (delta != null && delta > 5) {
    return createRecommendation({
      id: "rec-biological-age",
      category: "longevity",
      title: "Address Accelerated Biological Aging",
      description: `Your biological age (${value}) is ${delta} years above your chronological age. Focus on sleep, movement, nutrition, and stress reduction to reverse this trend.`,
      impact: IMPACT.VERY_HIGH,
      priority: "critical",
      icon: "Clock",
    });
  }

  if (delta != null && delta > 0) {
    return createRecommendation({
      id: "rec-biological-age-moderate",
      category: "longevity",
      title: "Close Your Biological Age Gap",
      description: `Your biological age is ${delta} year${delta === 1 ? "" : "s"} above your actual age. Targeted lifestyle changes can bring these numbers back in alignment.`,
      impact: IMPACT.MODERATE,
      priority: "medium",
      icon: "Clock",
    });
  }

  return null;
}

// ---------------------------------------------------------------------------
// Merging, deduplication & prioritization
// ---------------------------------------------------------------------------

/**
 * Merge recommendation lists and remove duplicates by id.
 * When duplicates share a category, keep the higher-impact entry.
 * @param {object[][]} lists
 * @returns {object[]}
 */
function mergeRecommendations(...lists) {
  const byId = new Map();

  for (const list of lists) {
    for (const rec of list) {
      const existing = byId.get(rec.id);
      if (!existing || rec.impact > existing.impact) {
        byId.set(rec.id, rec);
      }
    }
  }

  return Array.from(byId.values());
}

/**
 * Sort recommendations by impact (desc), then priority weight (desc).
 * @param {object[]} recommendations
 * @returns {object[]}
 */
function sortByImpact(recommendations) {
  const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };

  return [...recommendations].sort((a, b) => {
    if (b.impact !== a.impact) return b.impact - a.impact;
    return (priorityWeight[b.priority] ?? 0) - (priorityWeight[a.priority] ?? 0);
  });
}

/**
 * Derive top priority action titles from warnings and recommendations.
 * @param {string[]} warnings
 * @param {object[]} recommendations
 * @returns {string[]}
 */
function buildPriorities(warnings, recommendations) {
  const priorities = [];

  // Surface critical/high-impact recommendation titles first
  for (const rec of recommendations) {
    if (rec.priority === "critical" || rec.impact >= IMPACT.VERY_HIGH) {
      priorities.push(rec.title);
    }
  }

  // Add warning themes not already covered by recommendation titles
  const warningKeywords = [
    { match: /smok/i, label: "Quit smoking immediately" },
    { match: /alcohol/i, label: "Reduce alcohol consumption" },
    { match: /sleep/i, label: "Improve sleep duration and quality" },
    { match: /stress/i, label: "Manage chronic stress" },
    { match: /movement|steps|sedentary/i, label: "Increase daily physical activity" },
    { match: /hydration/i, label: "Increase daily water intake" },
    { match: /diet/i, label: "Improve diet quality" },
  ];

  for (const warning of warnings) {
    for (const { match, label } of warningKeywords) {
      if (match.test(warning) && !priorities.includes(label)) {
        priorities.push(label);
      }
    }
  }

  return priorities.slice(0, 5);
}

/**
 * Run registered extension rules for biomarkers and wearables.
 * @param {object} context
 * @returns {object[]}
 */
function runExtensionRules(context) {
  const { biomarkers = {}, wearableData = {} } = context;
  const extensionRecs = [];

  for (const rule of biomarkerRules) {
    const results = rule(biomarkers, context);
    if (Array.isArray(results)) extensionRecs.push(...results);
  }

  for (const rule of wearableRules) {
    const results = rule(wearableData, context);
    if (Array.isArray(results)) extensionRecs.push(...results);
  }

  return extensionRecs;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Generate personalized longevity recommendations.
 *
 * @param {string[]} answers - Quiz answer array (see ANSWER_INDEX)
 * @param {object|object[]} healthDomains - Domain scores (0–100) as a map or array
 * @param {number|object} biologicalAge - Biological age value or { value, chronologicalAge }
 * @param {object} [extensions] - Optional future data sources
 * @param {object} [extensions.biomarkers] - Blood biomarker values (e.g. { hba1c, ldl })
 * @param {object} [extensions.wearableData] - Wearable metrics (e.g. { avgHrv, restingHr })
 * @returns {{
 *   priorities: string[],
 *   recommendations: object[],
 *   strengths: string[],
 *   warnings: string[]
 * }}
 */
export function generateRecommendations(
  answers,
  healthDomains,
  biologicalAge,
  extensions = {}
) {
  recommendationCounter = 0;

  const domains = normalizeHealthDomains(healthDomains);
  const ageInfo = normalizeBiologicalAge(biologicalAge);

  const context = {
    answers,
    healthDomains: domains,
    biologicalAge: ageInfo,
    biomarkers: extensions.biomarkers ?? {},
    wearableData: extensions.wearableData ?? {},
  };

  // --- Collect all recommendation sources ---
  const domainRecs = buildDomainRecommendations(domains);
  const answerRecs = buildAnswerRecommendations(answers);
  const ageRec = buildBiologicalAgeRecommendation(ageInfo);
  const extensionRecs = runExtensionRules(context);

  const allRecommendations = sortByImpact(
    mergeRecommendations(
      domainRecs,
      answerRecs,
      ageRec ? [ageRec] : [],
      extensionRecs
    )
  );

  // Fallback when the user is already in excellent shape
  if (allRecommendations.length === 0) {
    allRecommendations.push(
      createRecommendation({
        id: "rec-maintain",
        category: "longevity",
        title: "Maintain Your Healthy Lifestyle",
        description:
          "Your current habits are strong. Continue regular exercise, annual biomarker monitoring, and consistent sleep to preserve your longevity advantage.",
        impact: IMPACT.MINIMAL,
        priority: "low",
        icon: "Shield",
      })
    );
  }

  // --- Strengths from domains and answers ---
  const domainStrengths = identifyDomainStrengths(domains);
  const answerStrengths = identifyAnswerStrengths(answers);
  const strengths = [...new Set([...domainStrengths, ...answerStrengths])];

  if (strengths.length === 0) {
    strengths.push("Significant improvement potential across multiple health domains");
  }

  // --- Warnings from lifestyle risk factors ---
  const warnings = detectWarnings(answers);

  // --- Top priorities ranked by expected health impact ---
  const priorities = buildPriorities(warnings, allRecommendations);

  return {
    priorities,
    recommendations: allRecommendations,
    strengths,
    warnings,
  };
}
