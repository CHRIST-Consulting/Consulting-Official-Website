import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ChristLoadingScreenProps {
  children: React.ReactNode;
  minDuration?: number;
  cacheKey?: string;
  cacheDuration?: number; // Cache validity in milliseconds (default: 1 minute)
}

const ChristLoadingScreen: React.FC<ChristLoadingScreenProps> = ({
  children,
  minDuration = 2000,
  cacheKey = "app-cache",
  cacheDuration = 1000, // 1 minute
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const checkCache = () => {
    try {
      const cachedData = localStorage.getItem(cacheKey);
      if (!cachedData) return false;

      const { timestamp, data } = JSON.parse(cachedData);
      const isCacheValid = Date.now() - timestamp < cacheDuration;

      return isCacheValid && data;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    let mounted = true;

    const checkPageLoaded = () => {
      const images = Array.from(document.images);
      const imagesLoaded = images.every((img) => img.complete);
      const domReady = document.readyState === "complete";
      return imagesLoaded && domReady;
    };

    const loadData = async () => {
      try {
        const hasValidCache = checkCache();

        if (hasValidCache) {
          setIsLoading(false);
          return;
        }

        await Promise.all([
          new Promise<void>((resolve) => {
            const check = () => {
              if (checkPageLoaded()) {
                resolve();
              } else {
                setTimeout(check, 100);
              }
            };
            check();
          }),

          new Promise((resolve) => {
            const elapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, minDuration - elapsed);
            setTimeout(resolve, remainingTime);
          }),
        ]);

        // Store in cache after successful load
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: true,
          })
        );
      } catch (error) {
        console.error("Loading error:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [minDuration, cacheKey, cacheDuration]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 px-6 py-8">
        <div className="text-center w-full max-w-6xl mx-auto">
          {/* Logo/Brand Section */}
          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <motion.div
                className="flex flex-col items-center justify-center text-white"
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {/* Lightbulb/Innovation Icon */}
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1zM12 19h-1v1c0 .55.45 1 1 1s1-.45 1-1v-1h-1zm-2-1h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Text with Better Layout */}
          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {/* Split text into lines for better mobile display */}
            <div className="space-y-2 sm:space-y-4">
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                CHRIST
              </motion.h1>
              <motion.h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Incubation & Consultancy
              </motion.h2>
              <motion.h3
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                Foundation
              </motion.h3>
            </div>
          </motion.div>

          {/* Enhanced Loading Indicator */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            {/* Loading Bar */}
            <div className="w-32 sm:w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Loading Text */}
            <motion.p
              className="text-sm sm:text-base text-gray-500 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading...
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400/20 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-indigo-400/20 rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 1.5,
            }}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ChristLoadingScreen;
