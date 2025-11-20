export default function ActivityItem({
  label,
  time,
  total,
  color,
}: {
  label: string;
  time: string;
  total: string;
  color: "blue" | "yellow";
}) {
  const bg =
    color === "blue"
      ? "bg-pastel-d-04/10 border-pastel-d-04"
      : "bg-pastel-d-01/10 border-pastel-d-01";

  return (
    <div
      className={`flex justify-between text-xs p-3 rounded-md border-l-3 ${bg}`}
    >
      <div>
        <p className="text-xs font-medium text-neutral-700">{label}</p>
        <p className="text-xs font-medium text-neutral-1000">{time}</p>
      </div>

      <div className="text-right">
        <p className="text-xs font-medium text-neutral-700">Total Time</p>
        <p className="text-xs font-medium text-neutral-1000">{total}</p>
      </div>
    </div>
  );
}
