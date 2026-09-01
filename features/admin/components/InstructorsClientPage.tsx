"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import Modal from "@/components/ui/Modal";
import { AdminInstructor } from "@/features/admin/data";
import { createInstructorAction, updateInstructorAction, deleteInstructorAction } from "@/app/admin/actions";
import { toast } from "sonner";

export default function InstructorsClientPage({ initialInstructors }: { initialInstructors: AdminInstructor[] }) {
  const [instructors, setInstructors] = useState<AdminInstructor[]>(initialInstructors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<AdminInstructor | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [coursesCount, setCoursesCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [rating, setRating] = useState(5.0);
  const [status, setStatus] = useState<"Active" | "On Leave" | "Inactive">("Active");

  const openAddModal = () => {
    setEditingInstructor(null);
    setName("");
    setSpecialty("");
    setCoursesCount(0);
    setStudentsCount(0);
    setRating(5.0);
    setStatus("Active");
    setIsModalOpen(true);
  };

  const openEditModal = (instructor: AdminInstructor) => {
    setEditingInstructor(instructor);
    setName(instructor.name);
    setSpecialty(instructor.specialty);
    setCoursesCount(instructor.courses);
    setStudentsCount(instructor.students);
    setRating(instructor.rating);
    setStatus(instructor.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !specialty) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const data = {
      name,
      specialty,
      courses: Number(coursesCount),
      students: Number(studentsCount),
      rating: Number(rating),
      status,
    };

    if (editingInstructor) {
      const success = await updateInstructorAction({ ...data, id: editingInstructor.id });
      if (success) {
        setInstructors(instructors.map((i) => (i.id === editingInstructor.id ? { ...i, ...data } : i)));
        toast.success("Instructor updated successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update instructor.");
      }
    } else {
      const tempId = `INS-${Math.floor(10 + Math.random() * 90)}`;
      const success = await createInstructorAction({ ...data, id: tempId });
      if (success) {
        setInstructors([...instructors, { ...data, id: tempId }]);
        toast.success("Instructor added successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to add instructor.");
      }
    }
    setLoading(false);
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    const success = await deleteInstructorAction(deleteConfirmId);
    if (success) {
      setInstructors(instructors.filter((i) => i.id !== deleteConfirmId));
      toast.success("Instructor deleted successfully!");
      setDeleteConfirmId(null);
    } else {
      toast.error("Failed to delete instructor.");
    }
    setIsDeleting(false);
  };

  return (
    <>
      <PageHeader
        title="Instructors"
        subtitle={`${instructors.length} expert mentors across the platform.`}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAddModal}>
            Add instructor
          </Button>
        }
      />

      <Table
        headers={["Instructor", "Specialty", "Courses", "Students", "Rating", "Status", "Actions"]}
      >
        {instructors.map((instructor) => (
          <tr key={instructor.id} className="hover:bg-slate-50/50 transition-colors">
            <TableCell className="px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-violet-50 text-sm font-bold text-violet-700">
                  {instructor.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{instructor.name}</p>
                  <p className="text-xs text-slate-500">{instructor.id}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {instructor.specialty}
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {instructor.courses}
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {instructor.students.toLocaleString()}
            </TableCell>
            <TableCell className="px-5 py-4">
              <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {instructor.rating.toFixed(2)}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4">
              <StatusBadge status={instructor.status} />
            </TableCell>
            <TableCell className="px-5 py-4">
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(instructor)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  title="Edit Instructor"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(instructor.id)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
                  title="Delete Instructor"
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
        title={editingInstructor ? "Edit Instructor" : "Add Instructor"}
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Instructor Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Sarah Johnson"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Specialty / Focus *
            </label>
            <input
              type="text"
              required
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="e.g. NLP / LLM Engineering"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Courses Count
              </label>
              <input
                type="number"
                value={coursesCount}
                onChange={(e) => setCoursesCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
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

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Save Instructor
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Instructor"
      >
        <div className="pt-2">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this instructor? This action cannot be undone.
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
