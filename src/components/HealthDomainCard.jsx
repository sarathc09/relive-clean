const DOMAIN_INSIGHTS = {
  heart: {
    excellent: "Your cardiovascular health is a major strength.",
    good: "Your heart health is good but has room for optimisation.",
    needsAttention: "Improving cardiovascular health should be a high priority.",
  },

  brain: {
    excellent: "Your cognitive health appears well supported.",
    good: "Small lifestyle improvements may further support brain health.",
    needsAttention: "Focus on sleep, stress management, and exercise to support brain health.",
  },

  sleep: {
    excellent: "Your sleep habits are supporting healthy recovery.",
    good: "Improving sleep quality could further enhance recovery.",
    needsAttention: "Sleep should be your immediate focus for better overall health.",
  },

  metabolism: {
    excellent: "Your metabolic health appears well balanced.",
    good: "Diet and activity improvements could strengthen metabolic health.",
    needsAttention: "Improving metabolic health is likely to have a significant positive impact.",
  },

  fitness: {
    excellent: "Your fitness is one of your strongest longevity assets.",
    good: "Increasing activity levels can further improve fitness.",
    needsAttention: "Building regular exercise habits should be a top priority.",
  },

  recovery: {
    excellent: "Your recovery capacity supports long-term resilience.",
    good: "Recovery practices could be improved further.",
    needsAttention: "Prioritising recovery will improve long-term performance and wellbeing.",
  },
};
const STATUS_STYLES = {
  excellent: {
    label: "Excellent",
    badge: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
    bar: "bg-gradient-to-r from-emerald-400 to-emerald-500",
  },
  good: {
    label: "Good",
    badge: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
    bar: "bg-gradient-to-r from-amber-400 to-amber-500",
  },
  needsAttention: {
    label: "Needs Attention",
    badge: "bg-red-500/15 text-red-400 ring-red-500/20",
    bar: "bg-gradient-to-r from-red-400 to-red-500",
  },
};

function getStatus(score) {
  if (score >= 80) return STATUS_STYLES.excellent;
  if (score >= 60) return STATUS_STYLES.good;
  return STATUS_STYLES.needsAttention;
}

export default function HealthDomainCard({
  domain,
  title,
  score,
  icon,
}) {
  const status = getStatus(score);
  const clampedScore = Math.min(100, Math.max(0, score));

  return (
    <article className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 ease-out hover:border-white/[0.14] hover:from-white/[0.09] hover:to-white/[0.04] hover:shadow-[0_16px_48px_rgba(0,0,0,0.28)] sm:min-h-[260px] sm:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4 sm:gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-white/90 ring-1 ring-white/[0.06] transition-transform duration-300 group-hover:scale-[1.03] sm:h-14 sm:w-14">
          {icon}
        </div>

        <h3 className="pt-0.5 text-base font-medium leading-snug tracking-tight text-white/90 sm:text-lg">
          {title}
        </h3>
      </div>

      <div className="relative mt-8 flex flex-1 items-center sm:mt-10">
        <p className="text-5xl font-semibold tabular-nums leading-none tracking-tighter text-white sm:text-6xl">
          {score}
        </p>
      </div>

      <div className="relative mt-8 space-y-5 sm:mt-10">
        <span
          className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 ring-inset transition-colors duration-300 sm:text-sm ${status.badge}`}
        >
          {status.label}
        </span>

        <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${status.bar}`}
            style={{ width: `${clampedScore}%` }}
          />
        </div>
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">

  <div className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
    AI Insight
  </div>

  <p className="mt-2 text-sm leading-6 text-gray-300">
    {DOMAIN_INSIGHTS[domain]?.[
      status.label === "Excellent"
        ? "excellent"
        : status.label === "Good"
        ? "good"
        : "needsAttention"
    ]}
  </p>

</div>
      </div>
    </article>
  );
}
