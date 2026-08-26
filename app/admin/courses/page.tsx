import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { ADMIN_COURSES } from "@/features/admin/data";

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function AdminCoursesPage() {
  return (
    <>
      <PageHeader
        title="Courses"
        subtitle={`${ADMIN_COURSES.length} courses across all learning tracks.`}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />}>New course</Button>
        }
      />

      <Table
        headers={["Course", "Category", "Instructor", "Students", "Price", "Rating", "Status"]}
      >
        {ADMIN_COURSES.map((course) => (
          <tr key={course.id}>
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
          </tr>
        ))}
      </Table>
    </>
  );
}