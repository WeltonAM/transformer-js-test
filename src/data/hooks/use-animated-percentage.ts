import { useEffect, useState } from "react";

export function useAnimatedPercentage(
  finalPercentage: number,
  duration = 1400
) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const easeIn = (t: number) => t * t * t;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeIn(progress);

      setAnimatedPercentage(easedProgress * finalPercentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [finalPercentage, duration]);

  return animatedPercentage;
}
