import PageHeader from "@/features/admin/components/PageHeader";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { ADMIN_PAYMENTS } from "@/features/admin/data";

function formatINR(amount: number) {
  return `₹${(amount / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function AdminPaymentsPage() {
  const successful = ADMIN_PAYMENTS.filter((payment) => payment.status === "Success");
  const pending = ADMIN_PAYMENTS.filter((payment) => payment.status === "Pending");
  const failed = ADMIN_PAYMENTS.filter((payment) => payment.status === "Failed");

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle={`${successful.length} successful · ${pending.length} pending · ${failed.length} failed in the current view.`}
      />

      <Table
        headers={["Transaction", "Student", "Course", "Amount", "Method", "Date", "Status"]}
      >
        {ADMIN_PAYMENTS.map((payment) => (
          <tr key={payment.id}>
            <TableCell className="px-5 py-4">
              <p className="font-semibold text-slate-900">{payment.transactionId}</p>
              <p className="text-xs text-slate-500">{payment.id}</p>
            </TableCell>
            <TableCell className="px-5 py-4 font-medium text-slate-800">
              {payment.student}
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {payment.course}
            </TableCell>
            <TableCell className="px-5 py-4 font-semibold text-slate-900">
              {formatINR(payment.amount)}
            </TableCell>
            <TableCell className="px-5 py-4">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {payment.method}
              </span>
            </TableCell>
            <TableCell className="px-5 py-4 text-slate-600">
              {payment.date}
            </TableCell>
            <TableCell className="px-5 py-4">
              <StatusBadge status={payment.status} />
            </TableCell>
          </tr>
        ))}
      </Table>
    </>
  );
}