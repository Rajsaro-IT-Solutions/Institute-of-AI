import Link from "next/link";
import { Users, Building2, Target, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import MarketingPage from "@/components/marketing/MarketingPage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { CORPORATE_PAGE } from "@/constants/marketing-pages";

const corporateServices = [
  {
    id: "leadership-ai",
    title: "Leadership AI Literacy",
    description: "Executive programs that build strategic understanding of AI capabilities, limitations, and business applications.",
    icon: Users,
    benefits: ["Strategic decision-making", "AI opportunity identification", "Change management", "ROI assessment"],
    audience: "C-Suite, VPs, Directors",
  },
  {
    id: "engineering-cohorts",
    title: "Engineering Implementation Cohorts",
    description: "Hands-on training for engineering teams to build, deploy, and maintain AI systems in production environments.",
    icon: Building2,
    benefits: ["Production AI systems", "MLOps practices", "Model deployment", "Performance optimization"],
    audience: "Engineering teams, ML engineers",
  },
  {
    id: "product-enablement",
    title: "Product & GTM AI Enablement",
    description: "Equip product and go-to-market teams with AI fluency to drive innovation and competitive advantage.",
    icon: Target,
    benefits: ["AI-powered features", "Customer insights", "Market positioning", "Product strategy"],
    audience: "Product managers, GTM teams",
  },
  {
    id: "champion-training",
    title: "Internal AI Champion Training",
    description: "Develop internal advocates who can drive AI adoption, provide peer support, and scale learning across organizations.",
    icon: TrendingUp,
    benefits: ["Change advocacy", "Peer mentoring", "Best practices", "Scalable adoption"],
    audience: "Team leads, power users",
  },
];

export default function CorporateTrainingPage() {
  return (
    <MarketingPage {...CORPORATE_PAGE}>
      <div className="grid gap-8 md:grid-cols-2">
        {corporateServices.map((service) => (
          <Card key={service.id} className="flex h-full flex-col overflow-hidden border-slate-200 bg-white p-0 transition-all hover:shadow-xl">
            {/* Service Header */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white">
              <div className="mb-4 inline-flex rounded-lg bg-white/10 p-3">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{service.description}</p>
            </div>

            {/* Service Content */}
            <div className="flex flex-1 flex-col p-6">
              {/* Target Audience */}
              <div className="mb-4">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Target Audience</p>
                <p className="text-sm font-medium text-slate-900">{service.audience}</p>
              </div>

              {/* Key Benefits */}
              <div className="mb-4">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-500">Key Benefits</p>
                <ul className="space-y-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-auto border-t border-slate-100 pt-4">
                <Button asChild size="sm" className="w-full bg-slate-900 hover:bg-slate-800">
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional CTA Section */}
      <div className="mt-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center md:p-12">
        <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Ready to transform your team's AI capabilities?
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          Let's discuss your organization's unique needs and design a custom training program that delivers measurable results.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
      </div>
    </MarketingPage>
  );
}
