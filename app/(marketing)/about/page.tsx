import MarketingPage from "@/components/marketing/MarketingPage";
import { ABOUT_PAGE } from "@/constants/marketing-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: ABOUT_PAGE.description,
  path: "/about",
});

export default function AboutPage() {
  return <MarketingPage {...ABOUT_PAGE} />;
}
