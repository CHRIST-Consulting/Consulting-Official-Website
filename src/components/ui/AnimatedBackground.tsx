import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      const colors = [
        "rgba(14, 165, 233, 0.3)", // bright-blue
        "rgba(30, 144, 255, 0.3)", // dodger-blue
        "rgba(0, 191, 255, 0.3)", // deep-sky
        "rgba(100, 149, 237, 0.3)", // cornflower
        "rgba(176, 224, 230, 0.3)", // powder-blue
      ];

      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    window.addEventListener("resize", createParticles);

    return () => window.removeEventListener("resize", createParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            particle.speedX *= -1;
            newX = particle.x + particle.speedX;
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            particle.speedY *= -1;
            newY = particle.y + particle.speedY;
          }

          // Mouse interaction
          const dx = mousePosition.x - newX;
          const dy = mousePosition.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            newX -= (dx / distance) * force * 2;
            newY -= (dy / distance) * force * 2;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Add global mouse tracking
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-bright-blue/20 rounded-full animate-orbit"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-dodger-blue/10 to-azure/10 animate-morph"></div>
      <div
        className="absolute bottom-20 left-1/4 w-24 h-24 border border-powder-blue/30 animate-levitate"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-10 w-12 h-12 bg-cornflower/20 rounded-full animate-drift"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="absolute bottom-32 right-1/3 w-18 h-18 border-2 border-deep-sky/25 animate-spin-slow"></div>

      {/* Animated wave patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div
            className="absolute w-full h-full bg-gradient-to-r from-transparent via-bright-blue/20 to-transparent animate-slide-diagonal"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute w-full h-full bg-gradient-to-l from-transparent via-dodger-blue/15 to-transparent animate-slide-diagonal"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </div>

      {/* Debug: Mouse position indicator (remove in production) */}
      <div
        className="absolute w-4 h-4 bg-red-500 rounded-full z-50 pointer-events-none"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          opacity: 0.5,
        }}
      />

      {/* Particle system */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={particle.opacity}
            className="animate-pulse"
          />
        ))}

        {/* Connection lines between nearby particles */}
        {particles.map((particle, i) =>
          particles.slice(i + 1).map((otherParticle, j) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 150) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke="rgba(59, 130, 246, 0.1)"
                  strokeWidth="1"
                  opacity={1 - distance / 150}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Pulsing circles */}
      <div
        className="absolute top-1/4 left-1/3 w-32 h-32 border border-bright-blue/10 rounded-full animate-pulse-glow"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 border border-azure/10 rounded-full animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-3/4 left-1/5 w-24 h-24 border border-dodger-blue/15 rounded-full animate-pulse-glow"
        style={{ animationDelay: "2.5s" }}
      ></div>

      {/* Floating bubbles */}
      <div
        className="absolute top-20% left-10% w-8 h-8 bg-gradient-to-br from-powder-blue/30 to-alice-blue/30 rounded-full animate-levitate"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-60% right-15% w-6 h-6 bg-gradient-to-br from-cornflower/30 to-ghost-white/30 rounded-full animate-levitate"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-30% left-20% w-10 h-10 bg-gradient-to-br from-deep-sky/30 to-lavender/30 rounded-full animate-levitate"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-40% right-30% w-4 h-4 bg-gradient-to-br from-bright-blue/30 to-powder-blue/30 rounded-full animate-levitate"
        style={{ animationDelay: "3s" }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
