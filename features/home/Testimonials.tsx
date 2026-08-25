import { Quote, Star } from "lucide-react";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { TESTIMONIALS } from "@/constants/testimonials";
import SectionHeading from "@/features/home/SectionHeading";

export default function TestimonialsSection() {
  return (
    <section className="section-padding px-6">
      <Container>
        <SectionHeading
          badge="Testimonials"
          title="Trusted by ambitious professionals building in AI"
          description="Learners come for capability, stay for the rigor, and leave with stronger execution and clearer confidence."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 6).map((testimonial) => (
            <Card key={testimonial.id} className="h-full border-slate-200 bg-white">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={`${testimonial.id}-${index}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-slate-500" />
              </div>
              <p className="text-base leading-8 text-slate-700">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="mt-8 border-t border-slate-200 pt-5">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="mt-1 text-sm text-blue-600">{testimonial.role}</p>
                <p className="mt-1 text-sm text-slate-400">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
