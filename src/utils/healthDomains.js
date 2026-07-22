/**
 * Health domain scores derived from the longevity quiz answers array.
 *
 * Answer indices (matches questions in App.jsx):
 * 0 — Sleep hours        ["<5", "5-6", "7-8", "8+"]
 * 1 — Exercise days/week ["0", "1-2", "3-4", "5+"]
 * 2 — Stress level       ["High", "Moderate", "Low"]
 * 3 — Daily energy       ["Poor", "Average", "Excellent"]
 * 4 — Diet quality       ["Poor", "Average", "Excellent"]
 * 5 — Water intake       ["<1L", "1-2L", "2-3L", "3L+"]
 * 6 — Smoking            ["Yes", "Occasionally", "No"]
 * 7 — Alcohol frequency  ["Frequently", "Occasionally", "Never"]
 * 8 — Daily steps        ["<3000", "3000-7000", "7000-10000", "10000+"]
 * 9 — Strength training  ["Never", "1-2x", "3-4x", "5+"]
 */

const clamp = (value, min = 0, max = 100) =>
    Math.min(max, Math.max(min, value));
  
  const scoreFromMap = (answer, map, fallback = 50) =>
    answer != null && map[answer] != null ? map[answer] : fallback;
  
  const averageScores = (scores) => {
    const valid = scores.filter((score) => score != null);
    if (valid.length === 0) return 50;
    return Math.round(valid.reduce((sum, score) => sum + score, 0) / valid.length);
  };
  
  const weightedAverage = (items) => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight === 0) return 50;
  
    const weightedSum = items.reduce(
      (sum, item) => sum + item.score * item.weight,
      0
    );
  
    return clamp(Math.round(weightedSum / totalWeight));
  };
  
  const SLEEP_HOURS = {
    "<5": 20,
    "5-6": 55,
    "7-8": 100,
    "8+": 90,
  };
  
  const EXERCISE_DAYS = {
    "0": 15,
    "1-2": 45,
    "3-4": 80,
    "5+": 100,
  };
  
  const STRESS = {
    High: 20,
    Moderate: 60,
    Low: 100,
  };
  
  const ENERGY = {
    Poor: 25,
    Average: 65,
    Excellent: 100,
  };
  
  const DIET = {
    Poor: 25,
    Average: 65,
    Excellent: 100,
  };
  
  const WATER = {
    "<1L": 30,
    "1-2L": 60,
    "2-3L": 85,
    "3L+": 100,
  };
  
  const SMOKING = {
    Yes: 10,
    Occasionally: 45,
    No: 100,
  };
  
  const ALCOHOL = {
    Frequently: 25,
    Occasionally: 65,
    Never: 100,
  };
  
  const STEPS = {
    "<3000": 20,
    "3000-7000": 55,
    "7000-10000": 80,
    "10000+": 100,
  };
  
  const STRENGTH = {
    Never: 20,
    "1-2x": 60,
    "3-4x": 90,
    "5+": 100,
  };
  
  const calculateSleepScore = (answers) => {
    // Sleep duration is the primary driver; daily energy reflects sleep quality.
    return weightedAverage([
      {
        score: scoreFromMap(answers[0], SLEEP_HOURS),
        weight: 3,
      },
      {
        score: scoreFromMap(answers[3], ENERGY),
        weight: 1,
      },
    ]);
  };
  
  const calculateHeartScore = (answers) => {
    // Cardiovascular health: activity, smoking, alcohol, stress, and daily movement.
    return weightedAverage([
      {
        score: scoreFromMap(answers[1], EXERCISE_DAYS),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[6], SMOKING),
        weight: 3,
      },
      {
        score: scoreFromMap(answers[7], ALCOHOL),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[8], STEPS),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[2], STRESS),
        weight: 1,
      },
    ]);
  };
  
  const calculateBrainScore = (answers) => {
    // Cognitive resilience: sleep, stress, energy, and alcohol impact mental clarity.
    return averageScores([
      scoreFromMap(answers[0], SLEEP_HOURS),
      scoreFromMap(answers[2], STRESS),
      scoreFromMap(answers[3], ENERGY),
      scoreFromMap(answers[7], ALCOHOL),
    ]);
  };
  
  const calculateMetabolismScore = (answers) => {
    // Metabolic health: diet, hydration, energy, and lifestyle toxins.
    return weightedAverage([
      {
        score: scoreFromMap(answers[4], DIET),
        weight: 3,
      },
      {
        score: scoreFromMap(answers[5], WATER),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[3], ENERGY),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[6], SMOKING),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[7], ALCOHOL),
        weight: 1,
      },
    ]);
  };
  
  const calculateFitnessScore = (answers) => {
    // Physical capacity: weekly exercise, daily steps, and strength training.
    return weightedAverage([
      {
        score: scoreFromMap(answers[1], EXERCISE_DAYS),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[8], STEPS),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[9], STRENGTH),
        weight: 3,
      },
    ]);
  };
  
  const calculateRecoveryScore = (answers) => {
    // Recovery capacity: rest, stress management, hydration, and training balance.
    return weightedAverage([
      {
        score: scoreFromMap(answers[0], SLEEP_HOURS),
        weight: 3,
      },
      {
        score: scoreFromMap(answers[2], STRESS),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[5], WATER),
        weight: 1,
      },
      {
        score: scoreFromMap(answers[3], ENERGY),
        weight: 2,
      },
      {
        score: scoreFromMap(answers[9], STRENGTH),
        weight: 1,
      },
    ]);
  };
  
  export function calculateHealthDomains(answers) {
    return {
      sleep: calculateSleepScore(answers),
      heart: calculateHeartScore(answers),
      brain: calculateBrainScore(answers),
      metabolism: calculateMetabolismScore(answers),
      fitness: calculateFitnessScore(answers),
      recovery: calculateRecoveryScore(answers),
    };
  }