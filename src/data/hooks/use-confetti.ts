import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface Params {
  animatedPercentage: number;
  finalPercentage: number;
  barRef: React.RefObject<HTMLDivElement | null>;
  minPercentage?: number;
}

export function useConfetti({
  animatedPercentage,
  finalPercentage,
  barRef,
  minPercentage = 90,
}: Params) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (
      firedRef.current ||
      animatedPercentage < finalPercentage ||
      finalPercentage < minPercentage ||
      !barRef.current
    ) {
      return;
    }

    const rect = barRef.current.getBoundingClientRect();
    const originX = (rect.left + rect.width) / window.innerWidth;
    const originY = rect.top / window.innerHeight;

    // Fireworks
    for (let i = 0; i < 3; i++) {
      confetti({
        particleCount: 120,
        spread: 200,
        startVelocity: 55,
        ticks: 200,
        origin: { x: originX, y: originY },
        colors: [
          "#ffcd00",
          "#ff0040",
          "#00eaff",
          "#00ff92",
          "#ff70b8",
          "#ffa500",
        ],
      });
    }

    // Stars
    confetti({
      particleCount: 80,
      spread: 100,
      startVelocity: 45,
      origin: { x: originX, y: originY },
      shapes: ["star"],
      colors: ["#ffffff", "#ffee58", "#ff4081", "#7c4dff"],
    });

    firedRef.current = true;
  }, [animatedPercentage, finalPercentage, minPercentage, barRef]);
}
