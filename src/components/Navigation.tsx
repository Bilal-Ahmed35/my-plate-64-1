// import { Link, useLocation } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Utensils, User, Home, Globe, MapPin } from 'lucide-react';
// import { useLanguage, Language } from '@/contexts/LanguageContext';
// import { useRegion, Region } from '@/contexts/RegionContext';

// const Navigation = () => {
//   const location = useLocation();
//   const { language, setLanguage, t } = useLanguage();
//   const { region, setRegion, getRegionName } = useRegion();

//   const languages: { value: Language; label: string; flag: string }[] = [
//     { value: 'en', label: 'English', flag: '🇺🇸' },
//     { value: 'es', label: 'Español', flag: '🇪🇸' },
//     { value: 'fr', label: 'Français', flag: '🇫🇷' },
//     { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
//     { value: 'it', label: 'Italiano', flag: '🇮🇹' },
//     { value: 'ar', label: 'العربية', flag: '🇸🇦' },
//     { value: 'zh', label: '中文', flag: '🇨🇳' },
//     { value: 'ja', label: '日本語', flag: '🇯🇵' },
//   ];

//   const regions: { value: Region; label: string; flag: string }[] = [
//     { value: 'global', label: 'Global', flag: '🌍' },
//     { value: 'asian', label: 'Asian', flag: '🥢' },
//     { value: 'mediterranean', label: 'Mediterranean', flag: '🫒' },
//     { value: 'american', label: 'American', flag: '🇺🇸' },
//     { value: 'indian', label: 'Indian', flag: '🇮🇳' },
//     { value: 'middle_eastern', label: 'Middle Eastern', flag: '🧿' },
//     { value: 'european', label: 'European', flag: '🇪🇺' },
//     { value: 'latin_american', label: 'Latin American', flag: '🌶️' },
//   ];

//   return (
//     <nav className="bg-card border-b border-border shadow-card">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <Utensils className="h-8 w-8 text-primary" />
//             <h1 className="text-2xl font-bold text-primary">NutriPlan</h1>
//           </Link>

//           <div className="flex items-center gap-3">
//             {/* Language Selector */}
//             <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
//               <SelectTrigger className="w-[140px] h-9 bg-background/80 border-border">
//                 <div className="flex items-center gap-2">
//                   <Globe className="h-4 w-4 text-muted-foreground" />
//                   <SelectValue placeholder={t('nav.language')} />
//                 </div>
//               </SelectTrigger>
//               <SelectContent className="bg-background border-border">
//                 {languages.map((lang) => (
//                   <SelectItem key={lang.value} value={lang.value} className="cursor-pointer">
//                     <div className="flex items-center gap-2">
//                       <span>{lang.flag}</span>
//                       <span>{lang.label}</span>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Region Selector */}
//             <Select value={region} onValueChange={(value: Region) => setRegion(value)}>
//               <SelectTrigger className="w-[140px] h-9 bg-background/80 border-border">
//                 <div className="flex items-center gap-2">
//                   <MapPin className="h-4 w-4 text-muted-foreground" />
//                   <SelectValue placeholder={t('nav.region')} />
//                 </div>
//               </SelectTrigger>
//               <SelectContent className="bg-background border-border">
//                 {regions.map((reg) => (
//                   <SelectItem key={reg.value} value={reg.value} className="cursor-pointer">
//                     <div className="flex items-center gap-2">
//                       <span>{reg.flag}</span>
//                       <span>{reg.label}</span>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Link to="/">
//               <Button
//                 variant={location.pathname === '/' ? 'default' : 'ghost'}
//                 size="sm"
//                 className="gap-2"
//               >
//                 <Home className="h-4 w-4" />
//                 {t('nav.home')}
//               </Button>
//             </Link>
//             <Link to="/personalize">
//               <Button
//                 variant={location.pathname === '/personalize' ? 'hero' : 'outline'}
//                 size="sm"
//                 className="gap-2"
//               >
//                 <User className="h-4 w-4" />
//                 {t('nav.getMyPlan')}
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Utensils, User, Home, Globe, MapPin } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useRegion, Region } from "@/contexts/RegionContext";

const Navigation = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { region, setRegion, getRegionName, getRegionFlag } = useRegion();

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "de", label: "Deutsch", flag: "🇩🇪" },
    { value: "it", label: "Italiano", flag: "🇮🇹" },
    { value: "ar", label: "العربية", flag: "🇸🇦" },
    { value: "zh", label: "中文", flag: "🇨🇳" },
    { value: "ja", label: "日本語", flag: "🇯🇵" },
    { value: "ur", label: "اردو", flag: "🇵🇰" },
  ];

  const regions: { value: Region; label: string; flag: string }[] = [
    { value: "global", label: "Global", flag: "🌍" },
    { value: "american", label: "American", flag: "🇺🇸" },
    { value: "asian", label: "Asian", flag: "🥢" },
    { value: "east_asian", label: "East Asian", flag: "🍜" },
    { value: "south_asian", label: "South Asian", flag: "🍛" },
    { value: "mediterranean", label: "Mediterranean", flag: "🫒" },
    { value: "middle_eastern", label: "Middle Eastern", flag: "🧿" },
    { value: "european", label: "European", flag: "🇪🇺" },
    { value: "nordic", label: "Nordic", flag: "🇳🇴" },
    { value: "indian", label: "Indian", flag: "🇮🇳" },
    { value: "latin_american", label: "Latin American", flag: "🌶️" },
    { value: "african", label: "African", flag: "🦁" },
    { value: "caribbean", label: "Caribbean", flag: "🏝️" },
    { value: "oceanian", label: "Oceanian", flag: "🦘" },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Utensils className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">NutriPlan</h1>
          </Link>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <Select
              value={language}
              onValueChange={(value: Language) => setLanguage(value)}
            >
              <SelectTrigger className="w-[140px] h-9 bg-background/80 border-border">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder={t("nav.language")} />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-background border-border max-h-[300px] overflow-y-auto">
                {languages.map((lang) => (
                  <SelectItem
                    key={lang.value}
                    value={lang.value}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Region Selector */}
            <Select
              value={region}
              onValueChange={(value: Region) => setRegion(value)}
            >
              <SelectTrigger className="w-[160px] h-9 bg-background/80 border-border">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder={t("nav.region")} />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-background border-border max-h-[300px] overflow-y-auto">
                {regions.map((reg) => (
                  <SelectItem
                    key={reg.value}
                    value={reg.value}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{reg.flag}</span>
                      <span>{reg.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                {t("nav.home")}
              </Button>
            </Link>
            <Link to="/personalize">
              <Button
                variant={
                  location.pathname === "/personalize" ? "hero" : "outline"
                }
                size="sm"
                className="gap-2"
              >
                <User className="h-4 w-4" />
                {t("nav.getMyPlan")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
