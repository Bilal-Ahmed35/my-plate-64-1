import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DietPlan, UserProfile } from '@/types/diet';
import { calculateTDEE, getMacroDistribution } from '@/utils/calculations';
import { ArrowLeft, Calendar, Clock, Printer, Utensils, ChefHat, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslatedContent } from '@/hooks/useTranslatedContent';

const DietDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { translateSingleText, isTranslating } = useTranslatedContent();
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [translatedPlan, setTranslatedPlan] = useState<DietPlan | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const userProfile: UserProfile = JSON.parse(savedProfile);
      setProfile(userProfile);

      // Generate detailed diet plan
      const targetCalories = calculateTDEE(userProfile);
      const macros = getMacroDistribution(targetCalories, userProfile.dietPreference);

      // Mock detailed meal plan
      const mockDetailedPlan: DietPlan = {
        id: id || '1',
        name: `${userProfile.dietPreference} Plan - Balanced`,
        description: 'A comprehensive 7-day meal plan designed specifically for your goals and preferences.',
        image: '/api/placeholder/400/300',
        totalCalories: targetCalories,
        totalNutrition: {
          calories: targetCalories,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
        },
        meals: [
          {
            id: 1,
            type: 'breakfast',
            recipe: {
              id: 1,
              title: 'Protein-Packed Overnight Oats',
              image: '/api/placeholder/300/200',
              readyInMinutes: 10,
              servings: 1,
              nutrition: {
                calories: Math.round(targetCalories * 0.25),
                protein: Math.round(macros.protein * 0.3),
                carbs: Math.round(macros.carbs * 0.35),
                fat: Math.round(macros.fat * 0.2),
              },
              ingredients: ['Rolled oats', 'Greek yogurt', 'Chia seeds', 'Banana', 'Almond butter', 'Cinnamon'],
            },
            portion: 1,
          },
          {
            id: 2,
            type: 'lunch',
            recipe: {
              id: 2,
              title: 'Mediterranean Quinoa Bowl',
              image: '/api/placeholder/300/200',
              readyInMinutes: 25,
              servings: 1,
              nutrition: {
                calories: Math.round(targetCalories * 0.35),
                protein: Math.round(macros.protein * 0.35),
                carbs: Math.round(macros.carbs * 0.4),
                fat: Math.round(macros.fat * 0.35),
              },
              ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Cherry tomatoes', 'Feta cheese', 'Olive oil', 'Lemon'],
            },
            portion: 1,
          },
          {
            id: 3,
            type: 'dinner',
            recipe: {
              id: 3,
              title: 'Herb-Crusted Salmon with Roasted Vegetables',
              image: '/api/placeholder/300/200',
              readyInMinutes: 35,
              servings: 1,
              nutrition: {
                calories: Math.round(targetCalories * 0.3),
                protein: Math.round(macros.protein * 0.35),
                carbs: Math.round(macros.carbs * 0.2),
                fat: Math.round(macros.fat * 0.4),
              },
              ingredients: ['Salmon fillet', 'Broccoli', 'Sweet potato', 'Herbs', 'Olive oil', 'Garlic'],
            },
            portion: 1,
          },
          {
            id: 4,
            type: 'snack',
            recipe: {
              id: 4,
              title: 'Mixed Nuts and Greek Yogurt',
              image: '/api/placeholder/300/200',
              readyInMinutes: 2,
              servings: 1,
              nutrition: {
                calories: Math.round(targetCalories * 0.1),
                protein: Math.round(macros.protein * 0.15),
                carbs: Math.round(macros.carbs * 0.05),
                fat: Math.round(macros.fat * 0.15),
              },
              ingredients: ['Greek yogurt', 'Mixed nuts', 'Berries'],
            },
            portion: 1,
          },
        ],
        dietType: userProfile.dietPreference,
      };

      setDietPlan(mockDetailedPlan);
    }
  }, [id]);

  // Translate diet plan when language changes
  useEffect(() => {
    const translatePlan = async () => {
      if (!dietPlan) {
        setTranslatedPlan(null);
        return;
      }

      try {
        const translatedName = await translateSingleText(dietPlan.name);
        const translatedDescription = await translateSingleText(dietPlan.description);

        const translatedMeals = await Promise.all(
          dietPlan.meals.map(async (meal) => ({
            ...meal,
            recipe: {
              ...meal.recipe,
              title: await translateSingleText(meal.recipe.title),
              ingredients: await Promise.all(
                meal.recipe.ingredients?.map(ingredient => translateSingleText(ingredient)) || []
              ),
            },
          }))
        );

        setTranslatedPlan({
          ...dietPlan,
          name: translatedName,
          description: translatedDescription,
          meals: translatedMeals,
        });
      } catch (error) {
        console.error('Failed to translate diet plan:', error);
        setTranslatedPlan(dietPlan);
      }
    };

    translatePlan();
  }, [dietPlan, translateSingleText]);

  const handlePrint = () => {
    window.print();
  };

  if (!translatedPlan || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">{t('common.loading')}</h2>
          <p className="text-muted-foreground">{t('diet.preparing')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {isTranslating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="opacity-70">{t('common.loading')}...</span>
                  </div>
                ) : (
                  translatedPlan.name
                )}
              </h1>
              <p className="text-xl text-muted-foreground">
                {isTranslating ? (
                  <div className="h-6 bg-muted animate-pulse rounded w-3/4"></div>
                ) : (
                  translatedPlan.description
                )}
              </p>
            </div>
            <Button variant="outline" onClick={handlePrint} className="gap-2 print:hidden">
              <Printer className="h-4 w-4" />
              {t('diet.printPlan')}
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              {t('diet.sevenDayPlan')}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Utensils className="h-3 w-3" />
              {translatedPlan.dietType.replace('_', ' ')} {t('diet.diet')}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              {translatedPlan.totalCalories} {t('common.calories')}/day
            </Badge>
          </div>
        </div>

        {/* Nutrition Overview */}
        <Card className="mb-8 shadow-card border-0">
          <CardHeader>
            <CardTitle>{t('diet.nutritionTargets')}</CardTitle>
            <CardDescription>
              {t('diet.nutritionDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{translatedPlan.totalNutrition.calories}</div>
                <div className="text-sm text-muted-foreground">{t('common.calories')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-rich mb-1">{translatedPlan.totalNutrition.protein}g</div>
                <div className="text-sm text-muted-foreground">{t('common.protein')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">{translatedPlan.totalNutrition.carbs}g</div>
                <div className="text-sm text-muted-foreground">{t('common.carbs')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-1">{translatedPlan.totalNutrition.fat}g</div>
                <div className="text-sm text-muted-foreground">{t('common.fat')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Day Meals */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">{t('diet.sampleMeals')}</h2>
          <div className="space-y-6">
            {translatedPlan.meals.map((meal) => (
              <Card key={meal.id} className="shadow-card border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-3">
                      <ChefHat className="h-5 w-5 text-primary" />
                      {t(`meal.${meal.type}`)}
                    </CardTitle>
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {meal.recipe.readyInMinutes} min
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{meal.recipe.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        {t('diet.mealDescription').replace('{mealType}', t(`meal.${meal.type}`))}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">{t('diet.ingredients')}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {meal.recipe.ingredients?.map((ingredient, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-3">{t('diet.nutritionPerServing')}:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{t('common.calories')}:</span>
                          <span className="font-medium">{meal.recipe.nutrition.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('common.protein')}:</span>
                          <span className="font-medium">{meal.recipe.nutrition.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('common.carbs')}:</span>
                          <span className="font-medium">{meal.recipe.nutrition.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('common.fat')}:</span>
                          <span className="font-medium">{meal.recipe.nutrition.fat}g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Planning Note */}
        <Card className="bg-accent/50 border-accent print:hidden">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">💡 {t('diet.weeklyTips')}</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {t('diet.tip1')}</li>
              <li>• {t('diet.tip2')}</li>
              <li>• {t('diet.tip3')}</li>
              <li>• {t('diet.tip4')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DietDetails;