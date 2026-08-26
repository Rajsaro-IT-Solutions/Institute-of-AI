import MarketingPage from "@/components/marketing/MarketingPage";
import { Card } from "@/components/ui/Card";
import { PRICING_PAGE } from "@/constants/marketing-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description: PRICING_PAGE.description,
  path: "/pricing",
});

const plans = [
  {
    name: "Starter",
    price: "₹199",
    description: "For individual learners building targeted AI skill depth.",
  },
  {
    name: "Cohort",
    price: "₹1,299",
    description: "For learners who want structured programs, feedback, and mentorship.",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams requiring tailored AI capability development and reporting.",
  },
];

export default function PricingPage() {
  return (
    <MarketingPage {...PRICING_PAGE}>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{plan.name}</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">{plan.price}</p>
            <p className="mt-4 text-base leading-7 text-slate-600">{plan.description}</p>
          </Card>
        ))}
      </div>
    </MarketingPage>
  );
}
