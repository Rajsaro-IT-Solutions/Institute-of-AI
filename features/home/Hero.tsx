import Link from "next/link";
import { ArrowRight, BrainCircuit, BriefcaseBusiness, GraduationCap, HandCoins, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { STATS } from "@/constants/stats";

const outcomes = [
  { icon: GraduationCap, label: "Hands-on Experience" },
  { icon: BrainCircuit, label: "Real World Projects" },
  { icon: BriefcaseBusiness, label: "Industry Expert Mentors" },
  { icon: HandCoins, label: "Placement Support" },
];

export default function HeroSection() {
  return (
    <section className="px-3 pb-10 pt-8 lg:px-4">
      <Container className="max-w-[88rem]">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[radial-gradient(circle_at_78%_28%,rgba(37,99,235,0.38),transparent_16%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.16),transparent_18%),linear-gradient(135deg,#07102e_0%,#0a1740_45%,#091230_100%)] px-8 py-10 shadow-[0_40px_100px_rgba(15,23,42,0.18)] md:px-14 md:pt-12 md:pb-0 lg:px-16">
          <div className="absolute inset-0 surface-grid opacity-[0.08]" />
          <div className="absolute -bottom-24 right-6 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="max-w-[36rem]">
              <Badge className="mb-6 border-blue-400/20 bg-blue-400/10 text-blue-100">
                <Sparkles className="h-3.5 w-3.5" />
                Learn AI. Build real projects. Lead the future.
              </Badge>
              <h1 className="max-w-[30rem] text-[4.4rem] font-bold leading-[0.95] tracking-tight text-white">
                <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-100 bg-clip-text text-transparent">
                  Master AI.
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
                  Build Real Projects.
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                  Transform Your Career.
                </span>
              </h1>
              <p className="mt-6 max-w-[31rem] text-[1.05rem] leading-8 text-blue-50/82 md:text-[1.1rem]">
                At University Of AI, we deliver industry-relevant AI education with hands-on
                experience, real-world projects, and complete theoretical knowledge to make
                you future ready.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/programs"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#2563eb_0%,#06b6d4_100%)] px-8 text-[1.05rem] font-semibold text-white shadow-lg shadow-blue-700/30 transition-transform hover:-translate-y-0.5"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#2563eb_0%,#06b6d4_100%)] px-8 text-[1.05rem] font-semibold text-white shadow-lg shadow-blue-700/30 transition-transform hover:-translate-y-0.5"
                >
                  Book Free Demo Class
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {outcomes.map((outcome) => {
                  const Icon = outcome.icon;
                  return (
                    <div
                      key={outcome.label}
                      className="min-h-[92px] rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white backdrop-blur-sm"
                    >
                      <Icon className="mb-3 h-5 w-5 text-cyan-300" />
                      <p className="text-[0.95rem] font-medium leading-6">{outcome.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative flex min-h-[450px] items-center justify-center">
              <div className="absolute h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl" />
              <div className="absolute h-[27rem] w-[27rem] rounded-full border border-cyan-300/12" />
              <div className="absolute h-[23rem] w-[23rem] rounded-full border border-blue-300/10" />
              <div className="absolute h-[19rem] w-[19rem] rounded-full border border-cyan-300/15" />
              <div className="relative flex h-[25rem] w-[25rem] items-center justify-center">
                <div className="absolute bottom-14 h-10 w-44 rounded-full bg-cyan-400/45 blur-2xl" />
                <svg
                  viewBox="0 0 420 420"
                  className="h-[24rem] w-[24rem] text-cyan-300 drop-shadow-[0_0_40px_rgba(34,211,238,0.42)]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M210 85c-56 0-103 40-114 93-8 40 7 79 39 105 18 14 29 34 31 56h98c2-22 14-42 31-56 32-26 47-65 39-105-11-53-58-93-114-93Z"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <path d="M170 339h80M178 359h64M188 379h44" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <path d="M153 158c20 19 37 39 58 50 22-13 41-34 56-56 12 42 13 85 0 126" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M118 183c24 4 42 16 55 31M300 183c-24 4-42 16-55 31M152 124c15 13 25 27 32 43M268 124c-15 13-25 27-32 43" stroke="currentColor" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="152" cy="124" r="6" fill="currentColor" />
                  <circle cx="118" cy="183" r="6" fill="currentColor" />
                  <circle cx="210" cy="208" r="6" fill="currentColor" />
                  <circle cx="268" cy="124" r="6" fill="currentColor" />
                  <circle cx="300" cy="183" r="6" fill="currentColor" />
                  <circle cx="264" cy="284" r="6" fill="currentColor" />
                  <circle cx="157" cy="289" r="6" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative mt-8 rounded-t-[1.5rem] border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-2 pb-8 pt-8 md:px-0">
            <div className="grid gap-4 md:grid-cols-4">
            {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border-white/10 md:border-r md:px-10 last:border-r-0 first:pl-0"
                >
                  <p className="text-[2.2rem] font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-[0.95rem] text-slate-300">{stat.label}</p>
                </div>
            ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
