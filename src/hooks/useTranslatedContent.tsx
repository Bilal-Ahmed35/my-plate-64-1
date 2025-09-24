import { useState, useEffect, useCallback } from "react";
import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  translationService,
  translateDiet,
  translateDiets,
  TranslatableDiet,
  TranslatableRecipe,
} from "@/services/TranslationService";

// Custom hook for managing translated content
export function useTranslatedContent() {
  const { language } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);

  const translateSingleText = useCallback(
    async (text: string): Promise<string> => {
      if (language === "en" || !text) {
        return text;
      }

      setIsTranslating(true);
      try {
        const result = await translationService.translateText(text, language);
        return result;
      } catch (error) {
        console.error("Translation failed:", error);
        return text;
      } finally {
        setIsTranslating(false);
      }
    },
    [language]
  );

  const translateMultipleTexts = useCallback(
    async (texts: string[]): Promise<string[]> => {
      if (language === "en" || texts.length === 0) {
        return texts;
      }

      setIsTranslating(true);
      try {
        const results = await translationService.batchTranslate(
          texts,
          language
        );
        return results;
      } catch (error) {
        console.error("Batch translation failed:", error);
        return texts;
      } finally {
        setIsTranslating(false);
      }
    },
    [language]
  );

  return {
    translateSingleText,
    translateMultipleTexts,
    isTranslating,
    currentLanguage: language,
  };
}

// Hook specifically for diet translations
export function useTranslatedDiet(diet: TranslatableDiet | null) {
  const { language } = useLanguage();
  const [translatedDiet, setTranslatedDiet] = useState<TranslatableDiet | null>(
    null
  );
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!diet) {
      setTranslatedDiet(null);
      return;
    }

    if (language === "en") {
      setTranslatedDiet(diet);
      return;
    }

    const translateDietData = async () => {
      setIsTranslating(true);
      try {
        const translated = await translateDiet(diet, language);
        setTranslatedDiet(translated);
      } catch (error) {
        console.error("Diet translation failed:", error);
        setTranslatedDiet(diet);
      } finally {
        setIsTranslating(false);
      }
    };

    translateDietData();
  }, [diet, language]);

  return {
    translatedDiet,
    isTranslating,
  };
}

// Hook for diet list translations
export function useTranslatedDiets(diets: TranslatableDiet[]) {
  const { language } = useLanguage();
  const [translatedDiets, setTranslatedDiets] = useState<TranslatableDiet[]>(
    []
  );
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (language === "en") {
      setTranslatedDiets(diets);
      return;
    }

    if (diets.length === 0) {
      setTranslatedDiets([]);
      return;
    }

    const translateDietsData = async () => {
      setIsTranslating(true);
      try {
        const translated = await translateDiets(diets, language);
        setTranslatedDiets(translated);
      } catch (error) {
        console.error("Diets translation failed:", error);
        setTranslatedDiets(diets);
      } finally {
        setIsTranslating(false);
      }
    };

    translateDietsData();
  }, [diets, language]);

  return {
    translatedDiets,
    isTranslating,
  };
}

// Hook for recipe translations
export function useTranslatedRecipe(recipe: TranslatableRecipe | null) {
  const { language } = useLanguage();
  const [translatedRecipe, setTranslatedRecipe] =
    useState<TranslatableRecipe | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!recipe) {
      setTranslatedRecipe(null);
      return;
    }

    if (language === "en") {
      setTranslatedRecipe(recipe);
      return;
    }

    const translateRecipeData = async () => {
      setIsTranslating(true);
      try {
        // Import translateRecipe function dynamically to avoid circular dependencies
        const { translateRecipe } = await import(
          "@/services/TranslationService"
        );
        const translated = await translateRecipe(recipe, language);
        setTranslatedRecipe(translated);
      } catch (error) {
        console.error("Recipe translation failed:", error);
        setTranslatedRecipe(recipe);
      } finally {
        setIsTranslating(false);
      }
    };

    translateRecipeData();
  }, [recipe, language]);

  return {
    translatedRecipe,
    isTranslating,
  };
}

// Hook for form field translations
export function useTranslatedFormOptions<T extends Record<string, any>>(
  options: T[],
  labelKey: keyof T
) {
  const { translateSingleText, isTranslating } = useTranslatedContent();
  const [translatedOptions, setTranslatedOptions] = useState<T[]>(options);

  useEffect(() => {
    const translateOptions = async () => {
      const translatedLabels = await Promise.all(
        options.map((option) => translateSingleText(option[labelKey] as string))
      );

      const newTranslatedOptions = options.map((option, index) => ({
        ...option,
        [labelKey]: translatedLabels[index],
      }));

      setTranslatedOptions(newTranslatedOptions);
    };

    translateOptions();
  }, [options, labelKey, translateSingleText]);

  return {
    translatedOptions,
    isTranslating,
  };
}

// Hook for managing translation cache
export function useTranslationCache() {
  const getCacheSize = useCallback(() => {
    return translationService.getCacheSize();
  }, []);

  const clearCache = useCallback(() => {
    translationService.clearCache();
  }, []);

  const getIsTranslating = useCallback(() => {
    return translationService.getIsTranslating();
  }, []);

  return {
    getCacheSize,
    clearCache,
    getIsTranslating,
  };
}
