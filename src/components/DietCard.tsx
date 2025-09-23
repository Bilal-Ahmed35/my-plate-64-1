// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { SuggestedDiet } from '@/types/diet';
// import { ArrowRight, Zap } from 'lucide-react';
// import { Link } from 'react-router-dom';

// interface DietCardProps {
//   diet: SuggestedDiet;
// }

// const DietCard = ({ diet }: DietCardProps) => {
//   return (
//     <Link to={`/diet-details/${diet.id}`} className="block">
//       <Card className="group hover:shadow-elegant transition-smooth border-0 shadow-card bg-gradient-card overflow-hidden cursor-pointer">
//         <div className="aspect-video overflow-hidden">
//           <img
//             src={diet.image}
//             alt={diet.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
//           />
//         </div>
//         <CardHeader className="pb-3">
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-smooth">
//               {diet.name}
//             </CardTitle>
//             <Badge variant="secondary" className="gap-1">
//               <Zap className="h-3 w-3" />
//               {diet.estimatedCalories}
//             </Badge>
//           </div>
//           <CardDescription className="text-muted-foreground">
//             {diet.description}
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="pt-0">
//           <div className="mb-4">
//             <h4 className="font-medium text-sm text-card-foreground mb-2">Key Benefits:</h4>
//             <div className="flex flex-wrap gap-2">
//               {diet.benefits.slice(0, 3).map((benefit, index) => (
//                 <Badge key={index} variant="outline" className="text-xs">
//                   {benefit}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           <div className="w-full group/btn flex items-center justify-center gap-2 p-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-smooth">
//             Learn More
//             <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-smooth" />
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default DietCard;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SuggestedDiet } from "@/types/diet";
import { ArrowRight, Zap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { translateDiet, TranslatableDiet } from "@/services/TranslationService";

interface DietCardProps {
  diet: SuggestedDiet;
}

const DietCard = ({ diet }: DietCardProps) => {
  const { language, t } = useLanguage();
  const [translatedDiet, setTranslatedDiet] = useState<TranslatableDiet | null>(
    null
  );
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const translateDietData = async () => {
      if (language === "en") {
        setTranslatedDiet({
          id: diet.id,
          name: diet.name,
          description: diet.description,
          benefits: diet.benefits,
          image: diet.image,
          estimatedCalories: diet.estimatedCalories,
        });
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await translateDiet(
          {
            id: diet.id,
            name: diet.name,
            description: diet.description,
            benefits: diet.benefits,
            image: diet.image,
            estimatedCalories: diet.estimatedCalories,
          },
          language
        );

        setTranslatedDiet(translated);
      } catch (error) {
        console.error("Diet translation failed:", error);
        // Fallback to original data
        setTranslatedDiet({
          id: diet.id,
          name: diet.name,
          description: diet.description,
          benefits: diet.benefits,
          image: diet.image,
          estimatedCalories: diet.estimatedCalories,
        });
      } finally {
        setIsTranslating(false);
      }
    };

    translateDietData();
  }, [diet, language]);

  if (!translatedDiet) {
    return (
      <Card className="group hover:shadow-elegant transition-smooth border-0 shadow-card bg-gradient-card overflow-hidden">
        <div className="aspect-video overflow-hidden bg-muted animate-pulse">
          <div className="w-full h-full bg-muted-foreground/20"></div>
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-center h-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Link to={`/diet-details/${translatedDiet.id}`} className="block">
      <Card className="group hover:shadow-elegant transition-smooth border-0 shadow-card bg-gradient-card overflow-hidden cursor-pointer">
        <div className="aspect-video overflow-hidden">
          <img
            src={translatedDiet.image}
            alt={translatedDiet.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-smooth truncate">
                {isTranslating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="opacity-70">
                      {t("common.translating")}
                    </span>
                  </div>
                ) : (
                  translatedDiet.name
                )}
              </CardTitle>
            </div>
            <Badge variant="secondary" className="gap-1 ml-2 flex-shrink-0">
              <Zap className="h-3 w-3" />
              {translatedDiet.estimatedCalories}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground">
            {isTranslating ? (
              <div className="h-12 bg-muted animate-pulse rounded"></div>
            ) : (
              translatedDiet.description
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mb-4">
            <h4 className="font-medium text-sm text-card-foreground mb-2">
              Key Benefits:
            </h4>
            <div className="flex flex-wrap gap-2">
              {translatedDiet.benefits.slice(0, 3).map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
              {isTranslating && translatedDiet.benefits.length === 0 && (
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-6 w-16 bg-muted animate-pulse rounded-full"
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full group/btn flex items-center justify-center gap-2 p-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-smooth">
            {t("common.viewDetails")}
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-smooth" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DietCard;
