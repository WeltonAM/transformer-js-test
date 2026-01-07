interface ProgressProps {
  text: string;
  percentage?: number;
}

export default function Progress({ text, percentage = 0 }: ProgressProps) {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
        {text} ({percentage.toFixed(2)}%)
        Aqui
      </div>
    </div>
  );
}
