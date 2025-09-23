import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserProfile, DietPlan } from '@/types/diet';
import { calculateTDEE, getMacroDistribution } from '@/utils/calculations';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Utensils, Zap, Eye, Calculator, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mealPlans, setMealPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (!savedProfile) {
      navigate('/personalize');
      return;
    }

    const userProfile: UserProfile = JSON.parse(savedProfile);
    setProfile(userProfile);

    // Generate mock meal plans based on profile
    generateMealPlans(userProfile);
  }, [navigate]);

  const generateMealPlans = async (userProfile: UserProfile) => {
    const targetCalories = calculateTDEE(userProfile);
    const macros = getMacroDistribution(targetCalories, userProfile.dietPreference);

    // Mock meal plans - In real app, this would call Spoonacular API
    const mockPlans: DietPlan[] = [
      {
        id: '1',
        name: `${userProfile.dietPreference} ${t('results.planBalanced')}`,
        description: t('results.descBalanced'),
        image: '/api/placeholder/400/300',
        totalCalories: targetCalories,
        totalNutrition: {
          calories: targetCalories,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
        },
        meals: [],
        dietType: userProfile.dietPreference,
      },
      {
        id: '2',
        name: `${userProfile.dietPreference} ${t('results.planVariety')}`,
        description: t('results.descVariety'),
        image: '/api/placeholder/400/300',
        totalCalories: Math.round(targetCalories * 1.05),
        totalNutrition: {
          calories: Math.round(targetCalories * 1.05),
          protein: Math.round(macros.protein * 1.1),
          carbs: macros.carbs,
          fat: Math.round(macros.fat * 1.05),
        },
        meals: [],
        dietType: userProfile.dietPreference,
      },
      {
        id: '3',
        name: `${userProfile.dietPreference} ${t('results.planSimple')}`,
        description: t('results.descSimple'),
        image: '/api/placeholder/400/300',
        totalCalories: Math.round(targetCalories * 0.95),
        totalNutrition: {
          calories: Math.round(targetCalories * 0.95),
          protein: macros.protein,
          carbs: Math.round(macros.carbs * 0.9),
          fat: macros.fat,
        },
        meals: [],
        dietType: userProfile.dietPreference,
      },
    ];

    setMealPlans(mockPlans);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">{t('results.generating.title')}</h2>
          <p className="text-muted-foreground">{t('results.generating.desc')}</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const targetCalories = calculateTDEE(profile);
  const macros = getMacroDistribution(targetCalories, profile.dietPreference);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Summary */}
        <Card className="mb-8 shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              {t('results.nutritionalProfile')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{targetCalories}</div>
                <div className="text-sm text-muted-foreground">{t('results.dailyCalories')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-rich mb-2">{macros.protein}g</div>
                <div className="text-sm text-muted-foreground">{t('results.proteinTarget')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">{profile.fitnessGoal.replace('_', ' ')}</div>
                <div className="text-sm text-muted-foreground">{t('results.primaryGoal')}</div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="outline">
                <Target className="h-3 w-3 mr-1" />
                {profile.dietPreference.replace('_', ' ')} {t('results.diet')}
              </Badge>
              <Badge variant="outline">
                {t('results.activity')}: {profile.activityLevel.replace('_', ' ')}
              </Badge>
              {profile.allergies.length > 0 && (
                <Badge variant="secondary">
                  {profile.allergies.length} {t('results.allergiesConsidered')}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Meal Plans */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('results.personalizedPlans')}</h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('results.plansCreated').replace('{count}', mealPlans.length.toString())}
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {mealPlans.map((plan) => (
            <Card key={plan.id} className="group hover:shadow-elegant transition-smooth border-0 shadow-card">
              <div className="aspect-video bg-gradient-primary rounded-t-lg flex items-center justify-center">
                <Utensils className="h-16 w-16 text-primary-foreground opacity-80" />
              </div>
              
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-smooth">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{plan.totalCalories}</div>
                      <div className="text-xs text-muted-foreground">{t('results.calories')}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-rich">{plan.totalNutrition.protein}g</div>
                      <div className="text-xs text-muted-foreground">{t('results.protein')}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      {plan.dietType}
                    </Badge>
                  </div>
                  
                  <Link to={`/diet-details/${plan.id}`}>
                    <Button className="w-full group/btn" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      {t('results.viewFullPlan')}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-smooth" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {t('results.needDifferent')}
          </p>
          <Link to="/personalize">
            <Button variant="ghost">
              {t('results.adjustPrefs')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;