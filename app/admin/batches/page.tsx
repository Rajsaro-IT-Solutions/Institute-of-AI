import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import ProgressBar from "@/features/admin/components/ProgressBar";
import { ADMIN_BATCHES } from "@/features/admin/data";

export default function AdminBatchesPage() {
  return (
    <>
      <PageHeader
        title="Batches"
        subtitle="Cohorts and program batches with seat availability."
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />}>Create batch</Button>
        }
      />

      <Table
        headers={["Batch", "Program", "Start date", "Seats", "Fill rate", "Status"]}
      >
        {ADMIN_BATCHES.map((batch) => {
          const fillPercent =
            batch.seats === 0 ? 0 : Math.round((batch.enrolled / batch.seats) * 100);

          return (
            <tr key={batch.id}>
              <TableCell className="px-5 py-4">
                <p className="font-semibold text-slate-900">{batch.name}</p>
                <p className="text-xs text-slate-500">{batch.id}</p>
              </TableCell>
              <TableCell className="px-5 py-4 text-slate-600">
                {batch.program}
              </TableCell>
              <TableCell className="px-5 py-4 text-slate-600">
                {batch.startDate}
              </TableCell>
              <TableCell className="px-5 py-4 text-slate-600">
                {batch.enrolled} / {batch.seats}
              </TableCell>
              <TableCell className="px-5 py-4">
                <div className="flex w-32 items-center gap-2">
                  <ProgressBar value={fillPercent} className="w-full" />
                  <span className="w-8 text-xs font-semibold text-slate-600">
                    {fillPercent}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-5 py-4">
                <StatusBadge status={batch.status} />
              </TableCell>
            </tr>
          );
        })}
      </Table>
    </>
  );
}