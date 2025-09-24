// src/services/FallbackRecipesService.ts
// Fallback recipes service for when Spoonacular API is not available
import { Region } from "@/contexts/RegionContext";
import { Language } from "@/contexts/LanguageContext";
import {
  TranslatableRecipe,
  translateRecipe,
} from "@/services/TranslationService";

export class FallbackRecipesService {
  private static mockRecipes: TranslatableRecipe[] = [
    {
      id: 1001,
      title: "Mediterranean Quinoa Bowl",
      summary:
        "A nutritious bowl packed with fresh vegetables, quinoa, and Mediterranean flavors.",
      image: "/api/placeholder/400/300",
      readyInMinutes: 25,
      servings: 2,
      instructions: [
        { step: "Cook quinoa according to package instructions" },
        { step: "Chop vegetables and prepare dressing" },
        { step: "Combine all ingredients in a bowl and serve" },
      ],
    },
    {
      id: 1002,
      title: "Grilled Salmon with Asparagus",
      summary:
        "Fresh salmon fillet grilled to perfection with seasonal asparagus.",
      image: "/api/placeholder/400/300",
      readyInMinutes: 20,
      servings: 1,
      instructions: [
        { step: "Preheat grill to medium-high heat" },
        { step: "Season salmon with herbs and spices" },
        { step: "Grill salmon and asparagus until cooked" },
      ],
    },
    {
      id: 1003,
      title: "Vegetarian Stir-Fry",
      summary:
        "Colorful vegetable stir-fry with tofu and Asian-inspired sauce.",
      image: "/api/placeholder/400/300",
      readyInMinutes: 15,
      servings: 2,
      instructions: [
        { step: "Heat oil in wok or large pan" },
        { step: "Stir-fry vegetables and tofu" },
        { step: "Add sauce and serve over rice" },
      ],
    },
    {
      id: 1004,
      title: "Chicken Caesar Salad",
      summary:
        "Classic Caesar salad with grilled chicken breast and homemade dressing.",
      image: "/api/placeholder/400/300",
      readyInMinutes: 18,
      servings: 1,
      instructions: [
        { step: "Grill chicken breast until cooked through" },
        { step: "Prepare Caesar dressing" },
        { step: "Toss salad with dressing and top with chicken" },
      ],
    },
    {
      id: 1005,
      title: "Avocado Toast with Poached Egg",
      summary:
        "Nutritious breakfast with perfectly poached egg on avocado toast.",
      image: "/api/placeholder/400/300",
      readyInMinutes: 12,
      servings: 1,
      instructions: [
        { step: "Toast bread to desired doneness" },
        { step: "Poach egg in simmering water" },
        { step: "Mash avocado and assemble toast" },
      ],
    },
    {
      id: 1006,
      title: "Beef Stir-Fry with Broccoli",
      summary: "Tender beef strips with fresh broccoli in savory sauce.",
      image: "/api/placeholder/400/300",
      readyInMinutes: 22,
      servings: 2,
      instructions: [
        { step: "Slice beef into thin strips" },
        { step: "Stir-fry beef until browned" },
        { step: "Add broccoli and sauce, cook until tender" },
      ],
    },
  ];

  private static getRegionalRecipes(region: Region): TranslatableRecipe[] {
    // Define regional variations with unique IDs for each region
    const regionalVariations: Record<string, Partial<TranslatableRecipe>[]> = {
      global: this.mockRecipes,
      mediterranean: [
        {
          id: 2001, // Mediterranean starts at 2000
          title: "Greek Village Salad",
          summary:
            "Traditional Greek salad with feta cheese, olives, and fresh vegetables.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 10,
          servings: 2,
        },
        {
          id: 2002,
          title: "Mediterranean Herb-Crusted Fish",
          summary: "Fresh fish with Mediterranean herbs and olive oil.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 25,
          servings: 1,
        },
        {
          id: 2003,
          title: "Spanish Paella",
          summary: "Traditional Spanish rice dish with seafood and saffron.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 40,
          servings: 4,
        },
      ],
      asian: [
        {
          id: 3001, // Asian starts at 3000
          title: "Thai Green Curry",
          summary:
            "Authentic Thai green curry with vegetables and coconut milk.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 30,
          servings: 2,
        },
        {
          id: 3002,
          title: "Japanese Teriyaki Bowl",
          summary:
            "Rice bowl with teriyaki-glazed protein and steamed vegetables.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 20,
          servings: 1,
        },
        {
          id: 3003,
          title: "Korean Bibimbap",
          summary: "Mixed rice bowl with vegetables and spicy sauce.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 25,
          servings: 1,
        },
      ],
      european: [
        {
          id: 4001, // European starts at 4000
          title: "Italian Pasta Primavera",
          summary:
            "Fresh seasonal vegetables with perfectly cooked pasta and herbs.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 25,
          servings: 2,
        },
        {
          id: 4002,
          title: "French Ratatouille",
          summary: "Classic French vegetable stew with herbs and olive oil.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 45,
          servings: 3,
        },
        {
          id: 4003,
          title: "German Schnitzel",
          summary: "Crispy breaded cutlet served with lemon and herbs.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 30,
          servings: 1,
        },
      ],
      indian: [
        {
          id: 5001, // Indian starts at 5000
          title: "Chicken Tikka Masala",
          summary: "Creamy tomato-based curry with tender chicken pieces.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 35,
          servings: 2,
        },
        {
          id: 5002,
          title: "Vegetable Biryani",
          summary:
            "Fragrant rice dish with mixed vegetables and aromatic spices.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 45,
          servings: 3,
        },
        {
          id: 5003,
          title: "Dal Tadka",
          summary: "Spiced lentil curry with aromatic tempering.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 30,
          servings: 2,
        },
      ],
      american: [
        {
          id: 6001,
          title: "BBQ Pulled Pork Sandwich",
          summary: "Slow-cooked pulled pork with tangy BBQ sauce.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 35,
          servings: 2,
        },
        {
          id: 6002,
          title: "Classic Caesar Salad",
          summary: "Crisp romaine with creamy dressing and croutons.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 15,
          servings: 2,
        },
      ],
      middle_eastern: [
        {
          id: 7001,
          title: "Chicken Shawarma",
          summary: "Marinated chicken with Middle Eastern spices and tahini.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 30,
          servings: 2,
        },
        {
          id: 7002,
          title: "Falafel Bowl",
          summary: "Crispy chickpea fritters with fresh vegetables.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 25,
          servings: 1,
        },
      ],
      latin_american: [
        {
          id: 8001,
          title: "Chicken Enchiladas",
          summary: "Rolled tortillas with chicken and spicy sauce.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 40,
          servings: 3,
        },
        {
          id: 8002,
          title: "Brazilian Black Beans",
          summary: "Traditional black bean stew with rich flavors.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 45,
          servings: 4,
        },
      ],
      south_asian: [
        {
          id: 9001,
          title: "Lamb Curry",
          summary: "Tender lamb in aromatic South Asian spices.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 50,
          servings: 3,
        },
        {
          id: 9002,
          title: "Vegetable Korma",
          summary: "Creamy vegetable curry with cashew sauce.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 35,
          servings: 2,
        },
      ],
      african: [
        {
          id: 10001,
          title: "Moroccan Tagine",
          summary: "Slow-cooked stew with aromatic spices and dried fruits.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 60,
          servings: 4,
        },
        {
          id: 10002,
          title: "Ethiopian Injera",
          summary: "Traditional sourdough flatbread with lentil stew.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 30,
          servings: 2,
        },
      ],
      scandinavian: [
        {
          id: 11001,
          title: "Swedish Meatballs",
          summary: "Classic meatballs in creamy gravy with lingonberries.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 35,
          servings: 2,
        },
        {
          id: 11002,
          title: "Norwegian Salmon",
          summary: "Fresh Atlantic salmon with dill and lemon.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 20,
          servings: 1,
        },
      ],
      eastern_european: [
        {
          id: 12001,
          title: "Polish Pierogi",
          summary: "Traditional dumplings filled with potato and cheese.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 40,
          servings: 3,
        },
        {
          id: 12002,
          title: "Hungarian Goulash",
          summary: "Hearty beef stew with paprika and vegetables.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 55,
          servings: 4,
        },
      ],
      caribbean: [
        {
          id: 13001,
          title: "Jerk Chicken",
          summary: "Spicy grilled chicken with Caribbean jerk seasoning.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 30,
          servings: 2,
        },
        {
          id: 13002,
          title: "Caribbean Rice and Beans",
          summary: "Coconut rice with kidney beans and spices.",
          image: "/api/placeholder/400/300",
          readyInMinutes: 35,
          servings: 3,
        },
      ],
    };

    // Get regional recipes or fallback to global
    const regionRecipes =
      regionalVariations[region] || regionalVariations.global;

    // For non-global regions, combine some global recipes with regional ones
    let combinedRecipes: Partial<TranslatableRecipe>[];
    if (region === "global") {
      combinedRecipes = regionRecipes;
    } else {
      // Take 3 from global recipes and 3 from regional
      combinedRecipes = [...this.mockRecipes.slice(0, 3), ...regionRecipes];
    }

    return combinedRecipes.map((recipe) => ({
      ...recipe,
      instructions: recipe.instructions || [
        { step: "Prepare all ingredients" },
        { step: "Follow cooking method" },
        { step: "Serve and enjoy" },
      ],
    })) as TranslatableRecipe[];
  }

  // Generate unique ID based on region and base ID to prevent conflicts
  private static generateUniqueId(baseId: number, region: Region): number {
    const regionMultipliers: Partial<Record<Region, number>> = {
      global: 0,
      mediterranean: 10000,
      asian: 20000,
      european: 30000,
      indian: 40000,
      american: 50000,
      middle_eastern: 60000,
      latin_american: 70000,
      south_asian: 80000,
      african: 90000,
      scandinavian: 100000,
      eastern_european: 110000,
      caribbean: 120000,
      east_asian: 130000,
      nordic: 140000,
      oceanian: 150000,
    };

    return baseId + (regionMultipliers[region] || 0);
  }

  static async getRandomRecipes(
    region: Region = "global",
    language: Language = "en",
    tags: string = "",
    number: number = 6
  ): Promise<TranslatableRecipe[]> {
    console.log(
      "🔄 Using fallback recipes service - Spoonacular API not available"
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const regionalRecipes = this.getRegionalRecipes(region);

    // Ensure unique IDs by adding region-specific offset
    const uniqueRecipes = regionalRecipes.map((recipe) => ({
      ...recipe,
      id: this.generateUniqueId(recipe.id, region),
    }));

    const selectedRecipes = uniqueRecipes.slice(0, number);

    // Translate recipes if language is not English
    if (language !== "en") {
      try {
        const translatedRecipes = await Promise.all(
          selectedRecipes.map((recipe) => translateRecipe(recipe, language))
        );
        return translatedRecipes;
      } catch (error) {
        console.error("Translation failed for fallback recipes:", error);
        return selectedRecipes;
      }
    }

    return selectedRecipes;
  }

  static async searchRecipes(
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
    console.log("🔄 Using fallback search - Spoonacular API not available");

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const allRecipes = this.getRegionalRecipes(region);
    const number = options.number || 12;

    // Simple text-based filtering
    const filteredRecipes = allRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.summary?.toLowerCase().includes(query.toLowerCase())
    );

    const recipesToUse =
      filteredRecipes.length > 0 ? filteredRecipes : allRecipes;

    // Ensure unique IDs
    const uniqueRecipes = recipesToUse.map((recipe) => ({
      ...recipe,
      id: this.generateUniqueId(recipe.id, region),
    }));

    const selectedRecipes = uniqueRecipes.slice(0, number);

    // Translate if needed
    if (language !== "en") {
      try {
        return await Promise.all(
          selectedRecipes.map((recipe) => translateRecipe(recipe, language))
        );
      } catch (error) {
        console.error("Translation failed for search results:", error);
        return selectedRecipes;
      }
    }

    return selectedRecipes;
  }

  static async getRecipeDetails(
    recipeId: number,
    language: Language = "en"
  ): Promise<TranslatableRecipe | null> {
    console.log(
      "🔄 Using fallback recipe details - Spoonacular API not available"
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Get all possible recipes from all regions
    const allRegions: Region[] = [
      "global",
      "mediterranean",
      "asian",
      "european",
      "indian",
      "american",
      "middle_eastern",
      "latin_american",
      "south_asian",
      "african",
      "scandinavian",
      "eastern_european",
      "caribbean",
    ];
    const allRecipes: TranslatableRecipe[] = [];

    allRegions.forEach((region) => {
      const regionRecipes = this.getRegionalRecipes(region).map((recipe) => ({
        ...recipe,
        id: this.generateUniqueId(recipe.id, region),
      }));
      allRecipes.push(...regionRecipes);
    });

    const recipe = allRecipes.find((r) => r.id === recipeId);
    if (!recipe) {
      return null;
    }

    // Translate if needed
    if (language !== "en") {
      try {
        return await translateRecipe(recipe, language);
      } catch (error) {
        console.error("Translation failed for recipe details:", error);
        return recipe;
      }
    }

    return recipe;
  }

  static isApiAvailable(): boolean {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    return !!apiKey && apiKey !== "your-spoonacular-api-key";
  }
}
