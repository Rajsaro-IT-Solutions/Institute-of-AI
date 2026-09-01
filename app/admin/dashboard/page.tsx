import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  GraduationCap,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import PageHeader from "@/features/admin/components/PageHeader";
import StatCard from "@/features/admin/components/StatCard";
import BarChart from "@/features/admin/components/BarChart";
import Table, { TableCell } from "@/features/admin/components/Table";
import StatusBadge from "@/features/admin/components/StatusBadge";
import ProgressBar from "@/features/admin/components/ProgressBar";
import {
  getCoursesAction,
  getStudentsAction,
  getInstructorsAction,
  getPaymentsAction,
} from "@/app/admin/actions";
import {
  MONTHLY_ENROLLMENTS,
  MONTHLY_REVENUE,
} from "@/features/admin/data";

export const dynamic = "force-dynamic";

const STAT_ICONS = {
  users: <Users className="h-5 w-5" />,
  courses: <BookOpen className="h-5 w-5" />,
  instructors: <GraduationCap className="h-5 w-5" />,
  payments: <CreditCard className="h-5 w-5" />,
} as const;

function formatINR(amount: number) {
  return `₹${(amount / 100).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

export default async function AdminDashboardPage() {
  const students = await getStudentsAction();
  const courses = await getCoursesAction();
  const instructors = await getInstructorsAction();
  const payments = await getPaymentsAction();

  const recentStudents = students.slice(-5).reverse();
  const recentPayments = payments.slice(-4).reverse();

  const successPayments = payments.filter((p) => p.status === "Success");
  const mtdRevenue = successPayments.reduce((sum, p) => sum + p.amount, 0);

  const dynamicStats = [
    {
      label: "Total Students",
      value: students.length.toLocaleString(),
      delta: `+${Math.round(students.length * 0.1)}% this month`,
      trending: "up",
      icon: "users",
    },
    {
      label: "Active Courses",
      value: courses.filter((c) => c.status === "Published").length.toString(),
      delta: `+${courses.filter((c) => c.status === "Draft").length} in drafts`,
      trending: "up",
      icon: "courses",
    },
    {
      label: "Expert Instructors",
      value: instructors.length.toString(),
      delta: `${instructors.filter((i) => i.status === "Active").length} active`,
      trending: "up",
      icon: "instructors",
    },
    {
      label: "Revenue (MTD)",
      value: formatINR(mtdRevenue),
      delta: `+${successPayments.length} successful payments`,
      trending: "up",
      icon: "payments",
    },
  ] as const;

  return (
    <>
      <PageHeader
        title="Dashboard overview"
        subtitle="A live summary of learners, courses, and revenue."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dynamicStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            icon={STAT_ICONS[stat.icon]}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200 bg-white">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Revenue (₹ lakhs)
              </h3>
              <p className="text-sm text-slate-500">Monthly recurring revenue</p>
            </div>
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Analytics <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <BarChart
            data={MONTHLY_REVENUE.map((item) => ({ label: item.month, value: item.amount }))}
            valueFormatter={(value) => `₹${value}L`}
          />
        </Card>

        <Card className="border-slate-200 bg-white">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Enrollments
              </h3>
              <p className="text-sm text-slate-500">New students per month</p>
            </div>
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Analytics <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <BarChart
            data={MONTHLY_ENROLLMENTS.map((item) => ({
              label: item.month,
              value: item.students,
            }))}
            barColor="bg-gradient-to-t from-violet-600 to-indigo-400"
          />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-slate-200 bg-white p-0">
          <div className="flex items-center justify-between p-5 pb-2">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent students
            </h3>
            <Link
              href="/admin/students"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <Table
            headers={["Student", "Course", "Batch", "Progress", "Status"]}
          >
            {recentStudents.map((student) => (
              <tr key={student.id}>
                <TableCell className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-xs text-slate-500">{student.email}</p>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4 text-slate-600">
                  {student.course}
                </TableCell>
                <TableCell className="px-5 py-4 text-slate-600">
                  {student.batch}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex w-32 items-center gap-2">
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
        </Card>

        <Card className="border-slate-200 bg-white p-0">
          <div className="flex items-center justify-between p-5 pb-2">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent payments
            </h3>
            <Link
              href="/admin/payments"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <Table headers={["Student", "Amount", "Status"]}>
            {recentPayments.map((payment) => (
              <tr key={payment.id}>
                <TableCell className="px-5 py-4">
                  <p className="font-semibold text-slate-900">{payment.student}</p>
                  <p className="text-xs text-slate-500">{payment.method}</p>
                </TableCell>
                <TableCell className="px-5 py-4 font-semibold text-slate-900">
                  {formatINR(payment.amount)}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <StatusBadge status={payment.status} />
                </TableCell>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </>
  );
}