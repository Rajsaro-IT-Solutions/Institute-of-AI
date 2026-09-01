"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import Modal from "@/components/ui/Modal";
import { AdminCourse } from "@/features/admin/data";
import { createCourseAction, updateCourseAction, deleteCourseAction } from "@/app/admin/actions";
import { toast } from "sonner";

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function CoursesClientPage({ initialCourses }: { initialCourses: AdminCourse[] }) {
  const [courses, setCourses] = useState<AdminCourse[]>(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(5.0);
  const [lessons, setLessons] = useState(10);
  const [studentsCount, setStudentsCount] = useState(0);
  const [status, setStatus] = useState<"Published" | "Draft" | "Archived">("Draft");

  const openAddModal = () => {
    setEditingCourse(null);
    setTitle("");
    setCategory("");
    setInstructor("");
    setPrice(0);
    setRating(5.0);
    setLessons(10);
    setStudentsCount(0);
    setStatus("Draft");
    setIsModalOpen(true);
  };

  const openEditModal = (course: AdminCourse) => {
    setEditingCourse(course);
    setTitle(course.title);
    setCategory(course.category);
    setInstructor(course.instructor);
    setPrice(course.price);
    setRating(course.rating);
    setLessons(course.lessons);
    setStudentsCount(course.students);
    setStatus(course.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !instructor) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const data = {
      title,
      category,
      instructor,
      price: Number(price),
      rating: Number(rating),
      lessons: Number(lessons),
      students: Number(studentsCount),
      status,
    };

    if (editingCourse) {
      const success = await updateCourseAction({ ...data, id: editingCourse.id });
      if (success) {
        setCourses(courses.map((c) => (c.id === editingCourse.id ? { ...c, ...data } : c)));
        toast.success("Course updated successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update course.");
      }
    } else {
      const tempId = `CRS-${Math.floor(100 + Math.random() * 900)}`;
      const success = await createCourseAction({ ...data, id: tempId });
      if (success) {
        setCourses([...courses, { ...data, id: tempId }]);
        toast.success("Course created successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to create course.");
      }
    }
    setLoading(false);
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    const success = await deleteCourseAction(deleteConfirmId);
    if (success) {
      setCourses(courses.filter((c) => c.id !== deleteConfirmId));
      toast.success("Course deleted successfully!");
      setDeleteConfirmId(null);
    } else {
      toast.error("Failed to delete course.");
    }
    setIsDeleting(false);
  };

  return (
    <>
      <PageHeader
        title="Courses"
        subtitle={`${courses.length} courses across all learning tracks.`}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAddModal}>
            New course
          </Button>
        }
      />

      <Table
        headers={["Course", "Category", "Instructor", "Students", "Price", "Rating", "Status", "Actions"]}
      >
        {courses.map((course) => (
          <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
            <TableCell className="px-5 py-4">
              <p className="font-semibold text-slate-900">{course.title}</p>
              <p className="text-xs text-slate-500">{course.id} · {course.lessons} lessons</p>
            </TableCell>
            <TableCell className="px-5 py-4">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {course.category}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {course.instructor}
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {course.students.toLocaleString()}
            </TableCell>
            <TableCell className="px-5 py-4 font-semibold text-slate-900">
              {formatINR(course.price)}
            </TableCell>
            <TableCell className="px-5 py-4">
              <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {course.rating.toFixed(2)}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4">
              <StatusBadge status={course.status} />
            </TableCell>
            <TableCell className="px-5 py-4">
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(course)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  title="Edit Course"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(course.id)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
                  title="Delete Course"
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
        title={editingCourse ? "Edit Course" : "New Course"}
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Course Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deep Learning Masterclass"
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
                placeholder="e.g. DL Core"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Instructor Name *
              </label>
              <input
                type="text"
                required
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="e.g. Dr. Alex Rodriguez"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Price (INR)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Lessons
              </label>
              <input
                type="number"
                value={lessons}
                onChange={(e) => setLessons(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(Math.min(5, Math.max(0, parseFloat(e.target.value) || 0.0)))}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Students
              </label>
              <input
                type="number"
                value={studentsCount}
                onChange={(e) => setStudentsCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
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
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Save Course
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Course"
      >
        <div className="pt-2">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this course? This action cannot be undone.
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
