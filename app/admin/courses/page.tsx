import { getCoursesAction } from "@/app/admin/actions";
import CoursesClientPage from "@/features/admin/components/CoursesClientPage";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await getCoursesAction();
  return <CoursesClientPage initialCourses={courses} />;
}