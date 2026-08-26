import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import ProgressBar from "@/features/admin/components/ProgressBar";
import { ADMIN_STUDENTS } from "@/features/admin/data";

export default function AdminStudentsPage() {
  return (
    <>
      <PageHeader
        title="Students"
        subtitle={`${ADMIN_STUDENTS.length} records in this view · manage learners, progress, and cohorts.`}
        actions={
          <>
            <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>Add student</Button>
          </>
        }
      />

      <Table
        headers={["Student", "Course", "Batch", "Progress", "Status"]}
      >
        {ADMIN_STUDENTS.map((student) => (
          <tr key={student.id}>
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
          </tr>
        ))}
      </Table>
    </>
  );
}