import { useEffect, useState } from "react";

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set moving to false after mouse stops
      timeoutId = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Create delayed follower with smooth animation
  useEffect(() => {
    const animateFollower = () => {
      setDelayedPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));
    };

    const interval = setInterval(animateFollower, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <>
      {/* Primary cursor follower */}
      <div
        className="fixed pointer-events-none z-30 transition-transform duration-75 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) scale(${isMoving ? 1.2 : 1})`,
        }}
      >
        <div className="relative">
          {/* Outer ring */}
          <div
            className={`w-8 h-8 border-2 border-bright-blue/40 rounded-full transition-all duration-200 ${
              isMoving ? "scale-125 border-dodger-blue/60" : "scale-100"
            }`}
          />

          {/* Inner dot */}
          <div
            className={`absolute top-1/2 left-1/2 w-2 h-2 bg-bright-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
              isMoving ? "scale-150 bg-dodger-blue" : "scale-100"
            }`}
          />

          {/* Pulse effect when moving */}
          {isMoving && (
            <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-bright-blue/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
          )}
        </div>
      </div>

      {/* Secondary delayed follower */}
      <div
        className="fixed pointer-events-none z-25"
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-16 h-16 border border-azure/20 rounded-full animate-spin-slow" />
      </div>

      {/* Tertiary ultra-delayed follower */}
      <div
        className="fixed pointer-events-none z-20"
        style={{
          left:
            delayedPosition.x + (mousePosition.x - delayedPosition.x) * 0.05,
          top: delayedPosition.y + (mousePosition.y - delayedPosition.y) * 0.05,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-24 h-24 border border-powder-blue/15 rounded-full animate-pulse" />
      </div>
    </>
  );
};

export default MouseFollower;
