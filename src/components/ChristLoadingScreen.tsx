import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ChristLoadingScreenProps {
  children: React.ReactNode;
  loadingText?: string;
  minDuration?: number;
  cacheKey?: string;
  cacheDuration?: number; // Cache validity in milliseconds (default: 1 minute)
}

const ChristLoadingScreen: React.FC<ChristLoadingScreenProps> = ({
  children,
  loadingText = "CHRIST Incubation & Consultancy Foundation",
  minDuration = 2000,
  cacheKey = "app-cache",
  cacheDuration = 1000, // 1 minute
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const letters = loadingText.split("");

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-4 py-8">
        <div className="text-center w-full max-w-4xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mb-4 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary leading-tight"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
                style={{
                  display: letter === " " ? "block" : "inline-block",
                  width: letter === " " ? "0.5em" : "auto",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Optional loading indicator for mobile */}
          <motion.div
            className="flex justify-center items-center mt-4 sm:mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ChristLoadingScreen;
