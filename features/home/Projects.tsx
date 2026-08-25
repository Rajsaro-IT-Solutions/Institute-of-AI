import Link from "next/link";
import { ArrowRight, Layers3, Zap } from "lucide-react";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PROJECTS } from "@/constants/projects";
import SectionHeading from "@/features/home/SectionHeading";

export default function ProjectsSection() {
  return (
    <section className="section-padding px-6">
      <Container>
        <SectionHeading
          badge="Projects"
          title="Ship portfolio work that looks credible to hiring teams"
          description="Every learning experience is paired with production-style projects that reinforce implementation depth."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {PROJECTS.map((project) => (
            <Card key={project.id} className="h-full border-slate-200 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-700">
                    {project.difficulty}
                  </p>
                  <h3 className="text-2xl font-semibold text-slate-900">{project.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{project.description}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                  <Layers3 className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm uppercase tracking-[0.18em] text-slate-400">
                  What learners practice
                </p>
                <ul className="space-y-3">
                  {project.learnings.map((learning) => (
                    <li key={learning} className="flex items-start gap-3 text-sm text-slate-700">
                      <Zap className="mt-0.5 h-4 w-4 flex-none text-blue-600" />
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-sm text-slate-500">
                <span>{project.duration}</span>
                <Link href="/courses" className="inline-flex items-center gap-2 font-medium text-emerald-600">
                  See related curriculum
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
