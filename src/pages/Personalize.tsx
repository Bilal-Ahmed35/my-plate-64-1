import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { UserProfile, UserProfileForm } from '@/types/diet';
import { useNavigate } from 'react-router-dom';
import { User, Target, Activity, MapPin, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Personalize = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfileForm>({
    age: 0,
    gender: undefined,
    height: { value: 0, unit: 'cm' },
    weight: 0,
    activityLevel: undefined,
    fitnessGoal: undefined,
    dietPreference: undefined,
    regions: [],
    allergies: [],
  });

  const allergyOptions = [
    { key: 'peanuts', label: t('allergy.peanuts') },
    { key: 'treeNuts', label: t('allergy.treeNuts') },
    { key: 'dairy', label: t('allergy.dairy') },
    { key: 'eggs', label: t('allergy.eggs') },
    { key: 'soy', label: t('allergy.soy') },
    { key: 'gluten', label: t('allergy.gluten') },
    { key: 'shellfish', label: t('allergy.shellfish') },
    { key: 'fish', label: t('allergy.fish') },
    { key: 'sesame', label: t('allergy.sesame') }
  ];

  const regionOptions = [
    { key: 'mediterranean', label: t('cuisine.mediterranean') },
    { key: 'asian', label: t('cuisine.asian') },
    { key: 'american', label: t('cuisine.american') },
    { key: 'indian', label: t('cuisine.indian') },
    { key: 'middleEastern', label: t('cuisine.middleEastern') },
    { key: 'mexican', label: t('cuisine.mexican') },
    { key: 'european', label: t('cuisine.european') }
  ];

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      allergies: checked 
        ? [...prev.allergies, allergy]
        : prev.allergies.filter(a => a !== allergy)
    }));
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      regions: checked 
        ? [...prev.regions, region]
        : prev.regions.filter(r => r !== region)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile.age < 16 || profile.age > 120) {
      toast({
        title: t('toast.invalidAge.title'),
        description: t('toast.invalidAge.desc'),
        variant: "destructive"
      });
      return;
    }

    if (profile.weight < 30 || profile.weight > 300) {
      toast({
        title: t('toast.invalidWeight.title'),
        description: t('toast.invalidWeight.desc'),
        variant: "destructive"
      });
      return;
    }

    if (!profile.gender || !profile.activityLevel || !profile.fitnessGoal || !profile.dietPreference) {
      toast({
        title: t('toast.missingInfo.title'),
        description: t('toast.missingInfo.desc'),
        variant: "destructive"
      });
      return;
    }

    // Store profile and navigate to results
    const completeProfile: UserProfile = profile as UserProfile;
    localStorage.setItem('userProfile', JSON.stringify(completeProfile));
    navigate('/results');
    
    toast({
      title: t('toast.profileCreated.title'),
      description: t('toast.profileCreated.desc'),
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('personalize.title')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('personalize.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  {t('personalize.basicInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">{t('form.age')}</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile(prev => ({ ...prev, age: Number(e.target.value) }))}
                      placeholder={t('form.placeholder.age')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">{t('form.gender')}</Label>
                    <Select value={profile.gender} onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value as any }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.placeholder.gender')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t('form.option.male')}</SelectItem>
                        <SelectItem value="female">{t('form.option.female')}</SelectItem>
                        <SelectItem value="other">{t('form.option.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>{t('form.height')}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={profile.height.value}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        height: { ...prev.height, value: Number(e.target.value) }
                      }))}
                      placeholder={t('form.placeholder.height')}
                      required
                    />
                    <Select value={profile.height.unit} onValueChange={(value) => setProfile(prev => ({ 
                      ...prev, 
                      height: { ...prev.height, unit: value as 'cm' | 'ft' }
                    }))}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">{t('form.option.cm')}</SelectItem>
                        <SelectItem value="ft">{t('form.option.ft')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="weight">{t('form.weight')}</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile(prev => ({ ...prev, weight: Number(e.target.value) }))}
                    placeholder={t('form.placeholder.weight')}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Goals & Activity */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-secondary-rich" />
                  {t('personalize.goalsActivity')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>{t('form.activityLevel')}</Label>
                  <Select value={profile.activityLevel} onValueChange={(value) => setProfile(prev => ({ ...prev, activityLevel: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.placeholder.activity')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">{t('form.option.sedentary')}</SelectItem>
                      <SelectItem value="lightly_active">{t('form.option.lightlyActive')}</SelectItem>
                      <SelectItem value="active">{t('form.option.active')}</SelectItem>
                      <SelectItem value="very_active">{t('form.option.veryActive')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{t('form.fitnessGoal')}</Label>
                  <Select value={profile.fitnessGoal} onValueChange={(value) => setProfile(prev => ({ ...prev, fitnessGoal: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.placeholder.goal')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose_weight">{t('form.option.loseWeight')}</SelectItem>
                      <SelectItem value="maintain">{t('form.option.maintain')}</SelectItem>
                      <SelectItem value="gain_muscle">{t('form.option.gainMuscle')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{t('form.dietPreference')}</Label>
                  <Select value={profile.dietPreference} onValueChange={(value) => setProfile(prev => ({ ...prev, dietPreference: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.placeholder.diet')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">{t('form.option.balanced')}</SelectItem>
                      <SelectItem value="keto">{t('form.option.keto')}</SelectItem>
                      <SelectItem value="vegan">{t('form.option.vegan')}</SelectItem>
                      <SelectItem value="paleo">{t('form.option.paleo')}</SelectItem>
                      <SelectItem value="vegetarian">{t('form.option.vegetarian')}</SelectItem>
                      <SelectItem value="high_protein">{t('form.option.highProtein')}</SelectItem>
                      <SelectItem value="mediterranean">{t('form.option.mediterranean')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-success" />
                  {t('personalize.culturalPrefs')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label className="text-base mb-3 block">{t('form.selectCuisines')}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {regionOptions.map((region) => (
                    <div key={region.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={region.key}
                        checked={profile.regions.includes(region.key)}
                        onCheckedChange={(checked) => handleRegionChange(region.key, checked as boolean)}
                      />
                      <Label htmlFor={region.key} className="text-sm font-normal cursor-pointer">
                        {region.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  {t('personalize.allergies')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label className="text-base mb-3 block">{t('form.selectAllergies')}</Label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {allergyOptions.map((allergy) => (
                    <div key={allergy.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={allergy.key}
                        checked={profile.allergies.includes(allergy.key)}
                        onCheckedChange={(checked) => handleAllergyChange(allergy.key, checked as boolean)}
                      />
                      <Label htmlFor={allergy.key} className="text-sm font-normal cursor-pointer">
                        {allergy.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {profile.allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.allergies.map((allergyKey) => {
                      const allergy = allergyOptions.find(a => a.key === allergyKey);
                      return (
                        <Badge key={allergyKey} variant="secondary">
                          {allergy?.label}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button type="submit" variant="premium" size="lg" className="px-12 py-4 text-lg">
              {t('button.createPlan')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Personalize;