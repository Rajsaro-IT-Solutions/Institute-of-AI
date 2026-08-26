import MarketingPage from "@/components/marketing/MarketingPage";
import { PRIVACY_PAGE } from "@/constants/marketing-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: PRIVACY_PAGE.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <MarketingPage {...PRIVACY_PAGE} />;
}
