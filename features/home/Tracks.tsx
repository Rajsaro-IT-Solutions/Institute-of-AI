import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { LEARNING_TRACKS } from "@/constants/tracks";
import SectionHeading from "@/features/home/SectionHeading";

export default function TracksSection() {
  return (
    <section className="section-padding px-6">
      <Container>
        <SectionHeading
          badge="Learning Tracks"
          title="Role-based paths that help learners focus and finish"
          description="Each track maps the skills, projects, and learning sequence needed for a specific AI role."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {LEARNING_TRACKS.map((track) => (
            <Link key={track.id} href="/courses" className="block h-full">
              <Card className="h-full border-slate-200 bg-white transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-violet-600">
                      {track.level}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">{track.title}</h3>
                    <p className="mt-2 text-base leading-7 text-slate-600">{track.subtitle}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-slate-400" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Duration</p>
                    <p className="mt-2 font-semibold text-slate-900">{track.duration}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Role</p>
                    <p className="mt-2 font-semibold text-slate-900">{track.jobRole}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Salary</p>
                    <p className="mt-2 font-semibold text-emerald-600">{track.salary}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-3 text-sm uppercase tracking-[0.18em] text-slate-400">
                      Included courses
                    </p>
                    <ul className="space-y-2">
                      {track.courses.slice(0, 4).map((course) => (
                        <li key={course} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-300" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-3 text-sm uppercase tracking-[0.18em] text-slate-400">
                      Skill stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {track.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
