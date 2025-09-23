// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import DietCard from "@/components/DietCard";
// import { getFilteredDiets } from "@/data/suggestedDiets";
// import { ArrowRight, Utensils, Heart, Target } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useLanguage } from '@/contexts/LanguageContext';
// import { useRegion } from '@/contexts/RegionContext';
// import heroImage from "@/assets/hero-nutrition.jpg";

// const Index = () => {
//   const { t } = useLanguage();
//   const { region } = useRegion();
//   const filteredDiets = getFilteredDiets(region);
//   const scrollToDietPlans = () => {
//     const dietPlansSection = document.getElementById('diet-plans-section');
//     if (dietPlansSection) {
//       dietPlansSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative py-20 px-4 overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <img
//             src={heroImage}
//             alt="Healthy nutrition ingredients"
//             className="w-full h-full object-cover opacity-20"
//           />
//           <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
//         </div>

//         <div className="container mx-auto relative z-10 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
//             {t('home.hero.title')}
//           </h1>
//           <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
//             {t('home.hero.subtitle')}
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Link to="/personalize">
//               <Button variant="premium" size="lg" className="text-lg px-8 py-6 h-auto">
//                 {t('home.hero.getStarted')}
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//             <Button
//               variant="outline"
//               size="lg"
//               className="text-lg px-8 py-6 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20"
//               onClick={scrollToDietPlans}
//             >
//               {t('home.hero.browsePlans')}
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 bg-muted/30">
//         <div className="container mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-foreground mb-4">{t('home.features.title')}</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               {t('home.features.personalized.desc')}
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <Card className="text-center shadow-card border-0">
//               <CardHeader>
//                 <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
//                 <CardTitle className="text-xl">{t('home.features.personalized.title')}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <CardDescription className="text-base">
//                   {t('home.features.personalized.desc')}
//                 </CardDescription>
//               </CardContent>
//             </Card>

//             <Card className="text-center shadow-card border-0">
//               <CardHeader>
//                 <Heart className="h-12 w-12 text-secondary-rich mx-auto mb-4" />
//                 <CardTitle className="text-xl">{t('home.features.science.title')}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <CardDescription className="text-base">
//                   {t('home.features.science.desc')}
//                 </CardDescription>
//               </CardContent>
//             </Card>

//             <Card className="text-center shadow-card border-0">
//               <CardHeader>
//                 <Target className="h-12 w-12 text-success mx-auto mb-4" />
//                 <CardTitle className="text-xl">{t('home.features.easy.title')}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <CardDescription className="text-base">
//                   {t('home.features.easy.desc')}
//                 </CardDescription>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Suggested Diet Plans */}
//       <section id="diet-plans-section" className="py-20 px-4">
//         <div className="container mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-foreground mb-4">{t('home.plans.title')}</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               {t('home.plans.subtitle')}
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredDiets.map((diet) => (
//               <DietCard key={diet.id} diet={diet} />
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Link to="/personalize">
//               <Button variant="hero" size="lg" className="text-lg px-8 py-4">
//                 {t('home.hero.getStarted')}
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Index;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Users, BookOpen, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { getFilteredDiets } from "@/data/suggestedDiets";
import DietCard from "@/components/DietCard";
import { useTranslatedDiets } from "@/hooks/useTranslatedContent";
import { spoonacularAPI } from "@/services/SpoonacularAPIService";
import type { TranslatableRecipe } from "@/services/TranslationService";

const Index = () => {
  const { t, language } = useLanguage();
  const { region, getRegionName } = useRegion();
  const [featuredRecipes, setFeaturedRecipes] = useState<TranslatableRecipe[]>(
    []
  );
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

  // Get filtered diets based on region
  const filteredDiets = getFilteredDiets(region);

  // Convert to translatable format
  const translatableDiets = filteredDiets.map((diet) => ({
    id: diet.id,
    name: diet.name,
    description: diet.description,
    benefits: diet.benefits,
    image: diet.image,
    estimatedCalories: diet.estimatedCalories,
  }));

  // Use translation hook for diets
  const { translatedDiets, isTranslating: isTranslatingDiets } =
    useTranslatedDiets(translatableDiets);

  // Fetch featured recipes when region or language changes
  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      setIsLoadingRecipes(true);
      try {
        const recipes = await spoonacularAPI.getRandomRecipes(
          region,
          language,
          "",
          6
        );
        setFeaturedRecipes(recipes);
      } catch (error) {
        console.error("Failed to fetch featured recipes:", error);
        setFeaturedRecipes([]);
      } finally {
        setIsLoadingRecipes(false);
      }
    };

    fetchFeaturedRecipes();
  }, [region, language]);

  const features = [
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: t("home.features.personalized.title"),
      description: t("home.features.personalized.desc"),
    },
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: t("home.features.science.title"),
      description: t("home.features.science.desc"),
    },
    {
      icon: <Utensils className="h-12 w-12 text-primary" />,
      title: t("home.features.easy.title"),
      description: t("home.features.easy.desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t("home.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("home.hero.subtitle")}
            </p>

            {/* Region Badge */}
            <div className="mb-8">
              <Badge variant="outline" className="text-sm px-4 py-2">
                {region !== "global" && (
                  <>Exploring {getRegionName(region)} Cuisine</>
                )}
                {region === "global" && <>Global Cuisine Selection</>}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/personalize">
                <Button size="lg" className="gap-2 px-8 py-4 text-lg">
                  {t("home.hero.getStarted")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 px-8 py-4 text-lg"
              >
                {t("home.hero.browsePlans")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              {t("home.features.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-card bg-gradient-card"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl text-card-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Recipes Section */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("home.recipes.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {region !== "global"
                ? t("home.recipes.regional").replace("{region}", getRegionName(region))
                : t("home.recipes.global")}
            </p>
          </div>

          {isLoadingRecipes ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="group hover:shadow-elegant transition-smooth border-0 shadow-card bg-gradient-card overflow-hidden cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden">
                    {recipe.image ? (
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Utensils className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-smooth line-clamp-2">
                      {recipe.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {recipe.readyInMinutes && (
                        <span>{recipe.readyInMinutes} min</span>
                      )}
                      {recipe.servings && (
                        <span>{recipe.servings} servings</span>
                      )}
                    </div>
                  </CardHeader>
                  {recipe.summary && (
                    <CardContent>
                      <CardDescription
                        className="text-muted-foreground line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: recipe.summary.replace(/<[^>]*>/g, ""),
                        }}
                      />
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Diet Plans Section */}
      <div className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              {t("home.plans.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              {t("home.plans.subtitle")}
            </p>

              {isTranslatingDiets && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("common.loading")}...
                </div>
              )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {translatedDiets.slice(0, 6).map((diet) => (
              <DietCard
                key={diet.id}
                diet={{
                  ...diet,
                  dietType: "balanced", // Default fallback
                  regions: [], // Will be handled by the original diet data
                }}
              />
            ))}
          </div>

          {translatedDiets.length > 6 && (
            <div className="text-center mt-12">
              <Link to="/results">
                <Button variant="outline" size="lg" className="gap-2">
                  {t("home.plans.viewAll")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
