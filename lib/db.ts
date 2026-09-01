import mysql from "mysql2/promise";
import {
  ADMIN_COURSES,
  ADMIN_STUDENTS,
  ADMIN_INSTRUCTORS,
  ADMIN_BATCHES,
  ADMIN_BLOGS,
  ADMIN_PAYMENTS,
  AdminCourse,
  AdminStudent,
  AdminInstructor,
  AdminBatch,
  AdminBlog,
  AdminPayment,
} from "@/features/admin/data";

const poolConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST || "database-1.c1o0ygcs2cex.ap-south-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "institute_db",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  ssl: (process.env.DB_HOST?.includes("rds.amazonaws.com") || process.env.DB_SSL === "true") ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;
let dbConnected = false;
let dbInitialized = false;

// Attempt to get the database connection pool
async function getPool(): Promise<mysql.Pool | null> {
  if (pool) return pool;

  if (!process.env.DB_PASSWORD) {
    console.warn("⚠️ [DB] DB_PASSWORD is empty in .env.local. Falling back to local mock data.");
    return null;
  }

  try {
    pool = mysql.createPool(poolConfig);
    // Test the connection
    const conn = await pool.getConnection();
    conn.release();
    dbConnected = true;
    console.log("✅ [DB] Successfully connected to MySQL database!");
    return pool;
  } catch (error: any) {
    if (error?.code === "ER_BAD_DB_ERROR") {
      try {
        console.log(`⏳ [DB] Target database '${poolConfig.database}' does not exist. Creating it...`);
        const tempConfig = { ...poolConfig };
        delete tempConfig.database;
        const tempConn = await mysql.createConnection(tempConfig);
        await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${poolConfig.database}\``);
        await tempConn.end();
        console.log(`✅ [DB] Database '${poolConfig.database}' created successfully!`);
        pool = mysql.createPool(poolConfig);
        dbConnected = true;
        return pool;
      } catch (createErr) {
        console.error("❌ [DB] Failed to create database:", (createErr as Error).message);
      }
    }
    console.error("❌ [DB] Connection failed. Falling back to local mock data. Error:", (error as Error).message);
    pool = null;
    dbConnected = false;
    return null;
  }
}

// Check if database is active and connected
export async function isDbConnected(): Promise<boolean> {
  const p = await getPool();
  return p !== null && dbConnected;
}

// Automatically create tables and seed them if they don't exist
export async function initializeDatabase() {
  if (dbInitialized) return;
  const p = await getPool();
  if (!p) return;

  try {
    console.log("⏳ [DB] Initializing database tables...");

    // 1. Courses Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        instructor VARCHAR(255) NOT NULL,
        students INT DEFAULT 0,
        lessons INT DEFAULT 0,
        price INT DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 0.0,
        status VARCHAR(50) DEFAULT 'Draft'
      )
    `);

    // 2. Students Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS students (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        course VARCHAR(255) NOT NULL,
        batch VARCHAR(255) NOT NULL,
        progress INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Active'
      )
    `);

    // 3. Instructors Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS instructors (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        courses INT DEFAULT 0,
        students INT DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 0.0,
        status VARCHAR(50) DEFAULT 'Active'
      )
    `);

    // 4. Batches Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS batches (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        program VARCHAR(255) NOT NULL,
        startDate VARCHAR(50) NOT NULL,
        seats INT DEFAULT 0,
        enrolled INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Recruiting'
      )
    `);

    // 5. Blogs Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        date VARCHAR(50) NOT NULL,
        views INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Draft'
      )
    `);

    // 6. Payments Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(50) PRIMARY KEY,
        transactionId VARCHAR(255) NOT NULL,
        student VARCHAR(255) NOT NULL,
        course VARCHAR(255) NOT NULL,
        amount INT DEFAULT 0,
        method VARCHAR(50) DEFAULT 'Card',
        date VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Success'
      )
    `);

    // 7. Demo Bookings Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS demo_bookings (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        preferred_topic VARCHAR(255) DEFAULT 'AI & Machine Learning Overview',
        preferred_date VARCHAR(50) DEFAULT '',
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'Pending'
      )
    `);

    // 8. Admissions Inquiries Table
    await p.query(`
      CREATE TABLE IF NOT EXISTS admissions_inquiries (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        program VARCHAR(255) DEFAULT 'AI Career Bootcamp',
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'New'
      )
    `);

    // Seed tables if empty
    const [existingCourses] = await p.query("SELECT COUNT(*) as count FROM courses") as any[];
    if (existingCourses[0].count === 0) {
      console.log("🌱 [DB] Seeding courses table...");
      for (const course of ADMIN_COURSES) {
        await p.query(
          "INSERT INTO courses (id, title, category, instructor, students, lessons, price, rating, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [course.id, course.title, course.category, course.instructor, course.students, course.lessons, course.price, course.rating, course.status]
        );
      }
    }

    const [existingStudents] = await p.query("SELECT COUNT(*) as count FROM students") as any[];
    if (existingStudents[0].count === 0) {
      console.log("🌱 [DB] Seeding students table...");
      for (const student of ADMIN_STUDENTS) {
        await p.query(
          "INSERT INTO students (id, name, email, course, batch, progress, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [student.id, student.name, student.email, student.course, student.batch, student.progress, student.status]
        );
      }
    }

    const [existingInstructors] = await p.query("SELECT COUNT(*) as count FROM instructors") as any[];
    if (existingInstructors[0].count === 0) {
      console.log("🌱 [DB] Seeding instructors table...");
      for (const inst of ADMIN_INSTRUCTORS) {
        await p.query(
          "INSERT INTO instructors (id, name, specialty, courses, students, rating, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [inst.id, inst.name, inst.specialty, inst.courses, inst.students, inst.rating, inst.status]
        );
      }
    }

    const [existingBatches] = await p.query("SELECT COUNT(*) as count FROM batches") as any[];
    if (existingBatches[0].count === 0) {
      console.log("🌱 [DB] Seeding batches table...");
      for (const batch of ADMIN_BATCHES) {
        await p.query(
          "INSERT INTO batches (id, name, program, startDate, seats, enrolled, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [batch.id, batch.name, batch.program, batch.startDate, batch.seats, batch.enrolled, batch.status]
        );
      }
    }

    const [existingBlogs] = await p.query("SELECT COUNT(*) as count FROM blogs") as any[];
    if (existingBlogs[0].count === 0) {
      console.log("🌱 [DB] Seeding blogs table...");
      for (const blog of ADMIN_BLOGS) {
        await p.query(
          "INSERT INTO blogs (id, title, category, author, date, views, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [blog.id, blog.title, blog.category, blog.author, blog.date, blog.views, blog.status]
        );
      }
    }

    const [existingPayments] = await p.query("SELECT COUNT(*) as count FROM payments") as any[];
    if (existingPayments[0].count === 0) {
      console.log("🌱 [DB] Seeding payments table...");
      for (const pay of ADMIN_PAYMENTS) {
        await p.query(
          "INSERT INTO payments (id, transactionId, student, course, amount, method, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [pay.id, pay.transactionId, pay.student, pay.course, pay.amount, pay.method, pay.date, pay.status]
        );
      }
    }

    dbInitialized = true;
    console.log("✅ [DB] Database initialization completed!");
  } catch (error) {
    console.error("❌ [DB] Database initialization failed:", (error as Error).message);
  }
}

// Helper: Query wrapper with fallback
async function queryWithFallback<T>(dbQueryFn: (p: mysql.Pool) => Promise<T>, fallbackData: T): Promise<T> {
  const p = await getPool();
  if (!p) return fallbackData;

  try {
    await initializeDatabase();
    return await dbQueryFn(p);
  } catch (error) {
    console.error("⚠️ [DB] Query failed, falling back to mock data. Error:", (error as Error).message);
    return fallbackData;
  }
}

// Helper: Command wrapper with fallback
async function executeWithFallback(dbExecFn: (p: mysql.Pool) => Promise<any>): Promise<boolean> {
  const p = await getPool();
  if (!p) {
    console.log("ℹ️ [DB] Mock Mode: Simulating database execution in local state.");
    return true;
  }

  try {
    await initializeDatabase();
    await dbExecFn(p);
    return true;
  } catch (error) {
    console.error("⚠️ [DB] Database execution failed. Error:", (error as Error).message);
    return false;
  }
}

// --- COURSES CRUD ---
export async function getCourses(): Promise<AdminCourse[]> {
  return queryWithFallback(async (p) => {
    const [rows] = await p.query("SELECT * FROM courses") as any[];
    return rows.map((r: any) => ({
      ...r,
      rating: parseFloat(r.rating),
    }));
  }, ADMIN_COURSES);
}

export async function createCourse(course: Omit<AdminCourse, "id"> & { id?: string }): Promise<boolean> {
  const id = course.id || `CRS-${Math.floor(100 + Math.random() * 900)}`;
  return executeWithFallback(async (p) => {
    await p.query(
      "INSERT INTO courses (id, title, category, instructor, students, lessons, price, rating, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, course.title, course.category, course.instructor, course.students || 0, course.lessons || 0, course.price || 0, course.rating || 0.0, course.status || "Draft"]
    );
  });
}

export async function updateCourse(course: AdminCourse): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query(
      "UPDATE courses SET title = ?, category = ?, instructor = ?, students = ?, lessons = ?, price = ?, rating = ?, status = ? WHERE id = ?",
      [course.title, course.category, course.instructor, course.students, course.lessons, course.price, course.rating, course.status, course.id]
    );
  });
}

export async function deleteCourse(id: string): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query("DELETE FROM courses WHERE id = ?", [id]);
  });
}

// --- STUDENTS CRUD ---
export async function getStudents(): Promise<AdminStudent[]> {
  return queryWithFallback(async (p) => {
    const [rows] = await p.query("SELECT * FROM students") as any[];
    return rows;
  }, ADMIN_STUDENTS);
}

export async function createStudent(student: Omit<AdminStudent, "id"> & { id?: string }): Promise<boolean> {
  const id = student.id || `USR-${Math.floor(1000 + Math.random() * 9000)}`;
  return executeWithFallback(async (p) => {
    await p.query(
      "INSERT INTO students (id, name, email, course, batch, progress, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, student.name, student.email, student.course, student.batch, student.progress || 0, student.status || "Active"]
    );
  });
}

export async function updateStudent(student: AdminStudent): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query(
      "UPDATE students SET name = ?, email = ?, course = ?, batch = ?, progress = ?, status = ? WHERE id = ?",
      [student.name, student.email, student.course, student.batch, student.progress, student.status, student.id]
    );
  });
}

export async function deleteStudent(id: string): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query("DELETE FROM students WHERE id = ?", [id]);
  });
}

// --- INSTRUCTORS CRUD ---
export async function getInstructors(): Promise<AdminInstructor[]> {
  return queryWithFallback(async (p) => {
    const [rows] = await p.query("SELECT * FROM instructors") as any[];
    return rows.map((r: any) => ({
      ...r,
      rating: parseFloat(r.rating),
    }));
  }, ADMIN_INSTRUCTORS);
}

export async function createInstructor(instructor: Omit<AdminInstructor, "id"> & { id?: string }): Promise<boolean> {
  const id = instructor.id || `INS-${Math.floor(10 + Math.random() * 90)}`;
  return executeWithFallback(async (p) => {
    await p.query(
      "INSERT INTO instructors (id, name, specialty, courses, students, rating, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, instructor.name, instructor.specialty, instructor.courses || 0, instructor.students || 0, instructor.rating || 0.0, instructor.status || "Active"]
    );
  });
}

export async function updateInstructor(instructor: AdminInstructor): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query(
      "UPDATE instructors SET name = ?, specialty = ?, courses = ?, students = ?, rating = ?, status = ? WHERE id = ?",
      [instructor.name, instructor.specialty, instructor.courses, instructor.students, instructor.rating, instructor.status, instructor.id]
    );
  });
}

export async function deleteInstructor(id: string): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query("DELETE FROM instructors WHERE id = ?", [id]);
  });
}

// --- BATCHES CRUD ---
export async function getBatches(): Promise<AdminBatch[]> {
  return queryWithFallback(async (p) => {
    const [rows] = await p.query("SELECT * FROM batches") as any[];
    return rows;
  }, ADMIN_BATCHES);
}

export async function createBatch(batch: Omit<AdminBatch, "id"> & { id?: string }): Promise<boolean> {
  const id = batch.id || `BAT-${Math.floor(1000 + Math.random() * 9000)}`;
  return executeWithFallback(async (p) => {
    await p.query(
      "INSERT INTO batches (id, name, program, startDate, seats, enrolled, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, batch.name, batch.program, batch.startDate, batch.seats || 0, batch.enrolled || 0, batch.status || "Recruiting"]
    );
  });
}

export async function updateBatch(batch: AdminBatch): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query(
      "UPDATE batches SET name = ?, program = ?, startDate = ?, seats = ?, enrolled = ?, status = ? WHERE id = ?",
      [batch.name, batch.program, batch.startDate, batch.seats, batch.enrolled, batch.status, batch.id]
    );
  });
}

export async function deleteBatch(id: string): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query("DELETE FROM batches WHERE id = ?", [id]);
  });
}

// --- BLOGS CRUD ---
export async function getBlogs(): Promise<AdminBlog[]> {
  return queryWithFallback(async (p) => {
    const [rows] = await p.query("SELECT * FROM blogs") as any[];
    return rows;
  }, ADMIN_BLOGS);
}

export async function createBlog(blog: Omit<AdminBlog, "id"> & { id?: string }): Promise<boolean> {
  const id = blog.id || `BLG-${Math.floor(100 + Math.random() * 900)}`;
  return executeWithFallback(async (p) => {
    await p.query(
      "INSERT INTO blogs (id, title, category, author, date, views, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, blog.title, blog.category, blog.author, blog.date, blog.views || 0, blog.status || "Draft"]
    );
  });
}

export async function updateBlog(blog: AdminBlog): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query(
      "UPDATE blogs SET title = ?, category = ?, author = ?, date = ?, views = ?, status = ? WHERE id = ?",
      [blog.title, blog.category, blog.author, blog.date, blog.views, blog.status, blog.id]
    );
  });
}

export async function deleteBlog(id: string): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query("DELETE FROM blogs WHERE id = ?", [id]);
  });
}

// --- PAYMENTS CRUD ---
export async function getPayments(): Promise<AdminPayment[]> {
  return queryWithFallback(async (p) => {
    const [rows] = await p.query("SELECT * FROM payments") as any[];
    return rows;
  }, ADMIN_PAYMENTS);
}

export async function createPayment(pay: Omit<AdminPayment, "id"> & { id?: string }): Promise<boolean> {
  const id = pay.id || `PYT-${Math.floor(1000 + Math.random() * 9000)}`;
  return executeWithFallback(async (p) => {
    await p.query(
      "INSERT INTO payments (id, transactionId, student, course, amount, method, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, pay.transactionId, pay.student, pay.course, pay.amount || 0, pay.method || "Card", pay.date, pay.status || "Success"]
    );
  });
}

export async function updatePayment(pay: AdminPayment): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query(
      "UPDATE payments SET transactionId = ?, student = ?, course = ?, amount = ?, method = ?, date = ?, status = ? WHERE id = ?",
      [pay.transactionId, pay.student, pay.course, pay.amount, pay.method, pay.date, pay.status, pay.id]
    );
  });
}

export async function deletePayment(id: string): Promise<boolean> {
  return executeWithFallback(async (p) => {
    await p.query("DELETE FROM payments WHERE id = ?", [id]);
  });
}

// --- DEMO BOOKINGS CRUD ---
export type DemoBooking = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  preferredTopic?: string;
  preferredDate?: string;
  message?: string;
  createdAt?: string;
  status?: string;
};

export async function createDemoBooking(booking: DemoBooking): Promise<boolean> {
  const id = booking.id || `DEMO-${Date.now()}`;
  return executeWithFallback(async (p) => {
    await p.query(
      "INSERT INTO demo_bookings (id, name, email, phone, preferred_topic, preferred_date, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        booking.name,
        booking.email,
        booking.phone,
        booking.preferredTopic || "AI & Machine Learning Overview",
        booking.preferredDate || "",
        booking.message || "",
        booking.status || "Pending",
      ]
    );
  });
}

export async function getDemoBookings(): Promise<DemoBooking[]> {
  return queryWithFallback(async (p) => {
    const [rows] = await p.query(
      "SELECT id, name, email, phone, preferred_topic as preferredTopic, preferred_date as preferredDate, message, created_at as createdAt, status FROM demo_bookings ORDER BY created_at DESC"
    ) as any[];
    return rows;
  }, []);
}

// --- ADMISSIONS INQUIRIES CRUD ---
export type AdmissionsInquiry = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  program?: string;
  message?: string;
  createdAt?: string;
  status?: string;
};

export async function createAdmissionsInquiry(inquiry: AdmissionsInquiry): Promise<boolean> {
  const id = inquiry.id || `INQ-${Date.now()}`;
  return executeWithFallback(async (p) => {
    await p.query(
      "INSERT INTO admissions_inquiries (id, name, email, phone, program, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.program || "AI Career Bootcamp",
        inquiry.message || "",
        inquiry.status || "New",
      ]
    );
  });
}

export async function getAdmissionsInquiries(): Promise<AdmissionsInquiry[]> {
  return queryWithFallback(async (p) => {
    const [rows] = await p.query(
      "SELECT id, name, email, phone, program, message, created_at as createdAt, status FROM admissions_inquiries ORDER BY created_at DESC"
    ) as any[];
    return rows;
  }, []);
}
