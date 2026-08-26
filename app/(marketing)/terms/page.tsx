import MarketingPage from "@/components/marketing/MarketingPage";
import { TERMS_PAGE } from "@/constants/marketing-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: TERMS_PAGE.description,
  path: "/terms",
});

export default function TermsPage() {
  return <MarketingPage {...TERMS_PAGE} />;
}
