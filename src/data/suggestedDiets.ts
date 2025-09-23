// import { SuggestedDiet } from '@/types/diet';
// import type { Region } from '@/contexts/RegionContext';
// import ketoImage from '@/assets/keto-diet.jpg';
// import veganImage from '@/assets/vegan-diet.jpg';
// import highProteinImage from '@/assets/high-protein-diet.jpg';
// import paleoImage from '@/assets/paleo-diet.jpg';
// import mediterraneanImage from '@/assets/mediterranean-diet.jpg';
// import intermittentFastingImage from '@/assets/intermittent-fasting.jpg';
// import dashDietImage from '@/assets/dash-diet.jpg';
// import flexitarianImage from '@/assets/flexitarian-diet.jpg';
// import lowCarbImage from '@/assets/low-carb-diet.jpg';

// export const suggestedDiets: SuggestedDiet[] = [
//   {
//     id: 'keto',
//     name: 'Ketogenic Diet',
//     description: 'High-fat, low-carb approach that puts your body in ketosis for rapid fat burning and sustained energy.',
//     image: ketoImage,
//     benefits: ['Rapid Fat Loss', 'Mental Clarity', 'Stable Energy', 'Appetite Control'],
//     dietType: 'keto',
//     estimatedCalories: '1,200-2,000',
//     regions: ['global', 'american', 'european'] as Region[],
//   },
//   {
//     id: 'vegan',
//     name: 'Plant-Based Vegan',
//     description: 'Complete plant-based nutrition focusing on whole foods, legumes, and nutrient-dense vegetables.',
//     image: veganImage,
//     benefits: ['Heart Health', 'Environmental Impact', 'High Fiber', 'Anti-inflammatory'],
//     dietType: 'vegan',
//     estimatedCalories: '1,400-2,200',
//     regions: ['global', 'asian', 'mediterranean', 'indian'] as Region[],
//   },
//   {
//     id: 'high-protein',
//     name: 'High Protein',
//     description: 'Muscle-building focused diet with optimal protein intake for strength training and body composition.',
//     image: highProteinImage,
//     benefits: ['Muscle Growth', 'Satiety', 'Metabolism Boost', 'Recovery'],
//     dietType: 'high_protein',
//     estimatedCalories: '1,600-2,400',
//     regions: ['global', 'american', 'european'] as Region[],
//   },
//   {
//     id: 'paleo',
//     name: 'Paleo Lifestyle',
//     description: 'Ancestral eating pattern focusing on whole, unprocessed foods like our hunter-gatherer ancestors.',
//     image: paleoImage,
//     benefits: ['Reduced Inflammation', 'Better Digestion', 'Stable Blood Sugar', 'Natural Foods'],
//     dietType: 'paleo',
//     estimatedCalories: '1,500-2,300',
//     regions: ['global', 'american', 'european'] as Region[],
//   },
//   {
//     id: 'mediterranean',
//     name: 'Mediterranean',
//     description: 'Heart-healthy approach inspired by traditional Mediterranean cuisine with olive oil and fresh ingredients.',
//     image: mediterraneanImage,
//     benefits: ['Heart Health', 'Longevity', 'Brain Function', 'Balanced Approach'],
//     dietType: 'mediterranean',
//     estimatedCalories: '1,500-2,200',
//     regions: ['mediterranean', 'european', 'middle_eastern'] as Region[],
//   },
//   {
//     id: 'intermittent-fasting',
//     name: 'Intermittent Fasting',
//     description: 'Time-restricted eating approach that cycles between periods of fasting and eating for metabolic benefits.',
//     image: intermittentFastingImage,
//     benefits: ['Weight Loss', 'Metabolic Health', 'Cellular Repair', 'Longevity'],
//     dietType: 'intermittent_fasting',
//     estimatedCalories: '1,200-2,000',
//     regions: ['global', 'american', 'european', 'asian'] as Region[],
//   },
//   {
//     id: 'dash',
//     name: 'DASH Diet',
//     description: 'Dietary Approaches to Stop Hypertension - scientifically proven to lower blood pressure and improve health.',
//     image: dashDietImage,
//     benefits: ['Heart Health', 'Lower Blood Pressure', 'Nutrient Rich', 'Sustainable'],
//     dietType: 'dash',
//     estimatedCalories: '1,600-2,300',
//     regions: ['global', 'american', 'european'] as Region[],
//   },
//   {
//     id: 'flexitarian',
//     name: 'Flexitarian',
//     description: 'Flexible vegetarian approach that emphasizes plant foods while allowing occasional meat consumption.',
//     image: flexitarianImage,
//     benefits: ['Plant Focus', 'Flexibility', 'Environmental', 'Heart Health'],
//     dietType: 'flexitarian',
//     estimatedCalories: '1,400-2,100',
//     regions: ['global', 'american', 'european', 'asian'] as Region[],
//   },
//   {
//     id: 'low-carb',
//     name: 'Low Carb',
//     description: 'Reduced carbohydrate intake focusing on proteins and healthy fats for steady weight loss.',
//     image: lowCarbImage,
//     benefits: ['Weight Loss', 'Blood Sugar Control', 'Appetite Control', 'Energy Stable'],
//     dietType: 'low_carb',
//     estimatedCalories: '1,300-2,000',
//     regions: ['global', 'american', 'european'] as Region[],
//   },
// ];

// // Filter function for diets by region
// export const getFilteredDiets = (region: Region): SuggestedDiet[] => {
//   if (region === 'global') {
//     return suggestedDiets;
//   }
//   return suggestedDiets.filter(diet => diet.regions.includes(region));
// };

// export const dietTypeDetails = {
//   keto: {
//     macros: { protein: 25, carbs: 5, fat: 70 },
//     description: 'Ultra low-carb, high-fat diet designed to induce ketosis',
//     restrictions: ['Grains', 'Sugar', 'Most fruits', 'Starchy vegetables']
//   },
//   vegan: {
//     macros: { protein: 15, carbs: 65, fat: 20 },
//     description: 'Plant-based diet excluding all animal products',
//     restrictions: ['Meat', 'Dairy', 'Eggs', 'Honey', 'Animal-derived ingredients']
//   },
//   high_protein: {
//     macros: { protein: 35, carbs: 35, fat: 30 },
//     description: 'Increased protein intake for muscle building and satiety',
//     restrictions: ['Processed foods', 'Excessive refined carbs']
//   },
//   paleo: {
//     macros: { protein: 25, carbs: 35, fat: 40 },
//     description: 'Foods available to paleolithic humans',
//     restrictions: ['Grains', 'Legumes', 'Dairy', 'Processed foods', 'Refined sugar']
//   },
//   mediterranean: {
//     macros: { protein: 20, carbs: 45, fat: 35 },
//     description: 'Traditional Mediterranean eating patterns',
//     restrictions: ['Processed foods', 'Excessive red meat', 'Refined sugars']
//   },
//   intermittent_fasting: {
//     macros: { protein: 25, carbs: 40, fat: 35 },
//     description: 'Time-restricted eating with balanced nutrition',
//     restrictions: ['Eating during fasting windows', 'Processed foods', 'Sugary snacks']
//   },
//   dash: {
//     macros: { protein: 20, carbs: 50, fat: 30 },
//     description: 'Heart-healthy, nutrient-dense approach',
//     restrictions: ['High sodium foods', 'Processed meats', 'Excessive sweets']
//   },
//   flexitarian: {
//     macros: { protein: 18, carbs: 55, fat: 27 },
//     description: 'Mostly plant-based with occasional animal products',
//     restrictions: ['Excessive meat', 'Processed foods', 'Refined sugars']
//   },
//   low_carb: {
//     macros: { protein: 30, carbs: 20, fat: 50 },
//     description: 'Reduced carbohydrate intake for metabolic benefits',
//     restrictions: ['Grains', 'Sugar', 'Starchy vegetables', 'Most fruits']
//   }
// };

import { SuggestedDiet } from "@/types/diet";
import type { Region } from "@/contexts/RegionContext";
import ketoImage from "@/assets/keto-diet.jpg";
import veganImage from "@/assets/vegan-diet.jpg";
import highProteinImage from "@/assets/high-protein-diet.jpg";
import paleoImage from "@/assets/paleo-diet.jpg";
import mediterraneanImage from "@/assets/mediterranean-diet.jpg";
import intermittentFastingImage from "@/assets/intermittent-fasting.jpg";
import dashDietImage from "@/assets/dash-diet.jpg";
import flexitarianImage from "@/assets/flexitarian-diet.jpg";
import lowCarbImage from "@/assets/low-carb-diet.jpg";

export const suggestedDiets: SuggestedDiet[] = [
  {
    id: "keto",
    name: "Ketogenic Diet",
    description:
      "High-fat, low-carb approach that puts your body in ketosis for rapid fat burning and sustained energy.",
    image: ketoImage,
    benefits: [
      "Rapid Fat Loss",
      "Mental Clarity",
      "Stable Energy",
      "Appetite Control",
    ],
    dietType: "keto",
    estimatedCalories: "1,200-2,000",
    regions: ["global", "american", "european", "nordic"] as Region[],
  },
  {
    id: "vegan",
    name: "Plant-Based Vegan",
    description:
      "Complete plant-based nutrition focusing on whole foods, legumes, and nutrient-dense vegetables.",
    image: veganImage,
    benefits: [
      "Heart Health",
      "Environmental Impact",
      "High Fiber",
      "Anti-inflammatory",
    ],
    dietType: "vegan",
    estimatedCalories: "1,400-2,200",
    regions: [
      "global",
      "asian",
      "mediterranean",
      "indian",
      "south_asian",
    ] as Region[],
  },
  {
    id: "high-protein",
    name: "High Protein",
    description:
      "Muscle-building focused diet with optimal protein intake for strength training and body composition.",
    image: highProteinImage,
    benefits: ["Muscle Growth", "Satiety", "Metabolism Boost", "Recovery"],
    dietType: "high_protein",
    estimatedCalories: "1,600-2,400",
    regions: ["global", "american", "european", "oceanian"] as Region[],
  },
  {
    id: "paleo",
    name: "Paleo Lifestyle",
    description:
      "Ancestral eating pattern focusing on whole, unprocessed foods like our hunter-gatherer ancestors.",
    image: paleoImage,
    benefits: [
      "Reduced Inflammation",
      "Better Digestion",
      "Stable Blood Sugar",
      "Natural Foods",
    ],
    dietType: "paleo",
    estimatedCalories: "1,500-2,300",
    regions: ["global", "american", "european", "oceanian"] as Region[],
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    description:
      "Heart-healthy approach inspired by traditional Mediterranean cuisine with olive oil and fresh ingredients.",
    image: mediterraneanImage,
    benefits: [
      "Heart Health",
      "Longevity",
      "Brain Function",
      "Balanced Approach",
    ],
    dietType: "mediterranean",
    estimatedCalories: "1,500-2,200",
    regions: ["mediterranean", "european", "middle_eastern"] as Region[],
  },
  {
    id: "intermittent-fasting",
    name: "Intermittent Fasting",
    description:
      "Time-restricted eating approach that cycles between periods of fasting and eating for metabolic benefits.",
    image: intermittentFastingImage,
    benefits: [
      "Weight Loss",
      "Metabolic Health",
      "Cellular Repair",
      "Longevity",
    ],
    dietType: "intermittent_fasting",
    estimatedCalories: "1,200-2,000",
    regions: [
      "global",
      "american",
      "european",
      "asian",
      "middle_eastern",
    ] as Region[],
  },
  {
    id: "dash",
    name: "DASH Diet",
    description:
      "Dietary Approaches to Stop Hypertension - scientifically proven to lower blood pressure and improve health.",
    image: dashDietImage,
    benefits: [
      "Heart Health",
      "Lower Blood Pressure",
      "Nutrient Rich",
      "Sustainable",
    ],
    dietType: "dash",
    estimatedCalories: "1,600-2,300",
    regions: ["global", "american", "european"] as Region[],
  },
  {
    id: "flexitarian",
    name: "Flexitarian",
    description:
      "Flexible vegetarian approach that emphasizes plant foods while allowing occasional meat consumption.",
    image: flexitarianImage,
    benefits: ["Plant Focus", "Flexibility", "Environmental", "Heart Health"],
    dietType: "flexitarian",
    estimatedCalories: "1,400-2,100",
    regions: ["global", "american", "european", "asian"] as Region[],
  },
  {
    id: "low-carb",
    name: "Low Carb",
    description:
      "Reduced carbohydrate intake focusing on proteins and healthy fats for steady weight loss.",
    image: lowCarbImage,
    benefits: [
      "Weight Loss",
      "Blood Sugar Control",
      "Appetite Control",
      "Energy Stable",
    ],
    dietType: "low_carb",
    estimatedCalories: "1,300-2,000",
    regions: ["global", "american", "european"] as Region[],
  },
  // Additional region-specific diets
  {
    id: "ayurvedic",
    name: "Ayurvedic Diet",
    description:
      "Ancient Indian wellness approach balancing mind, body, and spirit through mindful eating and seasonal foods.",
    image: veganImage, // Fallback image
    benefits: [
      "Digestive Health",
      "Mind-Body Balance",
      "Seasonal Eating",
      "Holistic Wellness",
    ],
    dietType: "ayurvedic",
    estimatedCalories: "1,400-2,000",
    regions: ["indian", "south_asian"] as Region[],
  },
  {
    id: "middle-eastern",
    name: "Middle Eastern Diet",
    description:
      "Rich in legumes, whole grains, olive oil, and aromatic spices from the fertile crescent region.",
    image: mediterraneanImage, // Fallback image
    benefits: [
      "Heart Healthy",
      "Rich in Fiber",
      "Anti-inflammatory Spices",
      "Balanced Nutrition",
    ],
    dietType: "middle_eastern",
    estimatedCalories: "1,500-2,200",
    regions: ["middle_eastern", "mediterranean"] as Region[],
  },
  {
    id: "nordic",
    name: "Nordic Diet",
    description:
      "Scandinavian-inspired eating focusing on seasonal, local ingredients like fish, berries, and whole grains.",
    image: dashDietImage, // Fallback image
    benefits: [
      "Omega-3 Rich",
      "Seasonal Eating",
      "Sustainable",
      "Heart Health",
    ],
    dietType: "nordic",
    estimatedCalories: "1,600-2,300",
    regions: ["nordic", "european"] as Region[],
  },
  {
    id: "traditional-asian",
    name: "Traditional Asian Diet",
    description:
      "Plant-forward diet emphasizing rice, vegetables, legumes, and moderate amounts of fish and meat.",
    image: veganImage, // Fallback image
    benefits: [
      "Longevity",
      "Heart Health",
      "Low Processed Foods",
      "Balanced Macros",
    ],
    dietType: "traditional_asian",
    estimatedCalories: "1,400-2,100",
    regions: ["asian", "east_asian"] as Region[],
  },
  {
    id: "african-heritage",
    name: "African Heritage Diet",
    description:
      "Traditional African foods rich in vegetables, fruits, whole grains, and lean proteins.",
    image: flexitarianImage, // Fallback image
    benefits: [
      "Nutrient Dense",
      "High Fiber",
      "Plant-Rich",
      "Cultural Connection",
    ],
    dietType: "african_heritage",
    estimatedCalories: "1,500-2,200",
    regions: ["african"] as Region[],
  },
  {
    id: "caribbean",
    name: "Caribbean Diet",
    description:
      "Tropical approach featuring fresh fruits, vegetables, seafood, and vibrant spices.",
    image: flexitarianImage, // Fallback image
    benefits: [
      "Fresh Ingredients",
      "Seafood Rich",
      "Antioxidant Rich",
      "Flavorful",
    ],
    dietType: "caribbean",
    estimatedCalories: "1,400-2,000",
    regions: ["caribbean"] as Region[],
  },
  {
    id: "latin-american",
    name: "Latin American Diet",
    description:
      "Diverse regional cuisines emphasizing beans, corn, quinoa, and fresh vegetables.",
    image: flexitarianImage, // Fallback image
    benefits: [
      "High Fiber",
      "Plant Proteins",
      "Antioxidants",
      "Cultural Diversity",
    ],
    dietType: "latin_american",
    estimatedCalories: "1,500-2,300",
    regions: ["latin_american"] as Region[],
  },
];

// Filter function for diets by region
export const getFilteredDiets = (region: Region): SuggestedDiet[] => {
  if (region === "global") {
    return suggestedDiets;
  }
  return suggestedDiets.filter((diet) => diet.regions.includes(region));
};

export const dietTypeDetails = {
  keto: {
    macros: { protein: 25, carbs: 5, fat: 70 },
    description: "Ultra low-carb, high-fat diet designed to induce ketosis",
    restrictions: ["Grains", "Sugar", "Most fruits", "Starchy vegetables"],
  },
  vegan: {
    macros: { protein: 15, carbs: 65, fat: 20 },
    description: "Plant-based diet excluding all animal products",
    restrictions: [
      "Meat",
      "Dairy",
      "Eggs",
      "Honey",
      "Animal-derived ingredients",
    ],
  },
  high_protein: {
    macros: { protein: 35, carbs: 35, fat: 30 },
    description: "Increased protein intake for muscle building and satiety",
    restrictions: ["Processed foods", "Excessive refined carbs"],
  },
  paleo: {
    macros: { protein: 25, carbs: 35, fat: 40 },
    description: "Foods available to paleolithic humans",
    restrictions: [
      "Grains",
      "Legumes",
      "Dairy",
      "Processed foods",
      "Refined sugar",
    ],
  },
  mediterranean: {
    macros: { protein: 20, carbs: 45, fat: 35 },
    description: "Traditional Mediterranean eating patterns",
    restrictions: ["Processed foods", "Excessive red meat", "Refined sugars"],
  },
  intermittent_fasting: {
    macros: { protein: 25, carbs: 40, fat: 35 },
    description: "Time-restricted eating with balanced nutrition",
    restrictions: [
      "Eating during fasting windows",
      "Processed foods",
      "Sugary snacks",
    ],
  },
  dash: {
    macros: { protein: 20, carbs: 50, fat: 30 },
    description: "Heart-healthy, nutrient-dense approach",
    restrictions: ["High sodium foods", "Processed meats", "Excessive sweets"],
  },
  flexitarian: {
    macros: { protein: 18, carbs: 55, fat: 27 },
    description: "Mostly plant-based with occasional animal products",
    restrictions: ["Excessive meat", "Processed foods", "Refined sugars"],
  },
  low_carb: {
    macros: { protein: 30, carbs: 20, fat: 50 },
    description: "Reduced carbohydrate intake for metabolic benefits",
    restrictions: ["Grains", "Sugar", "Starchy vegetables", "Most fruits"],
  },
  ayurvedic: {
    macros: { protein: 20, carbs: 50, fat: 30 },
    description: "Ancient Indian wellness approach balancing doshas",
    restrictions: [
      "Processed foods",
      "Cold foods (seasonal)",
      "Incompatible food combinations",
    ],
  },
  middle_eastern: {
    macros: { protein: 22, carbs: 48, fat: 30 },
    description: "Rich in legumes, whole grains, and healthy fats",
    restrictions: ["Processed foods", "Excessive refined sugars", "Alcohol"],
  },
  nordic: {
    macros: { protein: 25, carbs: 45, fat: 30 },
    description: "Seasonal, local, and sustainable Nordic ingredients",
    restrictions: [
      "Non-seasonal foods",
      "Processed foods",
      "Excessive red meat",
    ],
  },
  traditional_asian: {
    macros: { protein: 18, carbs: 60, fat: 22 },
    description:
      "Traditional Asian eating patterns emphasizing rice and vegetables",
    restrictions: ["Excessive dairy", "Processed foods", "Large meat portions"],
  },
  african_heritage: {
    macros: { protein: 20, carbs: 55, fat: 25 },
    description: "Traditional African foods rich in plants and whole grains",
    restrictions: [
      "Processed foods",
      "Refined sugars",
      "Excessive animal products",
    ],
  },
  caribbean: {
    macros: { protein: 22, carbs: 50, fat: 28 },
    description: "Tropical foods with emphasis on seafood and fresh produce",
    restrictions: [
      "Processed foods",
      "Excessive refined sugars",
      "Heavy fried foods",
    ],
  },
  latin_american: {
    macros: { protein: 20, carbs: 52, fat: 28 },
    description: "Diverse regional cuisines emphasizing beans and whole grains",
    restrictions: [
      "Processed foods",
      "Excessive refined foods",
      "High sodium processed meats",
    ],
  },
};
