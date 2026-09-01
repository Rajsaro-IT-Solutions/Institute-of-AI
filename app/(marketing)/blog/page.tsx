import MarketingPage from "@/components/marketing/MarketingPage";
import { Card } from "@/components/ui/Card";
import { BLOG_PAGE } from "@/constants/marketing-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Blog - Learning Strategies & Career Insights",
  description: BLOG_PAGE.description,
  path: "/blog",
  type: "article",
});

import { getBlogsAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const dbBlogs = await getBlogsAction();
  const publishedBlogs = dbBlogs.filter((b) => b.status === "Published");

  return (
    <MarketingPage {...BLOG_PAGE}>
      <div className="grid gap-6 lg:grid-cols-3">
        {publishedBlogs.map((post) => (
          <Card key={post.id} className="border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
            <p className="text-sm uppercase tracking-[0.24em] text-blue-700">{post.category}</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Published on {new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })} by {post.author}.
            </p>
          </Card>
        ))}
      </div>
    </MarketingPage>
  );
}
