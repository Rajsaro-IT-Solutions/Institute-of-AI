import Link from "next/link";
import { Star, Users, Clock, BookOpen, Award } from "lucide-react";
import MarketingPage from "@/components/marketing/MarketingPage";
import JsonLd from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/constants/courses";
import { COURSES_PAGE } from "@/constants/marketing-pages";
import { buildMetadata, courseListSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Courses - Machine Learning, Deep Learning & NLP",
  description: COURSES_PAGE.description,
  path: "/courses",
  keywords: [
    "AI courses",
    "machine learning courses",
    "deep learning courses",
    "NLP courses",
    "computer vision courses",
    "reinforcement learning",
  ],
});

export default function CoursesPage() {
  return (
    <MarketingPage {...COURSES_PAGE}>
      <JsonLd data={courseListSchema(COURSES)} />
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {COURSES.map((course) => (
          <Card key={course.id} className="flex h-full flex-col overflow-hidden border-slate-200 bg-white p-0 transition-all hover:shadow-xl">
            {/* Course Image */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="flex h-full items-center justify-center">
                <BookOpen className="h-16 w-16 text-blue-600 opacity-50" />
              </div>
              <div className="absolute left-4 top-4">
                <span className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  {course.level}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{course.description}</p>

              {/* Instructor */}
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <Award className="h-4 w-4 text-blue-600" />
                <span>{course.instructor}</span>
              </div>

              {/* Skills/Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {course.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Course Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-900">{course.rating}</span>
                  <span className="text-slate-500">({course.students.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-3xl font-bold text-slate-900">₹{course.price}</p>
                </div>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Link href={`/courses/${course.id}`}>
                    Enroll Now
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </MarketingPage>
  );
}
