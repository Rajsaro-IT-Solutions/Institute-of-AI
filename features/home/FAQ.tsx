"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { FAQ } from "@/constants/testimonials";
import SectionHeading from "@/features/home/SectionHeading";
import { cn } from "@/utils/cn";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="section-padding px-6">
      <Container className="max-w-4xl">
        <SectionHeading
          badge="FAQ"
          title="The important questions, answered clearly"
          description="Everything learners and teams usually want to understand before joining the platform."
        />

        <div className="space-y-4">
          {FAQ.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <Card key={item.question} className="border-slate-200 bg-white p-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-medium text-slate-900">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 flex-none text-slate-400 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-slate-200 px-6 py-5 text-base leading-8 text-slate-600">
                    {item.answer}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
