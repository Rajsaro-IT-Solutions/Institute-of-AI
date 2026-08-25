import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { PROGRAMS } from "@/constants/programs";
import SectionHeading from "@/features/home/SectionHeading";

export default function ProgramsSection() {
  return (
    <section className="section-padding px-6">
      <Container>
        <SectionHeading
          badge="Programs"
          title="Programs For Everyone"
          description="AI education tailored for students, professionals, business owners, and non-technical learners."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PROGRAMS.map((program) => (
            <Card key={program.id} className="flex h-full flex-col border-slate-200 bg-white p-7">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs uppercase tracking-[0.22em] text-blue-700">
                    {program.level}
                  </p>
                  <h3 className="text-2xl font-semibold text-slate-900">{program.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                    {program.description}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-left">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Tuition</p>
                  <p className="text-2xl font-semibold text-slate-900">₹{program.price}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-1 flex-col">
                <div>
                  <p className="mb-3 text-sm uppercase tracking-[0.18em] text-slate-500">
                    What you learn
                  </p>
                  <ul className="space-y-3">
                    {program.learningOutcomes.slice(0, 4).map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                        <span className="text-sm leading-6">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Duration</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{program.duration}</p>
                  <Link href="/programs" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Explore Courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/programs">
              Browse all programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
