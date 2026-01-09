export function useATSStatus(finalPercentage: number) {
  if (finalPercentage >= 70)
    return {
      color: "text-green-600",
      barColor: "bg-green-500",
      stripeColor: "rgba(255,255,255,0.4)",
      bg: "bg-green-50",
      border: "border-green-200",
      label: "Excelente",
    };

  if (finalPercentage >= 40)
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
}
