import { Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { ADMIN_BLOGS } from "@/features/admin/data";

export default function AdminBlogsPage() {
  return (
    <>
      <PageHeader
        title="Blogs"
        subtitle={`${ADMIN_BLOGS.length} posts across the editorial calendar.`}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />}>Write post</Button>
        }
      />

      <Table
        headers={["Title", "Category", "Author", "Date", "Views", "Status"]}
      >
        {ADMIN_BLOGS.map((post) => (
          <tr key={post.id}>
            <TableCell className="max-w-md px-5 py-4">
              <p className="font-semibold text-slate-900">{post.title}</p>
              <p className="text-xs text-slate-500">{post.id}</p>
            </TableCell>
            <TableCell className="px-5 py-4">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {post.category}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {post.author}
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {post.date}
            </TableCell>
            <TableCell className="px-5 py-4">
              <span className="inline-flex items-center gap-1 text-slate-600">
                <Eye className="h-4 w-4 text-slate-400" />
                {post.views.toLocaleString()}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4">
              <StatusBadge status={post.status} />
            </TableCell>
          </tr>
        ))}
      </Table>
    </>
  );
}