import { Region, formatCuisineForAPI } from "@/contexts/RegionContext";
import { Language } from "@/contexts/LanguageContext";
import {
  translationService,
  translateRecipe,
  translateDiet,
  TranslatableRecipe,
  TranslatableDiet,
} from "@/services/TranslationService";
import { FallbackRecipesService } from "@/services/FallbackRecipesService";

// Enhanced Spoonacular API service with fallback support
export class SpoonacularAPIService {
  private static instance: SpoonacularAPIService;
  private readonly apiKey: string;
  private readonly baseURL = "https://api.spoonacular.com";
  private apiAvailable: boolean | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    if (!this.apiKey || this.apiKey === "your-spoonacular-api-key") {
      console.warn(
        "⚠️ Spoonacular API key not found or is placeholder. Using fallback service."
      );
      this.apiAvailable = false;
    }
  }

  static getInstance(): SpoonacularAPIService {
    if (!SpoonacularAPIService.instance) {
      SpoonacularAPIService.instance = new SpoonacularAPIService();
    }
    return SpoonacularAPIService.instance;
  }

  private async checkApiAvailability(): Promise<boolean> {
    if (this.apiAvailable !== null) {
      return this.apiAvailable;
    }

    if (!this.apiKey || this.apiKey === "your-spoonacular-api-key") {
      this.apiAvailable = false;
      return false;
    }

    try {
      // Test with a simple API call
      const url = new URL(`${this.baseURL}/recipes/random`);
      url.searchParams.append("apiKey", this.apiKey);
      url.searchParams.append("number", "1");

      const response = await fetch(url.toString());
      this.apiAvailable = response.ok;

      if (!response.ok) {
        console.warn(
          `🔑 Spoonacular API test failed: ${response.status} ${response.statusText}`
        );
        if (response.status === 401) {
          console.warn(
            "❌ Invalid API key or quota exceeded. Using fallback service."
          );
        }
      }

      return this.apiAvailable;
    } catch (error) {
      console.error("🌐 Network error testing Spoonacular API:", error);
      this.apiAvailable = false;
      return false;
    }
  }

  private async makeAPICall(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<any> {
    const isAvailable = await this.checkApiAvailability();

    if (!isAvailable) {
      throw new Error("Spoonacular API not available");
    }

    const url = new URL(`${this.baseURL}${endpoint}`);

    // Add API key and parameters
    url.searchParams.append("apiKey", this.apiKey);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        // If we get a 401, mark API as unavailable
        if (response.status === 401) {
          this.apiAvailable = false;
        }
        throw new Error(
          `Spoonacular API error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Spoonacular API call failed:", error);
      throw error;
    }
  }

  // Search recipes with region filtering and translation
  async searchRecipes(
    query: string,
    region: Region = "global",
    language: Language = "en",
    options: {
      number?: number;
      diet?: string;
      intolerances?: string;
      type?: string;
      sort?: string;
    } = {}
  ): Promise<TranslatableRecipe[]> {
    try {
      const params: Record<string, string | number> = {
        query,
        number: options.number || 12,
        addRecipeInformation: "true",
        fillIngredients: "true",
        instructionsRequired: "true",
        ...options,
      };

      // Add cuisine filter based on region
      if (region !== "global") {
        const cuisineFilter = formatCuisineForAPI(region);
        if (cuisineFilter) {
          params.cuisine = cuisineFilter;
        }
      }

      const data = await this.makeAPICall("/recipes/complexSearch", params);
      const recipes: TranslatableRecipe[] = data.results.map((recipe: any) => ({
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        instructions:
          recipe.analyzedInstructions?.[0]?.steps?.map((step: any) => ({
            step: step.step,
          })) || [],
      }));

      // Translate recipes if language is not English
      if (language !== "en") {
        return Promise.all(
          recipes.map((recipe) => translateRecipe(recipe, language))
        );
      }

      return recipes;
    } catch (error) {
      console.warn(
        "🔄 Spoonacular search failed, using fallback:",
        error.message
      );
      return FallbackRecipesService.searchRecipes(
        query,
        region,
        language,
        options
      );
    }
  }

  // Get recipe details with translation
  async getRecipeDetails(
    recipeId: number,
    language: Language = "en"
  ): Promise<TranslatableRecipe | null> {
    try {
      const recipe = await this.makeAPICall(`/recipes/${recipeId}/information`);

      const recipeData: TranslatableRecipe = {
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        instructions:
          recipe.analyzedInstructions?.[0]?.steps?.map((step: any) => ({
            step: step.step,
          })) || [],
      };

      // Translate if language is not English
      if (language !== "en") {
        return translateRecipe(recipeData, language);
      }

      return recipeData;
    } catch (error) {
      console.warn(
        "🔄 Spoonacular recipe details failed, using fallback:",
        error.message
      );
      return FallbackRecipesService.getRecipeDetails(recipeId, language);
    }
  }

  // Get random recipes with region filtering and translation
  async getRandomRecipes(
    region: Region = "global",
    language: Language = "en",
    tags: string = "",
    number: number = 6
  ): Promise<TranslatableRecipe[]> {
    try {
      const params: Record<string, string | number> = {
        number,
        tags,
      };

      // Add cuisine tags based on region
      if (region !== "global") {
        const cuisineFilter = formatCuisineForAPI(region);
        if (cuisineFilter) {
          params.tags = tags ? `${tags},${cuisineFilter}` : cuisineFilter;
        }
      }

      const data = await this.makeAPICall("/recipes/random", params);
      const recipes: TranslatableRecipe[] = data.recipes.map((recipe: any) => ({
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        instructions:
          recipe.analyzedInstructions?.[0]?.steps?.map((step: any) => ({
            step: step.step,
          })) || [],
      }));

      // Translate recipes if language is not English
      if (language !== "en") {
        return Promise.all(
          recipes.map((recipe) => translateRecipe(recipe, language))
        );
      }

      return recipes;
    } catch (error) {
      console.warn(
        "🔄 Spoonacular random recipes failed, using fallback:",
        error.message
      );
      return FallbackRecipesService.getRandomRecipes(
        region,
        language,
        tags,
        number
      );
    }
  }

  // Get meal plan with region filtering and translation
  async generateMealPlan(
    targetCalories: number,
    diet: string,
    exclude: string = "",
    region: Region = "global",
    language: Language = "en",
    timeFrame: "day" | "week" = "day"
  ): Promise<any> {
    try {
      const params: Record<string, string | number> = {
        targetCalories,
        diet,
        timeFrame,
        exclude,
      };

      const mealPlan = await this.makeAPICall("/mealplanner/generate", params);

      // If we need to filter by region or translate, we'll need to fetch recipe details
      if (region !== "global" || language !== "en") {
        // Extract recipe IDs from meal plan
        const recipeIds: number[] = [];

        if (timeFrame === "day") {
          mealPlan.meals?.forEach((meal: any) => {
            if (meal.id) recipeIds.push(meal.id);
          });
        } else {
          Object.values(mealPlan.week).forEach((day: any) => {
            day.meals?.forEach((meal: any) => {
              if (meal.id) recipeIds.push(meal.id);
            });
          });
        }

        // Fetch and translate recipe details
        const translatedRecipes = await Promise.all(
          recipeIds.map((id) => this.getRecipeDetails(id, language))
        );

        // Update meal plan with translated data
        const recipeMap = new Map(
          translatedRecipes
            .filter(Boolean)
            .map((recipe) => [recipe!.id, recipe])
        );

        if (timeFrame === "day") {
          mealPlan.meals = mealPlan.meals?.map((meal: any) => ({
            ...meal,
            ...(recipeMap.has(meal.id) ? recipeMap.get(meal.id) : {}),
          }));
        } else {
          Object.keys(mealPlan.week).forEach((day) => {
            mealPlan.week[day].meals = mealPlan.week[day].meals?.map(
              (meal: any) => ({
                ...meal,
                ...(recipeMap.has(meal.id) ? recipeMap.get(meal.id) : {}),
              })
            );
          });
        }
      }

      return mealPlan;
    } catch (error) {
      console.warn(
        "🔄 Spoonacular meal plan failed, generating fallback meal plan:",
        error.message
      );

      // Generate a simple fallback meal plan
      const fallbackRecipes = await FallbackRecipesService.getRandomRecipes(
        region,
        language,
        "",
        3
      );

      return {
        meals: [
          { ...fallbackRecipes[0], id: fallbackRecipes[0]?.id },
          { ...fallbackRecipes[1], id: fallbackRecipes[1]?.id },
          { ...fallbackRecipes[2], id: fallbackRecipes[2]?.id },
        ],
        nutrients: {
          calories: targetCalories,
          protein: Math.round((targetCalories * 0.2) / 4),
          fat: Math.round((targetCalories * 0.3) / 9),
          carbohydrates: Math.round((targetCalories * 0.5) / 4),
        },
      };
    }
  }

  // Get nutrition information
  async getRecipeNutrition(recipeId: number): Promise<any> {
    try {
      return await this.makeAPICall(
        `/recipes/${recipeId}/nutritionWidget.json`
      );
    } catch (error) {
      console.warn(
        "🔄 Spoonacular nutrition failed, using fallback:",
        error.message
      );
      // Return mock nutrition data
      return {
        calories: "350",
        carbs: "45g",
        fat: "12g",
        protein: "25g",
        bad: [
          {
            title: "Saturated Fat",
            amount: "3g",
            percentOfDailyNeeds: 15,
          },
        ],
        good: [
          {
            title: "Protein",
            amount: "25g",
            percentOfDailyNeeds: 50,
          },
          {
            title: "Vitamin C",
            amount: "15mg",
            percentOfDailyNeeds: 25,
          },
        ],
      };
    }
  }

  // Search for recipes by nutrients
  async searchByNutrients(
    minCalories?: number,
    maxCalories?: number,
    minProtein?: number,
    maxProtein?: number,
    region: Region = "global",
    language: Language = "en",
    number: number = 10
  ): Promise<TranslatableRecipe[]> {
    try {
      const params: Record<string, string | number> = { number };

      if (minCalories !== undefined) params.minCalories = minCalories;
      if (maxCalories !== undefined) params.maxCalories = maxCalories;
      if (minProtein !== undefined) params.minProtein = minProtein;
      if (maxProtein !== undefined) params.maxProtein = maxProtein;

      // Add cuisine filter
      if (region !== "global") {
        const cuisineFilter = formatCuisineForAPI(region);
        if (cuisineFilter) {
          params.cuisine = cuisineFilter;
        }
      }

      const data = await this.makeAPICall("/recipes/findByNutrients", params);
      const recipes: TranslatableRecipe[] = data.map((recipe: any) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      }));

      // Get full details for each recipe and translate if needed
      const detailedRecipes = await Promise.all(
        recipes.map((recipe) => this.getRecipeDetails(recipe.id, language))
      );

      return detailedRecipes.filter(Boolean) as TranslatableRecipe[];
    } catch (error) {
      console.warn(
        "🔄 Spoonacular nutrient search failed, using fallback:",
        error.message
      );
      return FallbackRecipesService.getRandomRecipes(
        region,
        language,
        "",
        number
      );
    }
  }

  // Check if API is available
  async isApiAvailable(): Promise<boolean> {
    return await this.checkApiAvailability();
  }

  // Get API status for debugging
  getApiStatus(): {
    hasApiKey: boolean;
    apiKey?: string;
    isAvailable: boolean | null;
  } {
    return {
      hasApiKey: !!(this.apiKey && this.apiKey !== "your-spoonacular-api-key"),
      apiKey: this.apiKey ? `${this.apiKey.substring(0, 8)}...` : "Not set",
      isAvailable: this.apiAvailable,
    };
  }
}

// Singleton instance export
export const spoonacularAPI = SpoonacularAPIService.getInstance();
