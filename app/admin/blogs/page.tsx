import { getBlogsAction } from "@/app/admin/actions";
import BlogsClientPage from "@/features/admin/components/BlogsClientPage";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await getBlogsAction();
  return <BlogsClientPage initialBlogs={blogs} />;
}