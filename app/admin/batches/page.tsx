import { getBatchesAction } from "@/app/admin/actions";
import BatchesClientPage from "@/features/admin/components/BatchesClientPage";

export const dynamic = "force-dynamic";

export default async function AdminBatchesPage() {
  const batches = await getBatchesAction();
  return <BatchesClientPage initialBatches={batches} />;
}