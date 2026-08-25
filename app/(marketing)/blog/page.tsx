import MarketingPage from "@/components/marketing/MarketingPage";
import { Card } from "@/components/ui/Card";
import { BLOG_PAGE } from "@/constants/marketing-pages";

const posts = [
  {
    title: "How to build an AI learning plan that survives the hype cycle",
    category: "Learning Strategy",
  },
  {
    title: "What hiring teams actually want to see in AI project portfolios",
    category: "Career",
  },
  {
    title: "Designing internal AI upskilling programs that people will finish",
    category: "Corporate Training",
  },
];

export default function BlogPage() {
  return (
    <MarketingPage {...BLOG_PAGE}>
      <div className="grid gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.title} className="border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <p className="text-sm uppercase tracking-[0.24em] text-blue-700">{post.category}</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Editorial publishing is being expanded as the platform grows. This topic is
              already on the roadmap for our knowledge hub.
            </p>
          </Card>
        ))}
      </div>
    </MarketingPage>
  );
}
