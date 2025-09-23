import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ar' | 'zh' | 'ja' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translateText: (text: string, targetLang?: string) => Promise<string>;
  isTranslating: boolean;
  translationCache: Map<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Static translations for UI elements that don't need LibreTranslate
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.getMyPlan': 'Get My Plan',
    'nav.language': 'Language',
    'nav.region': 'Region',

    // Home Page
    'home.hero.title': 'Transform Your Health with Personalized Nutrition',
    'home.hero.subtitle': 'Get custom meal plans tailored to your goals, preferences, and lifestyle. Science-backed nutrition made simple.',
    'home.hero.getStarted': 'Get Started Free',
    'home.hero.browsePlans': 'Browse Diet Plans',
    'home.features.title': 'Why Choose NutriPlan?',
    'home.features.personalized.title': 'Personalized Plans',
    'home.features.personalized.desc': 'Tailored to your unique goals, preferences, and dietary restrictions',
    'home.features.science.title': 'Science-Based',
    'home.features.science.desc': 'Nutritionally balanced plans created by certified dietitians',
    'home.features.easy.title': 'Easy to Follow',
    'home.features.easy.desc': 'Simple recipes with clear instructions and shopping lists',
    'home.plans.title': 'Popular Diet Plans',
    'home.plans.subtitle': 'Discover the perfect eating style for your lifestyle and goals',
    'home.recipes.title': 'Featured Recipes',
    'home.recipes.regional': 'Discover delicious {region} recipes',
    'home.recipes.global': 'Discover delicious recipes from around the world',
    'home.plans.viewAll': 'View All Diet Plans',

    // Common
    'common.loading': 'Loading',
    'common.error': 'Something went wrong',
    'common.viewDetails': 'View Details',
    'common.calories': 'calories',
    'common.protein': 'Protein',
    'common.carbs': 'Carbs',
    'common.fat': 'Fat',
    'common.back': 'Back',

    // Diet Details
    'diet.preparing': 'Preparing your detailed meal plan...',
    'diet.printPlan': 'Print Plan',
    'diet.sevenDayPlan': '7-Day Plan',
    'diet.diet': 'Diet',
    'diet.nutritionTargets': 'Daily Nutrition Targets',
    'diet.nutritionDescription': 'Based on your profile, here are your daily nutritional goals',
    'diet.sampleMeals': 'Sample Day Meals',
    'diet.ingredients': 'Ingredients',
    'diet.nutritionPerServing': 'Nutrition per serving',
    'diet.mealDescription': 'A delicious and nutritious {mealType} designed to meet your dietary requirements',
    'diet.weeklyTips': 'Weekly Planning Tips',
    'diet.tip1': 'Rotate through different recipes each day to maintain variety',
    'diet.tip2': 'Prep ingredients in advance to save time during busy weekdays',
    'diet.tip3': 'Adjust portions based on your hunger levels and activity',
    'diet.tip4': 'Stay hydrated with 8-10 glasses of water throughout the day',

    // Meal Types
    'meal.breakfast': 'Breakfast',
    'meal.lunch': 'Lunch', 
    'meal.dinner': 'Dinner',
    'meal.snack': 'Snack',

    // Personalize Page
    'personalize.title': 'Create Your Personal Profile',
    'personalize.subtitle': 'Tell us about yourself to get the perfect nutrition plan tailored to your needs',
    'personalize.basicInfo': 'Basic Information',
    'personalize.goalsActivity': 'Goals & Activity',
    'personalize.culturalPrefs': 'Cultural Preferences',
    'personalize.allergies': 'Allergies & Intolerances',
    
    // Form Fields
    'form.age': 'Age',
    'form.gender': 'Gender',
    'form.height': 'Height',
    'form.weight': 'Weight (kg)',
    'form.activityLevel': 'Activity Level',
    'form.fitnessGoal': 'Fitness Goal',
    'form.dietPreference': 'Diet Preference',
    'form.selectCuisines': 'Select your preferred cuisines:',
    'form.selectAllergies': 'Select any allergies or dietary restrictions:',
    
    // Form Placeholders
    'form.placeholder.age': 'Enter your age',
    'form.placeholder.gender': 'Select gender',
    'form.placeholder.height': 'Height',
    'form.placeholder.weight': 'Enter your weight',
    'form.placeholder.activity': 'Select activity level',
    'form.placeholder.goal': 'Select your goal',
    'form.placeholder.diet': 'Select diet type',
    
    // Form Options
    'form.option.male': 'Male',
    'form.option.female': 'Female',
    'form.option.other': 'Other',
    'form.option.cm': 'cm',
    'form.option.ft': 'ft',
    'form.option.sedentary': 'Sedentary (Little to no exercise)',
    'form.option.lightlyActive': 'Lightly Active (Light exercise 1-3 days/week)',
    'form.option.active': 'Active (Moderate exercise 3-5 days/week)',
    'form.option.veryActive': 'Very Active (Hard exercise 6-7 days/week)',
    'form.option.loseWeight': 'Lose Weight',
    'form.option.maintain': 'Maintain Current Weight',
    'form.option.gainMuscle': 'Gain Muscle',
    'form.option.balanced': 'Balanced Diet',
    'form.option.keto': 'Ketogenic',
    'form.option.vegan': 'Vegan',
    'form.option.paleo': 'Paleo',
    'form.option.vegetarian': 'Vegetarian',
    'form.option.highProtein': 'High Protein',
    'form.option.mediterranean': 'Mediterranean',
    
    // Cuisines
    'cuisine.mediterranean': 'Mediterranean',
    'cuisine.asian': 'Asian',
    'cuisine.american': 'American',
    'cuisine.indian': 'Indian',
    'cuisine.middleEastern': 'Middle Eastern',
    'cuisine.mexican': 'Mexican',
    'cuisine.european': 'European',
    
    // Allergies
    'allergy.peanuts': 'Peanuts',
    'allergy.treeNuts': 'Tree Nuts',
    'allergy.dairy': 'Dairy',
    'allergy.eggs': 'Eggs',
    'allergy.soy': 'Soy',
    'allergy.gluten': 'Gluten',
    'allergy.shellfish': 'Shellfish',
    'allergy.fish': 'Fish',
    'allergy.sesame': 'Sesame',
    
    // Buttons
    'button.createPlan': 'Create My Personalized Plan',
    
    // Toast Messages
    'toast.invalidAge.title': 'Invalid Age',
    'toast.invalidAge.desc': 'Please enter a valid age between 16 and 120.',
    'toast.invalidWeight.title': 'Invalid Weight',
    'toast.invalidWeight.desc': 'Please enter a valid weight between 30 and 300 kg.',
    'toast.missingInfo.title': 'Missing Information',
    'toast.missingInfo.desc': 'Please fill in all required fields.',
    'toast.profileCreated.title': 'Profile Created!',
    'toast.profileCreated.desc': 'Generating your personalized meal plans...',
    
    // Results Page
    'results.generating.title': 'Generating Your Plans',
    'results.generating.desc': 'Creating personalized meal plans based on your profile...',
    'results.nutritionalProfile': 'Your Nutritional Profile',
    'results.dailyCalories': 'Daily Calories',
    'results.proteinTarget': 'Protein Target',
    'results.primaryGoal': 'Primary Goal',
    'results.diet': 'Diet',
    'results.activity': 'Activity',
    'results.allergiesConsidered': 'Allergies Considered',
    'results.personalizedPlans': 'Your Personalized Meal Plans',
    'results.plansCreated': 'We\'ve created {count} customized plans based on your profile. Choose the one that fits your lifestyle best.',
    'results.planBalanced': 'Plan - Balanced',
    'results.planVariety': 'Plan - High Variety',
    'results.planSimple': 'Plan - Quick & Simple',
    'results.descBalanced': 'A well-rounded approach focusing on whole foods and balanced nutrition.',
    'results.descVariety': 'Diverse meal options with international flavors and seasonal ingredients.',
    'results.descSimple': 'Easy-to-prepare meals perfect for busy lifestyles without compromising nutrition.',
    'results.calories': 'Calories',
    'results.protein': 'Protein',
    'results.viewFullPlan': 'View Full Plan',
    'results.needDifferent': 'Need a different approach?',
    'results.adjustPrefs': 'Adjust My Preferences',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.getMyPlan': 'Mi Plan',
    'nav.language': 'Idioma',
    'nav.region': 'Región',

    // Home Page
    'home.hero.title': 'Transforma Tu Salud con Nutrición Personalizada',
    'home.hero.subtitle': 'Obtén planes de comidas personalizados adaptados a tus objetivos, preferencias y estilo de vida.',
    'home.hero.getStarted': 'Comenzar Gratis',
    'home.hero.browsePlans': 'Ver Planes',
    'home.features.title': '¿Por Qué Elegir NutriPlan?',
    'home.features.personalized.title': 'Planes Personalizados',
    'home.features.personalized.desc': 'Adaptados a tus objetivos únicos, preferencias y restricciones dietéticas',
    'home.features.science.title': 'Basado en Ciencia',
    'home.features.science.desc': 'Planes nutricionalmente balanceados creados por dietistas certificados',
    'home.features.easy.title': 'Fácil de Seguir',
    'home.features.easy.desc': 'Recetas simples con instrucciones claras y listas de compras',
    'home.plans.title': 'Planes de Dieta Populares',
    'home.plans.subtitle': 'Descubre el estilo de alimentación perfecto para tu estilo de vida y objetivos',
    'home.recipes.title': 'Recetas Destacadas',
    'home.recipes.regional': 'Descubre deliciosas recetas de {region}',
    'home.recipes.global': 'Descubre deliciosas recetas de todo el mundo',
    'home.plans.viewAll': 'Ver Todos los Planes de Dieta',

    // Common
    'common.loading': 'Cargando',
    'common.error': 'Algo salió mal',
    'common.viewDetails': 'Ver Detalles',
    'common.calories': 'calorías',
    'common.protein': 'Proteína',
    'common.carbs': 'Carbohidratos',
    'common.fat': 'Grasa',
    'common.back': 'Atrás',

    // Diet Details
    'diet.preparing': 'Preparando tu plan de comidas detallado...',
    'diet.printPlan': 'Imprimir Plan',
    'diet.sevenDayPlan': 'Plan de 7 Días',
    'diet.diet': 'Dieta',
    'diet.nutritionTargets': 'Objetivos Nutricionales Diarios',
    'diet.nutritionDescription': 'Basado en tu perfil, estos son tus objetivos nutricionales diarios',
    'diet.sampleMeals': 'Comidas de Ejemplo del Día',
    'diet.ingredients': 'Ingredientes',
    'diet.nutritionPerServing': 'Nutrición por porción',
    'diet.mealDescription': 'Un {mealType} delicioso y nutritivo diseñado para cumplir tus requisitos dietéticos',
    'diet.weeklyTips': 'Consejos de Planificación Semanal',
    'diet.tip1': 'Rota diferentes recetas cada día para mantener la variedad',
    'diet.tip2': 'Prepara ingredientes con anticipación para ahorrar tiempo en días ocupados',
    'diet.tip3': 'Ajusta las porciones según tus niveles de hambre y actividad',
    'diet.tip4': 'Mantente hidratado con 8-10 vasos de agua durante el día',

    // Meal Types
    'meal.breakfast': 'Desayuno',
    'meal.lunch': 'Almuerzo', 
    'meal.dinner': 'Cena',
    'meal.snack': 'Merienda',

    // Personalize Page
    'personalize.title': 'Crea Tu Perfil Personal',
    'personalize.subtitle': 'Cuéntanos sobre ti para obtener el plan de nutrición perfecto adaptado a tus necesidades',
    'personalize.basicInfo': 'Información Básica',
    'personalize.goalsActivity': 'Objetivos y Actividad',
    'personalize.culturalPrefs': 'Preferencias Culturales',
    'personalize.allergies': 'Alergias e Intolerancias',
    
    // Form Fields
    'form.age': 'Edad',
    'form.gender': 'Género',
    'form.height': 'Altura',
    'form.weight': 'Peso (kg)',
    'form.activityLevel': 'Nivel de Actividad',
    'form.fitnessGoal': 'Objetivo Fitness',
    'form.dietPreference': 'Preferencia de Dieta',
    'form.selectCuisines': 'Selecciona tus cocinas preferidas:',
    'form.selectAllergies': 'Selecciona cualquier alergia o restricción dietética:',
    
    // Form Placeholders
    'form.placeholder.age': 'Ingresa tu edad',
    'form.placeholder.gender': 'Selecciona género',
    'form.placeholder.height': 'Altura',
    'form.placeholder.weight': 'Ingresa tu peso',
    'form.placeholder.activity': 'Selecciona nivel de actividad',
    'form.placeholder.goal': 'Selecciona tu objetivo',
    'form.placeholder.diet': 'Selecciona tipo de dieta',
    
    // Form Options
    'form.option.male': 'Masculino',
    'form.option.female': 'Femenino',
    'form.option.other': 'Otro',
    'form.option.cm': 'cm',
    'form.option.ft': 'ft',
    'form.option.sedentary': 'Sedentario (Poco o nada de ejercicio)',
    'form.option.lightlyActive': 'Ligeramente Activo (Ejercicio ligero 1-3 días/semana)',
    'form.option.active': 'Activo (Ejercicio moderado 3-5 días/semana)',
    'form.option.veryActive': 'Muy Activo (Ejercicio intenso 6-7 días/semana)',
    'form.option.loseWeight': 'Perder Peso',
    'form.option.maintain': 'Mantener Peso Actual',
    'form.option.gainMuscle': 'Ganar Músculo',
    'form.option.balanced': 'Dieta Balanceada',
    'form.option.keto': 'Cetogénica',
    'form.option.vegan': 'Vegana',
    'form.option.paleo': 'Paleo',
    'form.option.vegetarian': 'Vegetariana',
    'form.option.highProtein': 'Alta en Proteína',
    'form.option.mediterranean': 'Mediterránea',
    
    // Cuisines
    'cuisine.mediterranean': 'Mediterránea',
    'cuisine.asian': 'Asiática',
    'cuisine.american': 'Americana',
    'cuisine.indian': 'India',
    'cuisine.middleEastern': 'Medio Oriental',
    'cuisine.mexican': 'Mexicana',
    'cuisine.european': 'Europea',
    
    // Allergies
    'allergy.peanuts': 'Cacahuetes',
    'allergy.treeNuts': 'Frutos Secos',
    'allergy.dairy': 'Lácteos',
    'allergy.eggs': 'Huevos',
    'allergy.soy': 'Soja',
    'allergy.gluten': 'Gluten',
    'allergy.shellfish': 'Mariscos',
    'allergy.fish': 'Pescado',
    'allergy.sesame': 'Sésamo',
    
    // Buttons
    'button.createPlan': 'Crear Mi Plan Personalizado',
    
    // Toast Messages
    'toast.invalidAge.title': 'Edad Inválida',
    'toast.invalidAge.desc': 'Por favor ingresa una edad válida entre 16 y 120.',
    'toast.invalidWeight.title': 'Peso Inválido',
    'toast.invalidWeight.desc': 'Por favor ingresa un peso válido entre 30 y 300 kg.',
    'toast.missingInfo.title': 'Información Faltante',
    'toast.missingInfo.desc': 'Por favor completa todos los campos requeridos.',
    'toast.profileCreated.title': '¡Perfil Creado!',
    'toast.profileCreated.desc': 'Generando tus planes de comida personalizados...',
    
    // Results Page
    'results.generating.title': 'Generando Tus Planes',
    'results.generating.desc': 'Creando planes de comida personalizados basados en tu perfil...',
    'results.nutritionalProfile': 'Tu Perfil Nutricional',
    'results.dailyCalories': 'Calorías Diarias',
    'results.proteinTarget': 'Objetivo de Proteína',
    'results.primaryGoal': 'Objetivo Principal',
    'results.diet': 'Dieta',
    'results.activity': 'Actividad',
    'results.allergiesConsidered': 'Alergias Consideradas',
    'results.personalizedPlans': 'Tus Planes de Comida Personalizados',
    'results.plansCreated': 'Hemos creado {count} planes personalizados basados en tu perfil. Elige el que mejor se adapte a tu estilo de vida.',
    'results.planBalanced': 'Plan - Balanceado',
    'results.planVariety': 'Plan - Alta Variedad',
    'results.planSimple': 'Plan - Rápido y Simple',
    'results.descBalanced': 'Un enfoque integral centrado en alimentos integrales y nutrición equilibrada.',
    'results.descVariety': 'Opciones de comida diversas con sabores internacionales e ingredientes de temporada.',
    'results.descSimple': 'Comidas fáciles de preparar perfectas para estilos de vida ocupados sin comprometer la nutrición.',
    'results.calories': 'Calorías',
    'results.protein': 'Proteína',
    'results.viewFullPlan': 'Ver Plan Completo',
    'results.needDifferent': '¿Necesitas un enfoque diferente?',
    'results.adjustPrefs': 'Ajustar Mis Preferencias',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.getMyPlan': 'Mon Plan',
    'nav.language': 'Langue',
    'nav.region': 'Région',

    // Home Page
    'home.hero.title': 'Transformez Votre Santé avec une Nutrition Personnalisée',
    'home.hero.subtitle': 'Obtenez des plans de repas personnalisés adaptés à vos objectifs, préférences et style de vie.',
    'home.hero.getStarted': 'Commencer Gratuitement',
    'home.hero.browsePlans': 'Voir les Plans',
    'home.features.title': 'Pourquoi Choisir NutriPlan ?',
    'home.features.personalized.title': 'Plans Personnalisés',
    'home.features.personalized.desc': 'Adaptés à vos objectifs uniques, préférences et restrictions alimentaires',
    'home.features.science.title': 'Basé sur la Science',
    'home.features.science.desc': 'Plans nutritionnellement équilibrés créés par des diététiciens certifiés',
    'home.features.easy.title': 'Facile à Suivre',
    'home.features.easy.desc': 'Recettes simples avec des instructions claires et des listes de courses',
    'home.plans.title': 'Plans Alimentaires Populaires',
    'home.plans.subtitle': 'Découvrez le style alimentaire parfait pour votre mode de vie et vos objectifs',
    'home.recipes.title': 'Recettes en Vedette',
    'home.recipes.regional': 'Découvrez de délicieuses recettes de {region}',
    'home.recipes.global': 'Découvrez de délicieuses recettes du monde entier',
    'home.plans.viewAll': 'Voir Tous les Plans Alimentaires',

    // Common
    'common.loading': 'Chargement',
    'common.error': 'Quelque chose s\'est mal passé',
    'common.viewDetails': 'Voir les Détails',
    'common.calories': 'calories',
    'common.protein': 'Protéine',
    'common.carbs': 'Glucides',
    'common.fat': 'Graisse',
    'common.back': 'Retour',

    // Diet Details
    'diet.preparing': 'Préparation de votre plan de repas détaillé...',
    'diet.printPlan': 'Imprimer le Plan',
    'diet.sevenDayPlan': 'Plan de 7 Jours',
    'diet.diet': 'Régime',
    'diet.nutritionTargets': 'Objectifs Nutritionnels Quotidiens',
    'diet.nutritionDescription': 'Basé sur votre profil, voici vos objectifs nutritionnels quotidiens',
    'diet.sampleMeals': 'Exemples de Repas du Jour',
    'diet.ingredients': 'Ingrédients',
    'diet.nutritionPerServing': 'Nutrition par portion',
    'diet.mealDescription': 'Un {mealType} délicieux et nutritif conçu pour répondre à vos exigences alimentaires',
    'diet.weeklyTips': 'Conseils de Planification Hebdomadaire',
    'diet.tip1': 'Alternez différentes recettes chaque jour pour maintenir la variété',
    'diet.tip2': 'Préparez les ingrédients à l\'avance pour gagner du temps les jours chargés',
    'diet.tip3': 'Ajustez les portions selon vos niveaux de faim et d\'activité',
    'diet.tip4': 'Restez hydraté avec 8-10 verres d\'eau tout au long de la journée',

    // Meal Types
    'meal.breakfast': 'Petit-déjeuner',
    'meal.lunch': 'Déjeuner', 
    'meal.dinner': 'Dîner',
    'meal.snack': 'Collation',

    // Personalize Page
    'personalize.title': 'Créez Votre Profil Personnel',
    'personalize.subtitle': 'Parlez-nous de vous pour obtenir le plan nutritionnel parfait adapté à vos besoins',
    'personalize.basicInfo': 'Informations de Base',
    'personalize.goalsActivity': 'Objectifs et Activité',
    'personalize.culturalPrefs': 'Préférences Culturelles',
    'personalize.allergies': 'Allergies et Intolérances',
    
    // Form Fields
    'form.age': 'Âge',
    'form.gender': 'Genre',
    'form.height': 'Taille',
    'form.weight': 'Poids (kg)',
    'form.activityLevel': 'Niveau d\'Activité',
    'form.fitnessGoal': 'Objectif Fitness',
    'form.dietPreference': 'Préférence Alimentaire',
    'form.selectCuisines': 'Sélectionnez vos cuisines préférées:',
    'form.selectAllergies': 'Sélectionnez toute allergie ou restriction alimentaire:',
    
    // Form Placeholders
    'form.placeholder.age': 'Entrez votre âge',
    'form.placeholder.gender': 'Sélectionnez le genre',
    'form.placeholder.height': 'Taille',
    'form.placeholder.weight': 'Entrez votre poids',
    'form.placeholder.activity': 'Sélectionnez le niveau d\'activité',
    'form.placeholder.goal': 'Sélectionnez votre objectif',
    'form.placeholder.diet': 'Sélectionnez le type de régime',
    
    // Form Options
    'form.option.male': 'Homme',
    'form.option.female': 'Femme',
    'form.option.other': 'Autre',
    'form.option.cm': 'cm',
    'form.option.ft': 'ft',
    'form.option.sedentary': 'Sédentaire (Peu ou pas d\'exercice)',
    'form.option.lightlyActive': 'Légèrement Actif (Exercice léger 1-3 jours/semaine)',
    'form.option.active': 'Actif (Exercice modéré 3-5 jours/semaine)',
    'form.option.veryActive': 'Très Actif (Exercice intense 6-7 jours/semaine)',
    'form.option.loseWeight': 'Perdre du Poids',
    'form.option.maintain': 'Maintenir le Poids Actuel',
    'form.option.gainMuscle': 'Gagner du Muscle',
    'form.option.balanced': 'Régime Équilibré',
    'form.option.keto': 'Cétogène',
    'form.option.vegan': 'Végétalien',
    'form.option.paleo': 'Paléo',
    'form.option.vegetarian': 'Végétarien',
    'form.option.highProtein': 'Riche en Protéines',
    'form.option.mediterranean': 'Méditerranéen',
    
    // Cuisines
    'cuisine.mediterranean': 'Méditerranéenne',
    'cuisine.asian': 'Asiatique',
    'cuisine.american': 'Américaine',
    'cuisine.indian': 'Indienne',
    'cuisine.middleEastern': 'Moyen-Oriental',
    'cuisine.mexican': 'Mexicaine',
    'cuisine.european': 'Européenne',
    
    // Allergies
    'allergy.peanuts': 'Cacahuètes',
    'allergy.treeNuts': 'Noix',
    'allergy.dairy': 'Produits Laitiers',
    'allergy.eggs': 'Œufs',
    'allergy.soy': 'Soja',
    'allergy.gluten': 'Gluten',
    'allergy.shellfish': 'Fruits de Mer',
    'allergy.fish': 'Poisson',
    'allergy.sesame': 'Sésame',
    
    // Buttons
    'button.createPlan': 'Créer Mon Plan Personnalisé',
    
    // Toast Messages
    'toast.invalidAge.title': 'Âge Invalide',
    'toast.invalidAge.desc': 'Veuillez entrer un âge valide entre 16 et 120.',
    'toast.invalidWeight.title': 'Poids Invalide',
    'toast.invalidWeight.desc': 'Veuillez entrer un poids valide entre 30 et 300 kg.',
    'toast.missingInfo.title': 'Informations Manquantes',
    'toast.missingInfo.desc': 'Veuillez remplir tous les champs obligatoires.',
    'toast.profileCreated.title': 'Profil Créé!',
    'toast.profileCreated.desc': 'Génération de vos plans de repas personnalisés...',
    
    // Results Page
    'results.generating.title': 'Génération de Vos Plans',
    'results.generating.desc': 'Création de plans de repas personnalisés basés sur votre profil...',
    'results.nutritionalProfile': 'Votre Profil Nutritionnel',
    'results.dailyCalories': 'Calories Quotidiennes',
    'results.proteinTarget': 'Objectif Protéine',
    'results.primaryGoal': 'Objectif Principal',
    'results.diet': 'Régime',
    'results.activity': 'Activité',
    'results.allergiesConsidered': 'Allergies Considérées',
    'results.personalizedPlans': 'Vos Plans de Repas Personnalisés',
    'results.plansCreated': 'Nous avons créé {count} plans personnalisés basés sur votre profil. Choisissez celui qui convient le mieux à votre style de vie.',
    'results.planBalanced': 'Plan - Équilibré',
    'results.planVariety': 'Plan - Haute Variété',
    'results.planSimple': 'Plan - Rapide et Simple',
    'results.descBalanced': 'Une approche équilibrée axée sur les aliments complets et la nutrition équilibrée.',
    'results.descVariety': 'Options de repas diversifiées avec des saveurs internationales et des ingrédients de saison.',
    'results.descSimple': 'Repas faciles à préparer parfaits pour les modes de vie occupés sans compromettre la nutrition.',
    'results.calories': 'Calories',
    'results.protein': 'Protéine',
    'results.viewFullPlan': 'Voir le Plan Complet',
    'results.needDifferent': 'Besoin d\'une approche différente?',
    'results.adjustPrefs': 'Ajuster Mes Préférences',
  }
};

// Language code mapping for LibreTranslate
const languageCodeMap: Record<Language, string> = {
  en: "en",
  es: "es", 
  fr: "fr",
  de: "de",
  it: "it",
  ar: "ar",
  zh: "zh-CN",
  ja: "ja",
  ur: "ur",
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache] = useState(new Map<string, string>());

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const translateText = async (
    text: string,
    targetLang?: string
  ): Promise<string> => {
    const targetLanguage = targetLang || language;

    // Don't translate if target language is English or same as current
    if (targetLanguage === "en" || !text?.trim()) {
      return text;
    }

    // Map language to target code
    const targetCode = languageCodeMap[targetLanguage as Language] || "en";

    // Check cache first
    const cacheKey = `${text}:${targetLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    setIsTranslating(true);

    try {
      const apiKey = import.meta.env.VITE_LIBRETRANSLATE_API_KEY;
      const baseUrl =
        import.meta.env.VITE_LIBRETRANSLATE_URL || "https://libretranslate.de";

      if (!baseUrl) {
        console.warn(
          "LibreTranslate URL not configured. Returning original text."
        );
        return text;
      }

      const requestBody: any = {
        q: text,
        source: "en",
        target: targetCode,
        format: "text",
      };

      // Add API key if provided (some LibreTranslate instances require it)
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
      const translatedText = data.translatedText;

      // Cache the translation
      translationCache.set(cacheKey, translatedText);

      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text if translation fails
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translateText,
        isTranslating,
        translationCache,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};