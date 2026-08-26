import MarketingPage from "@/components/marketing/MarketingPage";
import { Card } from "@/components/ui/Card";
import { BRAND } from "@/constants/brand";
import { CONTACT_PAGE } from "@/constants/marketing-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: CONTACT_PAGE.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <MarketingPage {...CONTACT_PAGE}>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
          <h2 className="text-xl font-semibold text-slate-900">Email</h2>
          <p className="mt-3 text-base text-slate-600">{BRAND.email}</p>
        </Card>
        <Card className="border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
          <h2 className="text-xl font-semibold text-slate-900">Phone</h2>
          <p className="mt-3 text-base text-slate-600">{BRAND.phone}</p>
        </Card>
        <Card className="border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
          <h2 className="text-xl font-semibold text-slate-900">Location</h2>
          <p className="mt-3 text-base text-slate-600">{BRAND.address}</p>
        </Card>
      </div>
    </MarketingPage>
  );
}
