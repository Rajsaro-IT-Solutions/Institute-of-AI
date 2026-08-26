import Link from "next/link";
import { CheckCircle2, Clock, Award, ArrowRight } from "lucide-react";
import MarketingPage from "@/components/marketing/MarketingPage";
import JsonLd from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/constants/programs";
import { PROGRAMS_PAGE } from "@/constants/marketing-pages";
import { buildMetadata, programListSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Programs & Bootcamps",
  description: PROGRAMS_PAGE.description,
  path: "/programs",
  keywords: [
    "AI bootcamp",
    "AI career bootcamp",
    "machine learning program",
    "deep learning program",
    "NLP program",
    "learn AI",
  ],
});

export default function ProgramsPage() {
  return (
    <MarketingPage {...PROGRAMS_PAGE}>
      <JsonLd data={programListSchema(PROGRAMS)} />
      <div className="grid gap-8 md:grid-cols-2">
        {PROGRAMS.map((program) => (
          <Card key={program.id} className="flex h-full flex-col overflow-hidden border-slate-200 bg-white p-0 transition-all hover:shadow-xl">
            {/* Program Header */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
              <div className="mb-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {program.level}
              </div>
              <h3 className="text-2xl font-semibold">{program.title}</h3>
              <p className="mt-2 text-sm text-blue-100">{program.description}</p>
            </div>

            {/* Program Content */}
            <div className="flex flex-1 flex-col p-6">
              {/* Learning Outcomes */}
              <div className="mb-4">
                <p className="mb-3 text-sm uppercase tracking-[0.18em] text-slate-500">
                  What you&apos;ll learn
                </p>
                <ul className="space-y-2">
                  {program.learningOutcomes.slice(0, 4).map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="mb-4 flex flex-wrap gap-2">
                {program.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Program Details */}
              <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>Certificate</span>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-3xl font-bold text-slate-900">₹{program.price}</p>
                </div>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Link href={`/programs/${program.id}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </MarketingPage>
  );
}
