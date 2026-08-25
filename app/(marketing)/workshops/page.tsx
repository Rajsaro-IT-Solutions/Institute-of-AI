import MarketingPage from "@/components/marketing/MarketingPage";
import { Card } from "@/components/ui/Card";
import { WORKSHOPS } from "@/constants/courses";
import { WORKSHOPS_PAGE } from "@/constants/marketing-pages";

export default function WorkshopsPage() {
  return (
    <MarketingPage {...WORKSHOPS_PAGE}>
      <div className="grid gap-6 xl:grid-cols-3">
        {WORKSHOPS.map((workshop) => (
          <Card key={workshop.id} className="border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-700">{workshop.date}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{workshop.title}</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">{workshop.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
              <span>{workshop.duration}</span>
              <span>{workshop.booked}/{workshop.spots} booked</span>
            </div>
          </Card>
        ))}
      </div>
    </MarketingPage>
  );
}
