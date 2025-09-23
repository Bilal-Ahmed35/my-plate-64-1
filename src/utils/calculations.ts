import { UserProfile } from '@/types/diet';

export function calculateTDEE(profile: UserProfile): number {
  // Convert height to cm if in feet
  let heightCm = profile.height.value;
  if (profile.height.unit === 'ft') {
    heightCm = profile.height.value * 30.48 + (profile.height.inches || 0) * 2.54;
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr: number;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * heightCm - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * heightCm - 5 * profile.age - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    active: 1.55,
    very_active: 1.725,
  };

  const tdee = bmr * activityMultipliers[profile.activityLevel];

  // Adjust based on fitness goal
  switch (profile.fitnessGoal) {
    case 'lose_weight':
      return Math.round(tdee * 0.85); // 15% deficit
    case 'gain_muscle':
      return Math.round(tdee * 1.1); // 10% surplus
    default:
      return Math.round(tdee);
  }
}

export function getMacroDistribution(calories: number, dietType: string) {
  let proteinPercent: number, carbPercent: number, fatPercent: number;

  switch (dietType) {
    case 'keto':
      proteinPercent = 0.25;
      carbPercent = 0.05;
      fatPercent = 0.7;
      break;
    case 'high_protein':
      proteinPercent = 0.35;
      carbPercent = 0.35;
      fatPercent = 0.3;
      break;
    case 'mediterranean':
    case 'balanced':
      proteinPercent = 0.25;
      carbPercent = 0.45;
      fatPercent = 0.3;
      break;
    default:
      proteinPercent = 0.2;
      carbPercent = 0.5;
      fatPercent = 0.3;
  }

  return {
    protein: Math.round((calories * proteinPercent) / 4), // 4 calories per gram
    carbs: Math.round((calories * carbPercent) / 4),
    fat: Math.round((calories * fatPercent) / 9), // 9 calories per gram
  };
}