// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Loader2, CheckCircle, XCircle, Globe, Settings } from "lucide-react";
// import {
//   LibreTranslateConfig,
//   LibreTranslateError,
// } from "@/services/LibreTranslateConfig";
// import { useTranslationCache } from "@/hooks/useTranslatedContent";

// interface TranslationSettingsProps {
//   className?: string;
// }

// const TranslationSettings: React.FC<TranslationSettingsProps> = ({
//   className,
// }) => {
//   const [isTestingConnection, setIsTestingConnection] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState<
//     "idle" | "success" | "error"
//   >("idle");
//   const [supportedLanguages, setSupportedLanguages] = useState<string[]>([]);
//   const [isLoadingLanguages, setIsLoadingLanguages] = useState(false);
//   const [testTranslation, setTestTranslation] = useState<string>("");
//   const [errorMessage, setErrorMessage] = useState<string>("");

//   const { getCacheSize, clearCache } = useTranslationCache();
//   const [cacheSize, setCacheSize] = useState(0);

//   useEffect(() => {
//     setCacheSize(getCacheSize());
//   }, [getCacheSize]);

//   const testConnection = async () => {
//     setIsTestingConnection(true);
//     setErrorMessage("");

//     try {
//       const isConnected = await LibreTranslateConfig.testConnection();
//       setConnectionStatus(isConnected ? "success" : "error");

//       if (!isConnected) {
//         setErrorMessage(
//           "Failed to connect to LibreTranslate instance. Please check your configuration."
//         );
//       }
//     } catch (error) {
//       setConnectionStatus("error");
//       setErrorMessage(
//         error instanceof Error ? error.message : "Unknown error occurred"
//       );
//     } finally {
//       setIsTestingConnection(false);
//     }
//   };

//   const loadSupportedLanguages = async () => {
//     setIsLoadingLanguages(true);
//     try {
//       const languages = await LibreTranslateConfig.getSupportedLanguages();
//       setSupportedLanguages(languages);
//     } catch (error) {
//       console.error("Failed to load supported languages:", error);
//       setSupportedLanguages([]);
//     } finally {
//       setIsLoadingLanguages(false);
//     }
//   };

//   const testTranslationFeature = async () => {
//     try {
//       const { translationService } = await import(
//         "@/services/TranslationService"
//       );
//       const result = await translationService.translateText(
//         "Hello, world!",
//         "es"
//       );
//       setTestTranslation(result);
//     } catch (error) {
//       setErrorMessage(
//         error instanceof Error ? error.message : "Translation test failed"
//       );
//     }
//   };

//   const handleClearCache = () => {
//     clearCache();
//     setCacheSize(0);
//   };

//   const config = LibreTranslateConfig.getConfig();

//   return (
//     <div className={className}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Settings className="h-5 w-5" />
//             Translation Settings
//           </CardTitle>
//           <CardDescription>
//             Configure and test your LibreTranslate connection
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Configuration Status */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Configuration Status</h3>
//             <div className="grid gap-3">
//               <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
//                 <span className="text-sm font-medium">LibreTranslate URL:</span>
//                 <Badge variant="outline">{config.baseUrl}</Badge>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
//                 <span className="text-sm font-medium">API Key:</span>
//                 <Badge variant={config.requiresAuth ? "default" : "secondary"}>
//                   {config.requiresAuth ? "Configured" : "Not Required"}
//                 </Badge>
//               </div>
//             </div>
//           </div>

//           {/* Connection Test */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-lg font-semibold">Connection Test</h3>
//               <Button
//                 onClick={testConnection}
//                 disabled={isTestingConnection}
//                 size="sm"
//               >
//                 {isTestingConnection && (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 )}
//                 Test Connection
//               </Button>
//             </div>

//             {connectionStatus !== "idle" && (
//               <Alert
//                 className={
//                   connectionStatus === "success"
//                     ? "border-green-200 bg-green-50"
//                     : "border-red-200 bg-red-50"
//                 }
//               >
//                 <div className="flex items-center gap-2">
//                   {connectionStatus === "success" ? (
//                     <CheckCircle className="h-4 w-4 text-green-600" />
//                   ) : (
//                     <XCircle className="h-4 w-4 text-red-600" />
//                   )}
//                   <AlertDescription
//                     className={
//                       connectionStatus === "success"
//                         ? "text-green-800"
//                         : "text-red-800"
//                     }
//                   >
//                     {connectionStatus === "success"
//                       ? "Successfully connected to LibreTranslate!"
//                       : errorMessage || "Connection failed"}
//                   </AlertDescription>
//                 </div>
//               </Alert>
//             )}
//           </div>

//           {/* Supported Languages */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-lg font-semibold">Supported Languages</h3>
//               <Button
//                 onClick={loadSupportedLanguages}
//                 disabled={isLoadingLanguages}
//                 variant="outline"
//                 size="sm"
//               >
//                 {isLoadingLanguages && (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 )}
//                 {isLoadingLanguages ? "Loading..." : "Refresh"}
//               </Button>
//             </div>

//             {supportedLanguages.length > 0 ? (
//               <div className="flex flex-wrap gap-2">
//                 {supportedLanguages.slice(0, 10).map((lang) => (
//                   <Badge key={lang} variant="secondary">
//                     {lang}
//                   </Badge>
//                 ))}
//                 {supportedLanguages.length > 10 && (
//                   <Badge variant="outline">
//                     +{supportedLanguages.length - 10} more
//                   </Badge>
//                 )}
//               </div>
//             ) : (
//               <p className="text-sm text-muted-foreground">
//                 No languages loaded. Click refresh to load supported languages.
//               </p>
//             )}
//           </div>

//           {/* Translation Test */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-lg font-semibold">Translation Test</h3>
//               <Button
//                 onClick={testTranslationFeature}
//                 variant="outline"
//                 size="sm"
//               >
//                 <Globe className="mr-2 h-4 w-4" />
//                 Test Translation
//               </Button>
//             </div>

//             {testTranslation && (
//               <div className="p-3 bg-muted rounded-lg">
//                 <p className="text-sm">
//                   <span className="font-medium">English:</span> Hello, world!
//                 </p>
//                 <p className="text-sm">
//                   <span className="font-medium">Spanish:</span>{" "}
//                   {testTranslation}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Cache Management */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-lg font-semibold">Translation Cache</h3>
//               <Button
//                 onClick={handleClearCache}
//                 disabled={cacheSize === 0}
//                 variant="outline"
//                 size="sm"
//               >
//                 Clear Cache
//               </Button>
//             </div>

//             <div className="p-3 bg-muted rounded-lg">
//               <p className="text-sm">
//                 <span className="font-medium">Cached translations:</span>{" "}
//                 {cacheSize}
//               </p>
//               <p className="text-xs text-muted-foreground mt-1">
//                 Cache helps reduce API calls and improves performance
//               </p>
//             </div>
//           </div>

//           {/* Configuration Help */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Configuration Help</h3>
//             <Alert>
//               <AlertDescription className="text-sm space-y-2">
//                 <p>
//                   <strong>Free Usage:</strong> Set
//                   VITE_LIBRETRANSLATE_URL=https://libretranslate.de (no API key
//                   needed)
//                 </p>
//                 <p>
//                   <strong>Premium Usage:</strong> Set
//                   VITE_LIBRETRANSLATE_URL=https://libretranslate.com and
//                   VITE_LIBRETRANSLATE_API_KEY=your-key
//                 </p>
//                 <p>
//                   <strong>Self-hosted:</strong> Run your own instance with
//                   Docker:{" "}
//                   <code className="bg-background px-1 rounded">
//                     docker run -ti --rm -p 5000:5000
//                     libretranslate/libretranslate
//                   </code>
//                 </p>
//                 <p>
//                   <strong>Environment file (.env):</strong>
//                 </p>
//                 <pre className="bg-background p-2 rounded text-xs overflow-x-auto">
//                   {`# LibreTranslate Configuration
// VITE_LIBRETRANSLATE_URL=https://libretranslate.de
// # VITE_LIBRETRANSLATE_API_KEY=your-api-key (optional)

// # Spoonacular API Key
// VITE_SPOONACULAR_API_KEY=your-spoonacular-api-key`}
//                 </pre>
//               </AlertDescription>
//             </Alert>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default TranslationSettings;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, Globe, Settings } from "lucide-react";
import {
  LibreTranslateConfig,
  LibreTranslateError,
} from "@/services/LibreTranslateConfig";
import { useTranslationCache } from "@/hooks/useTranslatedContent";

interface TranslationSettingsProps {
  className?: string;
}

const TranslationSettings: React.FC<TranslationSettingsProps> = ({
  className,
}) => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(false);
  const [testTranslation, setTestTranslation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { getCacheSize, clearCache } = useTranslationCache();
  const [cacheSize, setCacheSize] = useState(0);

  useEffect(() => {
    setCacheSize(getCacheSize());
  }, [getCacheSize]);

  const testConnection = async () => {
    setIsTestingConnection(true);
    setErrorMessage("");

    try {
      const isConnected = await LibreTranslateConfig.testConnection();
      setConnectionStatus(isConnected ? "success" : "error");

      if (!isConnected) {
        setErrorMessage(
          "Failed to connect to LibreTranslate instance. Please check your configuration."
        );
      }
    } catch (error) {
      setConnectionStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsTestingConnection(false);
    }
  };

  const loadSupportedLanguages = async () => {
    setIsLoadingLanguages(true);
    try {
      const languages = await LibreTranslateConfig.getSupportedLanguages();
      setSupportedLanguages(languages);
    } catch (error) {
      console.error("Failed to load supported languages:", error);
      setSupportedLanguages([]);
    } finally {
      setIsLoadingLanguages(false);
    }
  };

  const testTranslationFeature = async () => {
    try {
      const { translationService } = await import(
        "@/services/TranslationService"
      );
      const result = await translationService.translateText(
        "Hello, world!",
        "es"
      );
      setTestTranslation(result);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Translation test failed"
      );
    }
  };

  const handleClearCache = () => {
    clearCache();
    setCacheSize(0);
  };

  const config = LibreTranslateConfig.getConfig();

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Translation Settings
          </CardTitle>
          <CardDescription>
            Configure and test your LibreTranslate connection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration Status */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Configuration Status</h3>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">LibreTranslate URL:</span>
                <Badge variant="outline">{config.baseUrl}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">API Key:</span>
                <Badge variant={config.requiresAuth ? "default" : "secondary"}>
                  {config.requiresAuth ? "Configured" : "Not Required"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Connection Test */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Connection Test</h3>
              <Button
                onClick={testConnection}
                disabled={isTestingConnection}
                size="sm"
              >
                {isTestingConnection && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Test Connection
              </Button>
            </div>

            {connectionStatus !== "idle" && (
              <Alert
                className={
                  connectionStatus === "success"
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }
              >
                <div className="flex items-center gap-2">
                  {connectionStatus === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription
                    className={
                      connectionStatus === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }
                  >
                    {connectionStatus === "success"
                      ? "Successfully connected to LibreTranslate!"
                      : errorMessage || "Connection failed"}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>

          {/* Supported Languages */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Supported Languages</h3>
              <Button
                onClick={loadSupportedLanguages}
                disabled={isLoadingLanguages}
                variant="outline"
                size="sm"
              >
                {isLoadingLanguages && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoadingLanguages ? "Loading..." : "Refresh"}
              </Button>
            </div>

            {supportedLanguages.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {supportedLanguages.slice(0, 10).map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
                {supportedLanguages.length > 10 && (
                  <Badge variant="outline">
                    +{supportedLanguages.length - 10} more
                  </Badge>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No languages loaded. Click refresh to load supported languages.
              </p>
            )}
          </div>

          {/* Translation Test */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Translation Test</h3>
              <Button
                onClick={testTranslationFeature}
                variant="outline"
                size="sm"
              >
                <Globe className="mr-2 h-4 w-4" />
                Test Translation
              </Button>
            </div>

            {testTranslation && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">English:</span> Hello, world!
                </p>
                <p className="text-sm">
                  <span className="font-medium">Spanish:</span>{" "}
                  {testTranslation}
                </p>
              </div>
            )}
          </div>

          {/* Cache Management */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Translation Cache</h3>
              <Button
                onClick={handleClearCache}
                disabled={cacheSize === 0}
                variant="outline"
                size="sm"
              >
                Clear Cache
              </Button>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Cached translations:</span>{" "}
                {cacheSize}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Cache helps reduce API calls and improves performance
              </p>
            </div>
          </div>

          {/* Configuration Help */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Configuration Help</h3>
            <Alert>
              <AlertDescription className="text-sm space-y-2">
                <p>
                  <strong>Free Usage:</strong> Set
                  VITE_LIBRETRANSLATE_URL=https://libretranslate.de (no API key
                  needed)
                </p>
                <p>
                  <strong>Premium Usage:</strong> Set
                  VITE_LIBRETRANSLATE_URL=https://libretranslate.com and
                  VITE_LIBRETRANSLATE_API_KEY=your-key
                </p>
                <p>
                  <strong>Self-hosted:</strong> Run your own instance with
                  Docker:{" "}
                  <code className="bg-background px-1 rounded">
                    docker run -ti --rm -p 5000:5000
                    libretranslate/libretranslate
                  </code>
                </p>
                <p>
                  <strong>Environment file (.env):</strong>
                </p>
                <pre className="bg-background p-2 rounded text-xs overflow-x-auto">
                  {`# LibreTranslate Configuration
VITE_LIBRETRANSLATE_URL=https://libretranslate.de
# VITE_LIBRETRANSLATE_API_KEY=your-api-key (optional)

# Spoonacular API Key
VITE_SPOONACULAR_API_KEY=your-spoonacular-api-key`}
                </pre>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationSettings;
