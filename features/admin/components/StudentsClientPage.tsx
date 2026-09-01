"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import ProgressBar from "@/features/admin/components/ProgressBar";
import Modal from "@/components/ui/Modal";
import { AdminStudent, AdminCourse, AdminBatch } from "@/features/admin/data";
import { createStudentAction, updateStudentAction, deleteStudentAction } from "@/app/admin/actions";
import { toast } from "sonner";

export default function StudentsClientPage({
  initialStudents,
  courses = [],
  batches = [],
}: {
  initialStudents: AdminStudent[];
  courses?: AdminCourse[];
  batches?: AdminBatch[];
}) {
  const [students, setStudents] = useState<AdminStudent[]>(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<AdminStudent | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"Active" | "Pending" | "Completed" | "On Hold">("Active");

  const openAddModal = () => {
    setEditingStudent(null);
    setName("");
    setEmail("");
    setCourse("");
    setBatch("");
    setProgress(0);
    setStatus("Active");
    setIsModalOpen(true);
  };

  const openEditModal = (student: AdminStudent) => {
    setEditingStudent(student);
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
    setBatch(student.batch);
    setProgress(student.progress);
    setStatus(student.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !course || !batch) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const data = {
      name,
      email,
      course,
      batch,
      progress: Number(progress),
      status,
    };

    if (editingStudent) {
      const success = await updateStudentAction({ ...data, id: editingStudent.id });
      if (success) {
        setStudents(students.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s)));
        toast.success("Student updated successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update student.");
      }
    } else {
      const tempId = `USR-${Math.floor(1000 + Math.random() * 9000)}`;
      const success = await createStudentAction({ ...data, id: tempId });
      if (success) {
        setStudents([...students, { ...data, id: tempId }]);
        toast.success("Student added successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to add student.");
      }
    }
    setLoading(false);
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    const success = await deleteStudentAction(deleteConfirmId);
    if (success) {
      setStudents(students.filter((s) => s.id !== deleteConfirmId));
      toast.success("Student deleted successfully!");
      setDeleteConfirmId(null);
    } else {
      toast.error("Failed to delete student.");
    }
    setIsDeleting(false);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Name,Email,Course,Batch,Progress,Status"]
      .concat(students.map(s => `"${s.id}","${s.name}","${s.email}","${s.course}","${s.batch}",${s.progress},"${s.status}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `students_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Students list exported successfully!");
  };

  return (
    <>
      <PageHeader
        title="Students"
        subtitle={`${students.length} records in this view · manage learners, progress, and cohorts.`}
        actions={
          <>
            <Button variant="outline" leftIcon={<Download className="h-4 w-4" />} onClick={handleExport}>
              Export
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAddModal}>
              Add student
            </Button>
          </>
        }
      />

      <Table
        headers={["Student", "Course", "Batch", "Progress", "Status", "Actions"]}
      >
        {students.map((student) => (
          <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
            <TableCell className="px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                  {student.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.id} · {student.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {student.course}
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {student.batch}
            </TableCell>
            <TableCell className="px-5 py-4">
              <div className="flex w-36 items-center gap-2">
                <ProgressBar value={student.progress} className="w-full" />
                <span className="w-8 text-xs font-semibold text-slate-600">
                  {student.progress}%
                </span>
              </div>
            </TableCell>
            <TableCell className="px-5 py-4">
              <StatusBadge status={student.status} />
            </TableCell>
            <TableCell className="px-5 py-4">
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(student)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  title="Edit Student"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(student.id)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
                  title="Delete Student"
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
        title={editingStudent ? "Edit Student" : "Add Student"}
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aarav@example.com"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Course *
              </label>
              <select
                required
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="">Select a course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
                {course && !courses.some(c => c.title === course) && (
                  <option value={course}>{course}</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Batch/Cohort *
              </label>
              <select
                required
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="">Select a batch</option>
                {Array.from(new Set(batches.map(b => b.name))).map((batchName) => (
                  <option key={batchName} value={batchName}>
                    {batchName}
                  </option>
                ))}
                {batch && !batches.some(b => b.name === batch) && (
                  <option value={batch}>{batch}</option>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
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
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Save Student
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Student"
      >
        <div className="pt-2">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this student record? This action cannot be undone.
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
