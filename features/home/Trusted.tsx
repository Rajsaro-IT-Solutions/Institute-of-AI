import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";

const technologies = [
  "OpenAI",
  "Anthropic",
  "Hugging Face",
  "PyTorch",
  "LangChain",
  "FastAPI",
  "PostgreSQL",
  "Vercel",
];

export default function TrustedSection() {
  return (
    <section className="px-6 py-10">
      <Container>
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <Badge className="mb-4">Trusted technologies</Badge>
              <h2 className="text-2xl font-semibold text-slate-900">
                Built around the tools modern AI teams actually use
              </h2>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
              {technologies.map((technology) => (
                <div
                  key={technology}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm font-medium text-slate-700"
                >
                  {technology}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
