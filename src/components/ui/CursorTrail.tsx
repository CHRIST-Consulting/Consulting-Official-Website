import { useEffect, useState, useCallback } from "react";

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  id: number;
  timestamp: number;
}

const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const addTrailPoint = useCallback((x: number, y: number) => {
    const newPoint: TrailPoint = {
      x,
      y,
      opacity: 1,
      id: Date.now() + Math.random(),
      timestamp: Date.now(),
    };

    setTrail((prevTrail) => {
      // Keep only the last 12 points for better performance
      const newTrail = [newPoint, ...prevTrail.slice(0, 11)];
      return newTrail;
    });
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);

      // Throttle trail point creation for better performance
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        addTrailPoint(e.clientX, e.clientY);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Add event listeners to document for global tracking
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Fade out trail points using requestAnimationFrame for smoother animation
    const fadeTrail = () => {
      setTrail((prevTrail) => {
        const currentTime = Date.now();
        return prevTrail
          .map((point) => {
            const age = currentTime - point.timestamp;
            const newOpacity = Math.max(0, 1 - age / 800); // Fade over 800ms
            return {
              ...point,
              opacity: newOpacity,
            };
          })
          .filter((point) => point.opacity > 0.05);
      });

      requestAnimationFrame(fadeTrail);
    };

    const fadeAnimationFrame = requestAnimationFrame(fadeTrail);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      cancelAnimationFrame(fadeAnimationFrame);
    };
  }, [addTrailPoint]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            transform: `translate(-50%, -50%) scale(${
              point.opacity * (1 - index * 0.1)
            })`,
            background: `radial-gradient(circle, rgba(14, 165, 233, ${
              point.opacity
            }) 0%, rgba(30, 144, 255, ${
              point.opacity * 0.7
            }) 50%, transparent 100%)`,
            boxShadow: `0 0 ${6 * point.opacity}px rgba(14, 165, 233, ${
              point.opacity * 0.8
            })`,
            transition: "transform 0.1s ease-out",
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
