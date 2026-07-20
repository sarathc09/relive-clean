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
            stroke="#10b981"
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

        </div>

      </div>

      <div className="mt-6 text-center">

        <div className="text-gray-400">
          Actual Age
        </div>

        <div className="text-2xl font-bold">
          {chronologicalAge}
        </div>

      </div>

    </div>
  );
}