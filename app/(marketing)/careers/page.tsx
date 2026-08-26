import MarketingPage from "@/components/marketing/MarketingPage";
import { CAREERS_PAGE } from "@/constants/marketing-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description: "Join the University Of AI team and help build the future of AI education.",
  path: "/careers",
});

export default function CareersPage() {
  return <MarketingPage {...CAREERS_PAGE} />;
}
