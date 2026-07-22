import { motion } from "framer-motion";

export default function BiologicalAgeClock({
  biologicalAge,
  chronologicalAge,
}) {

    console.log("Biological Age:", biologicalAge);
    
  const maxAge = 100;

  const percentage = biologicalAge / maxAge;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - percentage * circumference;

  return (
    <div className="flex flex-col items-center">

      <div className="relative w-60 h-60">

        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 220 220"
        >
            <defs>
  <linearGradient id="ageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#22c55e" />
    <stop offset="50%" stopColor="#10b981" />
    <stop offset="100%" stopColor="#06b6d4" />
  </linearGradient>
</defs>
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#1f2937"
            strokeWidth="12"
            fill="transparent"
          />

          <motion.circle
            cx="110"
            cy="110"
            r={radius}
           stroke="url(#ageGradient)"
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8 }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <div className="text-6xl font-bold">
            {biologicalAge}
          </div>

          <div className="text-gray-400">
            Biological Age
          </div>
          <div
  className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
    biologicalAge <= chronologicalAge
      ? "bg-green-500/20 text-green-400"
      : biologicalAge - chronologicalAge <= 5
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-red-500/20 text-red-400"
  }`}
>
  {biologicalAge <= chronologicalAge
    ? "🟢 Aging Slower"
    : biologicalAge - chronologicalAge <= 5
    ? "🟡 On Track"
    : "🔴 Aging Faster"}
</div>

        </div>

      </div>

      <div className="mt-8 w-full grid grid-cols-3 gap-4 text-center">

<div>
  <p className="text-gray-400 text-sm">Actual Age</p>
  <p className="text-2xl font-bold">
    {chronologicalAge}
  </p>
</div>

<div>
  <p className="text-gray-400 text-sm">Difference</p>
  <p className="text-2xl font-bold">
    {biologicalAge - chronologicalAge > 0
      ? `+${biologicalAge - chronologicalAge}`
      : biologicalAge - chronologicalAge}
  </p>
</div>

<div>
  <p className="text-gray-400 text-sm">Status</p>
  <p className="text-lg font-semibold">
    {biologicalAge <= chronologicalAge
      ? "Healthy"
      : "Needs Work"}
  </p>
</div>

</div>

    </div>
  );
}