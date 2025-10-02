import { Language } from "@/contexts/LanguageContext";
import { LibreTranslateRateLimit } from "./LibreTranslateConfig";

// Translation service for handling all translation needs
export class TranslationService {
  private static instance: TranslationService;
  private cache = new Map<string, string>();
  private isTranslating = false;

  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  private getLanguageCode(language: Language): string {
    const languageCodeMap: Record<Language, string> = {
      en: "en",
      es: "es",
      fr: "fr",
      de: "de",
      it: "it",
      ar: "ar",
      zh: "zh",
      ja: "ja",
      ur: "ur",
    };
    return languageCodeMap[language] || "en";
  }

  // Check if language is supported before translating
  private async isLanguageAvailable(targetCode: string): Promise<boolean> {
    try {
      const baseUrl =
        import.meta.env.VITE_LIBRETRANSLATE_URL || "http://localhost:5000";
      const apiKey = import.meta.env.VITE_LIBRETRANSLATE_API_KEY;

      const url = new URL(`${baseUrl}/languages`);
      if (apiKey) {
        url.searchParams.append("api_key", apiKey);
      }

      const response = await fetch(url.toString());
      if (!response.ok) return false;

      const languages = await response.json();
      const availableCodes = languages.map((lang: any) => lang.code);
      return availableCodes.includes(targetCode);
    } catch (error) {
      console.warn("Could not check available languages:", error);
      return false;
    }
  }

  private async translateWithLibreTranslate(
    text: string,
    targetLanguage: string
  ): Promise<string> {
    const apiKey = import.meta.env.VITE_LIBRETRANSLATE_API_KEY;
    const baseUrl =
      import.meta.env.VITE_LIBRETRANSLATE_URL || "http://localhost:5000";

    try {
      const requestBody: any = {
        q: text,
        source: "en",
        target: targetLanguage,
        format: "text",
      };

      // Add API key if provided
      if (apiKey) {
        requestBody.api_key = apiKey;
      }

      const response = await fetch(`${baseUrl}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `LibreTranslate API error: ${response.status} - ${
            errorData.error || response.statusText
          }`
        );
      }

      const data = await response.json();
      return data.translatedText || text;
    } catch (error) {
      console.error("LibreTranslate API error:", error);
      throw error;
    }
  }

  async translateText(text: string, targetLanguage: Language): Promise<string> {
    // Don't translate if target language is English or text is empty
    if (targetLanguage === "en" || !text?.trim()) {
      return text;
    }

    const targetCode = this.getLanguageCode(targetLanguage);
    const cacheKey = `${text}:${targetCode}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      this.isTranslating = true;

      // Use rate limiting for public instances
      const translatedText = await LibreTranslateRateLimit.queueRequest(() =>
        this.translateWithLibreTranslate(text, targetCode)
      );

      // Cache the translation
      this.cache.set(cacheKey, translatedText);

      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text if translation fails
    } finally {
      this.isTranslating = false;
    }
  }

  // Batch translate for better performance
  async batchTranslate(
    texts: string[],
    targetLanguage: Language
  ): Promise<string[]> {
    if (targetLanguage === "en" || texts.length === 0) {
      return texts;
    }

    const targetCode = this.getLanguageCode(targetLanguage);
    const uncachedTexts: { index: number; text: string }[] = [];
    const results: string[] = new Array(texts.length);

    // Check cache for each text
    texts.forEach((text, index) => {
      const cacheKey = `${text}:${targetCode}`;
      if (this.cache.has(cacheKey)) {
        results[index] = this.cache.get(cacheKey)!;
      } else if (text?.trim()) {
        uncachedTexts.push({ index, text });
      } else {
        results[index] = text;
      }
    });

    // If all texts are cached, return cached results
    if (uncachedTexts.length === 0) {
      return results;
    }

    try {
      this.isTranslating = true;

      // Translate uncached texts with rate limiting
      const batchPromises = uncachedTexts.map(
        async ({ index, text }, batchIndex) => {
          // Add small delay between requests to avoid overwhelming the server
          if (batchIndex > 0) {
            await new Promise((resolve) => setTimeout(resolve, 50));
          }

          try {
            const translatedText = await LibreTranslateRateLimit.queueRequest(
              () => this.translateWithLibreTranslate(text, targetCode)
            );
            const cacheKey = `${text}:${targetCode}`;
            this.cache.set(cacheKey, translatedText);
            return { index, translatedText };
          } catch (error) {
            console.error(
              `Translation failed for text at index ${index}:`,
              error
            );
            return { index, translatedText: text };
          }
        }
      );

      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach(({ index, translatedText }) => {
        results[index] = translatedText;
      });

      return results;
    } catch (error) {
      console.error("Batch translation error:", error);
      // Fill uncached results with original texts
      uncachedTexts.forEach(({ index, text }) => {
        results[index] = text;
      });
      return results;
    } finally {
      this.isTranslating = false;
    }
  }

  getIsTranslating(): boolean {
    return this.isTranslating;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

// Singleton instance
export const translationService = TranslationService.getInstance();

// Helper types for translatable content
export interface TranslatableRecipe {
  id: number;
  title: string;
  summary?: string;
  instructions?: Array<{ step: string }>;
  readyInMinutes?: number;
  servings?: number;
  image?: string;
}

export interface TranslatableDiet {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  image: string;
  estimatedCalories: string;
}

// Helper functions for translating specific data structures
export async function translateRecipe(
  recipe: TranslatableRecipe,
  targetLanguage: Language
): Promise<TranslatableRecipe> {
  if (targetLanguage === "en" || !recipe) {
    return recipe;
  }

  const textsToTranslate: string[] = [
    recipe.title,
    recipe.summary || "",
    ...(recipe.instructions?.map((inst) => inst.step) || []),
  ].filter((text) => text?.trim());

  try {
    const translations = await translationService.batchTranslate(
      textsToTranslate,
      targetLanguage
    );
    let translationIndex = 0;

    return {
      ...recipe,
      title: translations[translationIndex++] || recipe.title,
      summary: recipe.summary
        ? translations[translationIndex++] || recipe.summary
        : recipe.summary,
      instructions: recipe.instructions?.map((inst) => ({
        ...inst,
        step: translations[translationIndex++] || inst.step,
      })),
    };
  } catch (error) {
    console.error("Recipe translation error:", error);
    return recipe;
  }
}

export async function translateDiet(
  diet: TranslatableDiet,
  targetLanguage: Language
): Promise<TranslatableDiet> {
  if (targetLanguage === "en" || !diet) {
    return diet;
  }

  const textsToTranslate = [
    diet.name,
    diet.description,
    ...diet.benefits,
  ].filter((text) => text?.trim());

  try {
    const translations = await translationService.batchTranslate(
      textsToTranslate,
      targetLanguage
    );

    return {
      ...diet,
      name: translations[0] || diet.name,
      description: translations[1] || diet.description,
      benefits: diet.benefits.map(
        (benefit, index) => translations[index + 2] || benefit
      ),
    };
  } catch (error) {
    console.error("Diet translation error:", error);
    return diet;
  }
}

export async function translateDiets(
  diets: TranslatableDiet[],
  targetLanguage: Language
): Promise<TranslatableDiet[]> {
  if (targetLanguage === "en" || !diets?.length) {
    return diets;
  }

  return Promise.all(diets.map((diet) => translateDiet(diet, targetLanguage)));
}
