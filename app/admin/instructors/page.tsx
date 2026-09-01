import { getInstructorsAction } from "@/app/admin/actions";
import InstructorsClientPage from "@/features/admin/components/InstructorsClientPage";

export const dynamic = "force-dynamic";

export default async function AdminInstructorsPage() {
  const instructors = await getInstructorsAction();
  return <InstructorsClientPage initialInstructors={instructors} />;
}