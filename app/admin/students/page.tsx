import { getStudentsAction, getCoursesAction, getBatchesAction } from "@/app/admin/actions";
import StudentsClientPage from "@/features/admin/components/StudentsClientPage";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  const [students, courses, batches] = await Promise.all([
    getStudentsAction(),
    getCoursesAction(),
    getBatchesAction(),
  ]);
  return (
    <StudentsClientPage
      initialStudents={students}
      courses={courses}
      batches={batches}
    />
  );
}