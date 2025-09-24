import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Zap, ChefHat, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface DietCardProps {
  diet: {
    id: string;
    name: string;
    description: string;
    benefits: string[];
    image: string;
    estimatedCalories: string;
  };
  featured?: boolean;
}

const DietCard: React.FC<DietCardProps> = ({ diet, featured = false }) => {
  const navigate = useNavigate();
  const { language, translateText, isTranslating } = useLanguage();

  // Use useMemo to prevent unnecessary recalculations
  const translationKey = useMemo(
    () => `${diet.id}-${language}`,
    [diet.id, language]
  );

  const [translatedContent, setTranslatedContent] = useState({
    name: diet.name,
    description: diet.description,
    benefits: diet.benefits,
    isTranslated: language === "en",
  });

  const [currentTranslationKey, setCurrentTranslationKey] =
    useState(translationKey);

  useEffect(() => {
    // Only translate if we haven't already translated for this key
    if (
      currentTranslationKey === translationKey &&
      translatedContent.isTranslated
    ) {
      return;
    }

    const translateContent = async () => {
      if (language === "en") {
        setTranslatedContent({
          name: diet.name,
          description: diet.description,
          benefits: diet.benefits,
          isTranslated: true,
        });
        setCurrentTranslationKey(translationKey);
        return;
      }

      try {
        const [translatedName, translatedDescription, ...translatedBenefits] =
          await Promise.all([
            translateText(diet.name),
            translateText(diet.description),
            ...diet.benefits.map((benefit) => translateText(benefit)),
          ]);

        setTranslatedContent({
          name: translatedName,
          description: translatedDescription,
          benefits: translatedBenefits,
          isTranslated: true,
        });
        setCurrentTranslationKey(translationKey);
      } catch (error) {
        console.error("Translation failed for diet:", error);
        // Fallback to original content if translation fails
        setTranslatedContent({
          name: diet.name,
          description: diet.description,
          benefits: diet.benefits,
          isTranslated: true,
        });
        setCurrentTranslationKey(translationKey);
      }
    };

    translateContent();
  }, [
    translationKey,
    currentTranslationKey,
    translatedContent.isTranslated,
    diet,
    language,
    translateText,
  ]);

  const handleViewDetails = () => {
    navigate(`/diet/${diet.id}`);
  };

  // Show loading state only when actively translating and content hasn't been translated for current language
  const showLoading = isTranslating && !translatedContent.isTranslated;

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 border-0 ${
        featured ? "shadow-xl" : "shadow-card"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={diet.image}
          alt={translatedContent.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {diet.estimatedCalories}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">
          {showLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="opacity-70">Translating...</span>
            </div>
          ) : (
            translatedContent.name
          )}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {showLoading ? (
            <div className="space-y-2">
              <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
            </div>
          ) : (
            translatedContent.description
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {showLoading ? (
            <div className="space-y-2">
              <div className="h-3 bg-muted animate-pulse rounded w-full"></div>
              <div className="h-3 bg-muted animate-pulse rounded w-5/6"></div>
              <div className="h-3 bg-muted animate-pulse rounded w-4/5"></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {translatedContent.benefits.slice(0, 3).map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
              {translatedContent.benefits.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{translatedContent.benefits.length - 3} more
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span>Balanced</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>7 days</span>
            </div>
          </div>

          <Button
            onClick={handleViewDetails}
            className="w-full"
            variant={featured ? "premium" : "default"}
            disabled={showLoading}
          >
            {showLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "View Details"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DietCard;
