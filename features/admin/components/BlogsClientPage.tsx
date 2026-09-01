"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import Modal from "@/components/ui/Modal";
import { AdminBlog } from "@/features/admin/data";
import { createBlogAction, updateBlogAction, deleteBlogAction } from "@/app/admin/actions";
import { toast } from "sonner";

export default function BlogsClientPage({ initialBlogs }: { initialBlogs: AdminBlog[] }) {
  const [blogs, setBlogs] = useState<AdminBlog[]>(initialBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<AdminBlog | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [views, setViews] = useState(0);
  const [status, setStatus] = useState<"Published" | "Draft" | "Scheduled">("Draft");

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle("");
    setCategory("");
    setAuthor("");
    setDate(new Date().toISOString().split("T")[0]);
    setViews(0);
    setStatus("Draft");
    setIsModalOpen(true);
  };

  const openEditModal = (blog: AdminBlog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category);
    setAuthor(blog.author);
    setDate(blog.date);
    setViews(blog.views);
    setStatus(blog.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !author || !date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const data = {
      title,
      category,
      author,
      date,
      views: Number(views),
      status,
    };

    if (editingBlog) {
      const success = await updateBlogAction({ ...data, id: editingBlog.id });
      if (success) {
        setBlogs(blogs.map((b) => (b.id === editingBlog.id ? { ...b, ...data } : b)));
        toast.success("Blog post updated successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update blog post.");
      }
    } else {
      const tempId = `BLG-${Math.floor(100 + Math.random() * 900)}`;
      const success = await createBlogAction({ ...data, id: tempId });
      if (success) {
        setBlogs([...blogs, { ...data, id: tempId }]);
        toast.success("Blog post added successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to add blog post.");
      }
    }
    setLoading(false);
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    const success = await deleteBlogAction(deleteConfirmId);
    if (success) {
      setBlogs(blogs.filter((b) => b.id !== deleteConfirmId));
      toast.success("Blog post deleted successfully!");
      setDeleteConfirmId(null);
    } else {
      toast.error("Failed to delete blog post.");
    }
    setIsDeleting(false);
  };

  return (
    <>
      <PageHeader
        title="Blogs"
        subtitle={`${blogs.length} articles published or scheduled.`}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAddModal}>
            New article
          </Button>
        }
      />

      <Table
        headers={["Article", "Category", "Author", "Published Date", "Views", "Status", "Actions"]}
      >
        {blogs.map((blog) => (
          <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
            <TableCell className="px-5 py-4">
              <p className="font-semibold text-slate-900">{blog.title}</p>
              <p className="text-xs text-slate-500">{blog.id}</p>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {blog.category}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {blog.author}
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
                <Eye className="h-4 w-4 text-slate-400" />
                {blog.views.toLocaleString()}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4">
              <StatusBadge status={blog.status} />
            </TableCell>
            <TableCell className="px-5 py-4">
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(blog)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  title="Edit Blog"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(blog.id)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
                  title="Delete Blog"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </TableCell>
          </tr>
        ))}
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? "Edit Article" : "New Article"}
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. LLMs in production: a practical checklist"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Engineering"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Author Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Dr. Emily Watson"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Publish Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Total Views
              </label>
              <input
                type="number"
                value={views}
                onChange={(e) => setViews(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Save Article
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Blog Post"
      >
        <div className="pt-2">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this blog post? This action cannot be undone.
          </p>
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <Button variant="outline" type="button" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white"
              loading={isDeleting}
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
