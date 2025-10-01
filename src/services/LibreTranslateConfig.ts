export class LibreTranslateConfig {
  static getConfig() {
    const baseUrl =
      import.meta.env.VITE_LIBRETRANSLATE_URL || "https://libretranslate.de";
    const apiKey = import.meta.env.VITE_LIBRETRANSLATE_API_KEY;

    return {
      baseUrl,
      apiKey,
      requiresAuth: !!apiKey,
    };
  }

  // Test LibreTranslate connection
  static async testConnection(): Promise<boolean> {
    const { baseUrl, apiKey } = this.getConfig();

    try {
      const requestBody: any = {
        q: "Hello",
        source: "en",
        target: "es",
        format: "text",
      };

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

      return response.ok;
    } catch (error) {
      console.error("LibreTranslate connection test failed:", error);
      return false;
    }
  }

  // Get available languages from LibreTranslate instance
  static async getSupportedLanguages(): Promise<string[]> {
    const { baseUrl, apiKey } = this.getConfig();

    try {
      const url = new URL(`${baseUrl}/languages`);
      if (apiKey) {
        url.searchParams.append("api_key", apiKey);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.status}`);
      }

      const languages = await response.json();
      return languages.map((lang: any) => lang.code);
    } catch (error) {
      console.error("Failed to get supported languages:", error);
      // Return fallback supported languages
      return ["en", "es", "fr", "de", "it", "ar", "zh", "ja"];
    }
  }

  // Check if a language is supported
  static async isLanguageSupported(languageCode: string): Promise<boolean> {
    const supportedLanguages = await this.getSupportedLanguages();
    return supportedLanguages.includes(languageCode);
  }
}

// Rate limiting utility for LibreTranslate
export class LibreTranslateRateLimit {
  private static lastRequest = 0;
  private static requestQueue: Array<() => void> = [];
  private static isProcessing = false;

  // Add delay between requests to avoid overwhelming free instances
  static async throttleRequest(minInterval = 200): Promise<void> {
    return new Promise((resolve) => {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequest;

      if (timeSinceLastRequest >= minInterval) {
        this.lastRequest = now;
        resolve();
      } else {
        const delay = minInterval - timeSinceLastRequest;
        setTimeout(() => {
          this.lastRequest = Date.now();
          resolve();
        }, delay);
      }
    });
  }

  // Process translation requests in queue
  static async queueRequest<T>(requestFunction: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          await this.throttleRequest();
          const result = await requestFunction();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private static async processQueue(): Promise<void> {
    if (this.isProcessing || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.requestQueue.length > 0) {
      const nextRequest = this.requestQueue.shift();
      if (nextRequest) {
        await nextRequest();
      }
    }

    this.isProcessing = false;
  }
}

// Enhanced error handling for LibreTranslate
export class LibreTranslateError extends Error {
  constructor(
    message: string,
    public status?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = "LibreTranslateError";
  }

  static fromResponse(response: Response, details?: any): LibreTranslateError {
    let message = `LibreTranslate API error: ${response.status} ${response.statusText}`;

    if (details?.error) {
      message += ` - ${details.error}`;
    }

    return new LibreTranslateError(message, response.status, details);
  }

  static fromNetworkError(error: any): LibreTranslateError {
    return new LibreTranslateError(
      `Network error: ${error.message}`,
      undefined,
      error
    );
  }
}

// LibreTranslate instance recommendations
export const LIBRETRANSLATE_INSTANCES = {
  // Free public instances (no API key required)
  public: [
    {
      name: "LibreTranslate.de",
      url: "https://libretranslate.de",
      requiresAuth: false,
      rateLimit: "Moderate",
      reliability: "High",
    },
    {
      name: "LibreTranslate.com (Free Tier)",
      url: "https://libretranslate.com",
      requiresAuth: false,
      rateLimit: "Limited",
      reliability: "High",
    },
  ],

  // Paid instances (API key required)
  paid: [
    {
      name: "LibreTranslate.com (Premium)",
      url: "https://libretranslate.com",
      requiresAuth: true,
      rateLimit: "High",
      reliability: "Very High",
    },
  ],

  // Self-hosted options
  selfHosted: {
    docker: "docker run -ti --rm -p 5000:5000 libretranslate/libretranslate",
    github: "https://github.com/LibreTranslate/LibreTranslate",
  },
};

// Development helper to test different instances
export async function testLibreTranslateInstances() {
  const instances = ["https://libretranslate.de", "https://libretranslate.com"];

  const results = await Promise.allSettled(
    instances.map(async (url) => {
      const startTime = Date.now();
      try {
        const response = await fetch(`${url}/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: "Hello world",
            source: "en",
            target: "es",
            format: "text",
          }),
        });

        const responseTime = Date.now() - startTime;
        const data = await response.json();

        return {
          url,
          status: "success",
          responseTime,
          translation: data.translatedText,
        };
      } catch (error) {
        return {
          url,
          status: "failed",
          responseTime: Date.now() - startTime,
          error: error.message,
        };
      }
    })
  );

  console.table(
    results.map((result) =>
      result.status === "fulfilled" ? result.value : result.reason
    )
  );
}
