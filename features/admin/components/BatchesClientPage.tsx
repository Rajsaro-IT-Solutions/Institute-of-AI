"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import Modal from "@/components/ui/Modal";
import { AdminBatch } from "@/features/admin/data";
import { createBatchAction, updateBatchAction, deleteBatchAction } from "@/app/admin/actions";
import { toast } from "sonner";

export default function BatchesClientPage({ initialBatches }: { initialBatches: AdminBatch[] }) {
  const [batches, setBatches] = useState<AdminBatch[]>(initialBatches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<AdminBatch | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [startDate, setStartDate] = useState("");
  const [seats, setSeats] = useState(30);
  const [enrolled, setEnrolled] = useState(0);
  const [status, setStatus] = useState<"Recruiting" | "Running" | "Upcoming" | "Completed">("Recruiting");

  const openAddModal = () => {
    setEditingBatch(null);
    setName("");
    setProgram("");
    setStartDate(new Date().toISOString().split("T")[0]);
    setSeats(30);
    setEnrolled(0);
    setStatus("Recruiting");
    setIsModalOpen(true);
  };

  const openEditModal = (batch: AdminBatch) => {
    setEditingBatch(batch);
    setName(batch.name);
    setProgram(batch.program);
    setStartDate(batch.startDate);
    setSeats(batch.seats);
    setEnrolled(batch.enrolled);
    setStatus(batch.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !program || !startDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const data = {
      name,
      program,
      startDate,
      seats: Number(seats),
      enrolled: Number(enrolled),
      status,
    };

    if (editingBatch) {
      const success = await updateBatchAction({ ...data, id: editingBatch.id });
      if (success) {
        setBatches(batches.map((b) => (b.id === editingBatch.id ? { ...b, ...data } : b)));
        toast.success("Batch updated successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to update batch.");
      }
    } else {
      const tempId = `BAT-${Math.floor(1000 + Math.random() * 9000)}`;
      const success = await createBatchAction({ ...data, id: tempId });
      if (success) {
        setBatches([...batches, { ...data, id: tempId }]);
        toast.success("Batch created successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to create batch.");
      }
    }
    setLoading(false);
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    const success = await deleteBatchAction(deleteConfirmId);
    if (success) {
      setBatches(batches.filter((b) => b.id !== deleteConfirmId));
      toast.success("Batch deleted successfully!");
      setDeleteConfirmId(null);
    } else {
      toast.error("Failed to delete batch.");
    }
    setIsDeleting(false);
  };

  return (
    <>
      <PageHeader
        title="Batches"
        subtitle={`${batches.length} cohorts running or recruiting.`}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={openAddModal}>
            New batch
          </Button>
        }
      />

      <Table
        headers={["Batch", "Program", "Start Date", "Capacity / Enrolled", "Status", "Actions"]}
      >
        {batches.map((batch) => (
          <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors">
            <TableCell className="px-5 py-4">
              <p className="font-semibold text-slate-900">{batch.name}</p>
              <p className="text-xs text-slate-500">{batch.id}</p>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {batch.program}
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                {new Date(batch.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              <span className="font-semibold text-slate-900">{batch.enrolled}</span>
              <span className="text-slate-400"> / {batch.seats} seats</span>
            </TableCell>
            <TableCell className="px-5 py-4">
              <StatusBadge status={batch.status} />
            </TableCell>
            <TableCell className="px-5 py-4">
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(batch)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  title="Edit Batch"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(batch.id)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
                  title="Delete Batch"
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
        title={editingBatch ? "Edit Batch" : "New Batch"}
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Batch Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cohort 08"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Program / Course *
            </label>
            <input
              type="text"
              required
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              placeholder="e.g. AI Career Bootcamp"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Seat Capacity
              </label>
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Enrolled Students
              </label>
              <input
                type="number"
                value={enrolled}
                onChange={(e) => setEnrolled(Math.max(0, parseInt(e.target.value) || 0))}
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
              <option value="Recruiting">Recruiting</option>
              <option value="Running">Running</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Save Batch
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Batch"
      >
        <div className="pt-2">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this batch? This action cannot be undone.
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
