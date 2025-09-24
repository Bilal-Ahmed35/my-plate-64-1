import React, { createContext, useContext, useState, ReactNode } from "react";

export type Region =
  | "global"
  | "asian"
  | "mediterranean"
  | "american"
  | "indian"
  | "middle_eastern"
  | "european"
  | "latin_american"
  | "south_asian"
  | "east_asian"
  | "african"
  | "nordic"
  | "caribbean"
  | "oceanian"
  | "scandinavian" // 👈 added
  | "eastern_european"; // 👈 added

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  getRegionName: (region: Region) => string;
  getRegionCuisineQuery: (region: Region) => string;
  getRegionFlag: (region: Region) => string;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

const regionData = {
  global: {
    name: "Global",
    flag: "🌍",
    cuisineQuery: "",
    spoonacularCuisines: [
      "american",
      "asian",
      "european",
      "mediterranean",
      "middle eastern",
    ],
  },
  asian: {
    name: "Asian",
    flag: "🥢",
    cuisineQuery: "asian",
    spoonacularCuisines: [
      "chinese",
      "japanese",
      "korean",
      "thai",
      "vietnamese",
      "asian",
    ],
  },
  east_asian: {
    name: "East Asian",
    flag: "🍜",
    cuisineQuery: "east asian",
    spoonacularCuisines: ["chinese", "japanese", "korean"],
  },
  south_asian: {
    name: "South Asian",
    flag: "🍛",
    cuisineQuery: "south asian",
    spoonacularCuisines: ["indian", "thai", "vietnamese"],
  },
  mediterranean: {
    name: "Mediterranean",
    flag: "🫒",
    cuisineQuery: "mediterranean",
    spoonacularCuisines: ["mediterranean", "greek", "italian"],
  },
  american: {
    name: "American",
    flag: "🇺🇸",
    cuisineQuery: "american",
    spoonacularCuisines: ["american"],
  },
  indian: {
    name: "Indian",
    flag: "🇮🇳",
    cuisineQuery: "indian",
    spoonacularCuisines: ["indian"],
  },
  middle_eastern: {
    name: "Middle Eastern",
    flag: "🧿",
    cuisineQuery: "middle eastern",
    spoonacularCuisines: ["middle eastern"],
  },
  european: {
    name: "European",
    flag: "🇪🇺",
    cuisineQuery: "european",
    spoonacularCuisines: ["french", "italian", "german", "british", "european"],
  },
  nordic: {
    name: "Nordic",
    flag: "🇳🇴",
    cuisineQuery: "nordic",
    spoonacularCuisines: ["german", "european"],
  },
  latin_american: {
    name: "Latin American",
    flag: "🌶️",
    cuisineQuery: "latin american",
    spoonacularCuisines: ["mexican", "spanish"],
  },
  african: {
    name: "African",
    flag: "🦁",
    cuisineQuery: "african",
    spoonacularCuisines: ["african"],
  },
  caribbean: {
    name: "Caribbean",
    flag: "🏝️",
    cuisineQuery: "caribbean",
    spoonacularCuisines: ["caribbean"],
  },
  oceanian: {
    name: "Oceanian",
    flag: "🦘",
    cuisineQuery: "oceanian",
    spoonacularCuisines: ["american", "asian"], // Fallback as Spoonacular has limited Oceanian
  },
};

export const RegionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [region, setRegion] = useState<Region>("global");

  const getRegionName = (region: Region): string => {
    return regionData[region]?.name || region;
  };

  const getRegionCuisineQuery = (region: Region): string => {
    return regionData[region]?.cuisineQuery || "";
  };

  const getRegionFlag = (region: Region): string => {
    return regionData[region]?.flag || "🌍";
  };

  return (
    <RegionContext.Provider
      value={{
        region,
        setRegion,
        getRegionName,
        getRegionCuisineQuery,
        getRegionFlag,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};

// Helper function to get Spoonacular cuisine parameters for API calls
export const getSpoonacularCuisines = (region: Region): string[] => {
  return regionData[region]?.spoonacularCuisines || [];
};

// Helper function to format cuisine query for Spoonacular API
export const formatCuisineForAPI = (region: Region): string => {
  const cuisines = getSpoonacularCuisines(region);
  return cuisines.length > 0 ? cuisines.join(",") : "";
};
