import { useRef } from "react";
import { useAnimatedPercentage } from "../../data/hooks/use-animated-percentage";
import { useATSStatus } from "../../data/hooks/use-ats-status";
import { useConfetti } from "../../data/hooks/use-confetti";

interface ATSResultProps {
  score: number;
}

export default function ATSResult({ score }: ATSResultProps) {
  const finalPercentage = score * 100;

  const barRef = useRef<HTMLDivElement | null>(null);

  const animatedPercentage = useAnimatedPercentage(finalPercentage);
  const status = useATSStatus(finalPercentage);

  useConfetti({
    animatedPercentage,
    finalPercentage,
    barRef,
  });

  return (
    <div className={`w-full p-6 rounded-xl border-2 ${status.bg} ${status.border}`}>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Compatibilidade ATS
        </span>

        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-black ${status.color}`}>
            {animatedPercentage.toFixed(0)}
          </span>
          <span className={`text-2xl font-bold ${status.color}`}>%</span>
        </div>

        <div
          ref={barRef}
          className="w-full max-w-md bg-gray-200 rounded-full h-7 mt-2 overflow-hidden relative border border-gray-300 shadow-inner"
        >
          <div
            className={`h-full ${status.barColor} relative`}
            style={{ width: `${animatedPercentage}%` }}
          >
            <div
              className="absolute inset-0 animate-move-stripes"
              style={{
                backgroundImage: `linear-gradient(
                  45deg,
                  ${status.stripeColor} 25%,
                  transparent 25%,
                  transparent 50%,
                  ${status.stripeColor} 50%,
                  ${status.stripeColor} 75%,
                  transparent 75%,
                  transparent
                )`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 bg-white/20 h-[40%]" />
          </div>
        </div>

        <p className={`mt-2 font-medium ${status.color}`}>
          Match {status.label}
        </p>
      </div>
    </div>
  );
}
