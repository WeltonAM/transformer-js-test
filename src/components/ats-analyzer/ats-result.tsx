interface ATSResultProps {
  score: number;
}

export default function ATSResult({ score }: ATSResultProps) {
  const percentage = score * 100;

  const getStatus = () => {
    if (percentage >= 70)
      return {
        color: "text-green-600",
        barColor: "bg-green-500",
        stripeColor: "rgba(255,255,255,0.4)", 
        bg: "bg-green-50",
        border: "border-green-200",
        label: "Excelente",
      };
    if (percentage >= 40)
      return {
        color: "text-yellow-600",
        barColor: "bg-yellow-500",
        stripeColor: "rgba(255,255,255,0.4)",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        label: "Moderado",
      };
    return {
      color: "text-red-600",
      barColor: "bg-red-500",
      stripeColor: "rgba(255,255,255,0.4)",
      bg: "bg-red-50",
      border: "border-red-200",
      label: "Baixo",
    };
  };

  const status = getStatus();

  return (
    <div className={`w-full p-6 rounded-xl border-2 ${status.bg} ${status.border} transition-all duration-300`}>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Compatibilidade ATS
        </span>

        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-black ${status.color}`}>
            {percentage.toFixed(0)}
          </span>
          <span className={`text-2xl font-bold ${status.color}`}>%</span>
        </div>

        <div className="w-full max-w-md bg-gray-200 rounded-full h-7 mt-2 overflow-hidden relative border border-gray-300 shadow-inner">
          <div
            className={`h-full ${status.barColor} transition-all duration-700 ease-out relative`}
            style={{ width: `${percentage}%` }}
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
                backgroundSize: '40px 40px'
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