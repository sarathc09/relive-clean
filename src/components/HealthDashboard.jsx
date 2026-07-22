import {
  Activity,
  Brain,
  Heart,
  Moon,
  Shield,
  Zap,
} from "lucide-react";
import HealthDomainCard from "./HealthDomainCard";

const DOMAINS = [
  { key: "heart", title: "Heart Health", Icon: Heart },
  { key: "brain", title: "Brain Health", Icon: Brain },
  { key: "sleep", title: "Sleep", Icon: Moon },
  { key: "metabolism", title: "Metabolism", Icon: Zap },
  { key: "fitness", title: "Fitness", Icon: Activity },
  { key: "recovery", title: "Recovery", Icon: Shield },
];

export default function HealthDashboard({ healthDomains }) {
  return (
    <section className="w-full">
      <header className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Health Domains
        </h2>
        <p className="mt-2 text-sm text-white/50 sm:text-base">
          See how each lifestyle area contributes to your overall longevity.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {DOMAINS.map(({ key, title, Icon }) => (
          <HealthDomainCard
            key={key}
            title={title}
            score={healthDomains[key]}
            icon={<Icon className="h-6 w-6" strokeWidth={1.75} />}
          />
        ))}
      </div>
    </section>
  );
}
