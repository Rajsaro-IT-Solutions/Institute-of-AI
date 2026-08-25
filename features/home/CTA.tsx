import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="px-6 pb-24 pt-8">
      <Container>
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#eef2ff_100%)] px-8 py-12 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 md:px-12 md:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-blue-700">Get started</p>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Build the AI skills your next role will actually demand.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Start with a program, train your internal team, or speak with us about
              designing a custom learning rollout for your organization.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/register">
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to admissions</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
