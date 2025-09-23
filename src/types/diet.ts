export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: {
    value: number;
    unit: 'cm' | 'ft';
    inches?: number; // for feet & inches
  };
  weight: number; // in kg
  activityLevel: 'sedentary' | 'lightly_active' | 'active' | 'very_active';
  fitnessGoal: 'lose_weight' | 'maintain' | 'gain_muscle';
  dietPreference: 'keto' | 'vegan' | 'paleo' | 'vegetarian' | 'high_protein' | 'mediterranean' | 'balanced';
  regions: string[];
  allergies: string[];
}

export interface UserProfileForm {
  age: number;
  gender?: 'male' | 'female' | 'other';
  height: {
    value: number;
    unit: 'cm' | 'ft';
    inches?: number;
  };
  weight: number;
  activityLevel?: 'sedentary' | 'lightly_active' | 'active' | 'very_active';
  fitnessGoal?: 'lose_weight' | 'maintain' | 'gain_muscle';
  dietPreference?: 'keto' | 'vegan' | 'paleo' | 'vegetarian' | 'high_protein' | 'mediterranean' | 'balanced';
  regions: string[];
  allergies: string[];
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  nutrition: NutritionalInfo;
  instructions?: string;
  ingredients?: string[];
}

export interface Meal {
  id: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
  portion: number;
}

export interface DietPlan {
  id: string;
  name: string;
  description: string;
  image: string;
  totalCalories: number;
  totalNutrition: NutritionalInfo;
  meals: Meal[];
  dietType: string;
}

export interface SuggestedDiet {
  id: string;
  name: string;
  description: string;
  image: string;
  benefits: string[];
  dietType: string;
  estimatedCalories: string;
  regions: string[];
}