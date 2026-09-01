"use server";

import * as db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AdminCourse, AdminStudent, AdminInstructor, AdminBatch, AdminBlog, AdminPayment } from "@/features/admin/data";

// --- Courses ---
export async function getCoursesAction() {
  return await db.getCourses();
}

export async function createCourseAction(course: Omit<AdminCourse, "id"> & { id?: string }) {
  const success = await db.createCourse(course);
  if (success) {
    revalidatePath("/admin/courses");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function updateCourseAction(course: AdminCourse) {
  const success = await db.updateCourse(course);
  if (success) {
    revalidatePath("/admin/courses");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function deleteCourseAction(id: string) {
  const success = await db.deleteCourse(id);
  if (success) {
    revalidatePath("/admin/courses");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

// --- Students ---
export async function getStudentsAction() {
  return await db.getStudents();
}

export async function createStudentAction(student: Omit<AdminStudent, "id"> & { id?: string }) {
  const success = await db.createStudent(student);
  if (success) {
    revalidatePath("/admin/students");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function updateStudentAction(student: AdminStudent) {
  const success = await db.updateStudent(student);
  if (success) {
    revalidatePath("/admin/students");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function deleteStudentAction(id: string) {
  const success = await db.deleteStudent(id);
  if (success) {
    revalidatePath("/admin/students");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

// --- Instructors ---
export async function getInstructorsAction() {
  return await db.getInstructors();
}

export async function createInstructorAction(instructor: Omit<AdminInstructor, "id"> & { id?: string }) {
  const success = await db.createInstructor(instructor);
  if (success) {
    revalidatePath("/admin/instructors");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function updateInstructorAction(instructor: AdminInstructor) {
  const success = await db.updateInstructor(instructor);
  if (success) {
    revalidatePath("/admin/instructors");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function deleteInstructorAction(id: string) {
  const success = await db.deleteInstructor(id);
  if (success) {
    revalidatePath("/admin/instructors");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

// --- Batches ---
export async function getBatchesAction() {
  return await db.getBatches();
}

export async function createBatchAction(batch: Omit<AdminBatch, "id"> & { id?: string }) {
  const success = await db.createBatch(batch);
  if (success) {
    revalidatePath("/admin/batches");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function updateBatchAction(batch: AdminBatch) {
  const success = await db.updateBatch(batch);
  if (success) {
    revalidatePath("/admin/batches");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function deleteBatchAction(id: string) {
  const success = await db.deleteBatch(id);
  if (success) {
    revalidatePath("/admin/batches");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

// --- Blogs ---
export async function getBlogsAction() {
  return await db.getBlogs();
}

export async function createBlogAction(blog: Omit<AdminBlog, "id"> & { id?: string }) {
  const success = await db.createBlog(blog);
  if (success) {
    revalidatePath("/admin/blogs");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function updateBlogAction(blog: AdminBlog) {
  const success = await db.updateBlog(blog);
  if (success) {
    revalidatePath("/admin/blogs");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function deleteBlogAction(id: string) {
  const success = await db.deleteBlog(id);
  if (success) {
    revalidatePath("/admin/blogs");
    revalidatePath("/admin/dashboard");
  }
  return success;
}

// --- Payments ---
export async function getPaymentsAction() {
  return await db.getPayments();
}

export async function createPaymentAction(pay: Omit<AdminPayment, "id"> & { id?: string }) {
  const success = await db.createPayment(pay);
  if (success) {
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function updatePaymentAction(pay: AdminPayment) {
  const success = await db.updatePayment(pay);
  if (success) {
    revalidatePath("/admin/dashboard");
  }
  return success;
}

export async function deletePaymentAction(id: string) {
  const success = await db.deletePayment(id);
  if (success) {
    revalidatePath("/admin/dashboard");
  }
  return success;
}
