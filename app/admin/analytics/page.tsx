import { Download, Globe, Users, Wallet, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/features/admin/components/PageHeader";
import StatCard from "@/features/admin/components/StatCard";
import BarChart from "@/features/admin/components/BarChart";
import {
  DEVICE_BREAKDOWN,
  MONTHLY_ENROLLMENTS,
  MONTHLY_REVENUE,
  TOP_COURSES,
} from "@/features/admin/data";
import { cn } from "@/utils/cn";

export default function AdminAnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Platform performance across growth, revenue, and engagement."
        actions={
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Download report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Conversion rate"
          value="6.8%"
          delta="+0.4%"
          icon={<Zap className="h-5 w-5" />}
        />
        <StatCard
          label="Avg. session"
          value="14m 32s"
          delta="+2m 10s"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          label="Traffic"
          value="48.2k"
          delta="+21.3%"
          icon={<Globe className="h-5 w-5" />}
        />
        <StatCard
          label="Course completion"
          value="87%"
          delta="+3.1%"
          icon={<Wallet className="h-5 w-5" />}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200 bg-white">
          <h3 className="mb-6 text-lg font-semibold text-slate-900">
            Revenue trend
          </h3>
          <BarChart
            data={MONTHLY_REVENUE.map((item) => ({ label: item.month, value: item.amount }))}
            valueFormatter={(value) => `₹${value}L`}
          />
        </Card>

        <Card className="border-slate-200 bg-white">
          <h3 className="mb-6 text-lg font-semibold text-slate-900">
            Enrollments trend
          </h3>
          <BarChart
            data={MONTHLY_ENROLLMENTS.map((item) => ({
              label: item.month,
              value: item.students,
            }))}
            barColor="bg-gradient-to-t from-violet-600 to-indigo-400"
          />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-slate-200 bg-white p-0">
          <div className="p-5 pb-2">
            <h3 className="text-lg font-semibold text-slate-900">Top courses</h3>
            <p className="text-sm text-slate-500">By student enrollment</p>
          </div>
          <div className="divide-y divide-slate-100">
            {TOP_COURSES.map((course, index) => {
              const maxStudents = TOP_COURSES[0].students;
              const pct = Math.round((course.students / maxStudents) * 100);

              return (
                <div key={course.title} className="flex items-center gap-4 px-5 py-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="truncate font-semibold text-slate-900">
                        {course.title}
                      </p>
                      <p className="flex-none text-sm text-slate-500">
                        {course.students.toLocaleString()} students
                      </p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="border-slate-200 bg-white">
          <h3 className="mb-6 text-lg font-semibold text-slate-900">
            Devices
          </h3>
          <div className="space-y-5">
            {DEVICE_BREAKDOWN.map((device) => (
              <div key={device.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{device.label}</span>
                  <span className="font-semibold text-slate-900">
                    {device.value}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn("h-full rounded-full", device.color)}
                    style={{ width: `${device.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Insight
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Mobile traffic continues to lead acquisition. Consider A/B testing
              the mobile landing experience to lift conversions further.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}