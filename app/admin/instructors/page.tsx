import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { ADMIN_INSTRUCTORS } from "@/features/admin/data";

export default function AdminInstructorsPage() {
  return (
    <>
      <PageHeader
        title="Instructors"
        subtitle={`${ADMIN_INSTRUCTORS.length} expert mentors across the platform.`}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />}>Add instructor</Button>
        }
      />

      <Table
        headers={["Instructor", "Specialty", "Courses", "Students", "Rating", "Status"]}
      >
        {ADMIN_INSTRUCTORS.map((instructor) => (
          <tr key={instructor.id}>
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
          </tr>
        ))}
      </Table>
    </>
  );
}