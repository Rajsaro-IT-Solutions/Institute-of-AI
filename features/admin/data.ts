// ---------------------------------------------------------------------------
// Mock data for the University Of AI admin panel.
// Replace these with real API calls when the backend is wired up.
// ---------------------------------------------------------------------------

export type AdminStudent = {
  id: string;
  name: string;
  email: string;
  course: string;
  batch: string;
  progress: number;
  status: "Active" | "Pending" | "Completed" | "On Hold";
};

export const ADMIN_STUDENTS: AdminStudent[] = [
  { id: "USR-1024", name: "Aarav Sharma", email: "aarav@example.com", course: "AI Career Bootcamp", batch: "Cohort 08", progress: 78, status: "Active" },
  { id: "USR-1025", name: "Priya Patel", email: "priya@example.com", course: "Machine Learning 101", batch: "Cohort 08", progress: 42, status: "Active" },
  { id: "USR-1026", name: "Rohan Verma", email: "rohan@example.com", course: "Deep Learning", batch: "Cohort 07", progress: 91, status: "Active" },
  { id: "USR-1027", name: "Sneha Iyer", email: "sneha@example.com", course: "NLP with Transformers", batch: "Cohort 08", progress: 35, status: "Pending" },
  { id: "USR-1028", name: "Kiran Kumar", email: "kiran@example.com", course: "AI Career Bootcamp", batch: "Cohort 06", progress: 100, status: "Completed" },
  { id: "USR-1029", name: "Aisha Khan", email: "aisha@example.com", course: "Computer Vision", batch: "Cohort 08", progress: 64, status: "Active" },
  { id: "USR-1030", name: "Vivek Nair", email: "vivek@example.com", course: "Python for AI", batch: "Cohort 09", progress: 18, status: "On Hold" },
  { id: "USR-1031", name: "Divya Reddy", email: "divya@example.com", course: "Reinforcement Learning", batch: "Cohort 07", progress: 55, status: "Active" },
  { id: "USR-1032", name: "Aman Gupta", email: "aman@example.com", course: "AI Career Bootcamp", batch: "Cohort 08", progress: 23, status: "Pending" },
  { id: "USR-1033", name: "Riya Joshi", email: "riya@example.com", course: "Machine Learning 101", batch: "Cohort 09", progress: 12, status: "Active" },
];

export type AdminInstructor = {
  id: string;
  name: string;
  specialty: string;
  courses: number;
  students: number;
  rating: number;
  status: "Active" | "On Leave" | "Inactive";
};

export const ADMIN_INSTRUCTORS: AdminInstructor[] = [
  { id: "INS-01", name: "Dr. Sarah Johnson", specialty: "Python & AI Fundamentals", courses: 6, students: 3200, rating: 4.9, status: "Active" },
  { id: "INS-02", name: "Prof. Michael Chen", specialty: "Machine Learning", courses: 4, students: 2800, rating: 4.8, status: "Active" },
  { id: "INS-03", name: "Dr. Alex Rodriguez", specialty: "Deep Learning", courses: 3, students: 1500, rating: 4.9, status: "Active" },
  { id: "INS-04", name: "Dr. Emily Watson", specialty: "NLP / LLMs", courses: 5, students: 2100, rating: 4.9, status: "Active" },
  { id: "INS-05", name: "Prof. James Liu", specialty: "Computer Vision", courses: 2, students: 980, rating: 4.95, status: "On Leave" },
  { id: "INS-06", name: "Dr. David Park", specialty: "Reinforcement Learning", courses: 2, students: 720, rating: 4.85, status: "Active" },
  { id: "INS-07", name: "Prof. Ananya Iyer", specialty: "Data Science", courses: 4, students: 1750, rating: 4.8, status: "Active" },
  { id: "INS-08", name: "Dr. Marcus Reid", specialty: "LLM Engineering", courses: 3, students: 1300, rating: 4.9, status: "Inactive" },
];

export type AdminCourse = {
  id: string;
  title: string;
  category: string;
  instructor: string;
  students: number;
  lessons: number;
  price: number;
  rating: number;
  status: "Published" | "Draft" | "Archived";
};

export const ADMIN_COURSES: AdminCourse[] = [
  { id: "CRS-201", title: "Python for AI", category: "Fundamentals", instructor: "Dr. Sarah Johnson", students: 1250, lessons: 24, price: 199, rating: 4.9, status: "Published" },
  { id: "CRS-202", title: "Machine Learning 101", category: "ML Core", instructor: "Prof. Michael Chen", students: 2100, lessons: 36, price: 299, rating: 4.8, status: "Published" },
  { id: "CRS-203", title: "Deep Learning with TensorFlow", category: "DL Core", instructor: "Dr. Alex Rodriguez", students: 890, lessons: 48, price: 399, rating: 4.9, status: "Published" },
  { id: "CRS-204", title: "NLP with Transformers", category: "NLP", instructor: "Dr. Emily Watson", students: 650, lessons: 48, price: 499, rating: 4.9, status: "Published" },
  { id: "CRS-205", title: "Computer Vision Masterclass", category: "CV", instructor: "Prof. James Liu", students: 420, lessons: 60, price: 599, rating: 4.95, status: "Draft" },
  { id: "CRS-206", title: "Reinforcement Learning", category: "RL", instructor: "Dr. David Park", students: 380, lessons: 48, price: 549, rating: 4.85, status: "Published" },
  { id: "CRS-207", title: "Prompt Engineering Mastery", category: "LLM", instructor: "Dr. Emily Watson", students: 1500, lessons: 20, price: 249, rating: 4.9, status: "Published" },
  { id: "CRS-208", title: "MLOps & Deployment", category: "Production", instructor: "Prof. Ananya Iyer", students: 540, lessons: 32, price: 449, rating: 4.8, status: "Draft" },
];

export type AdminBatch = {
  id: string;
  name: string;
  program: string;
  startDate: string;
  seats: number;
  enrolled: number;
  status: "Recruiting" | "Running" | "Upcoming" | "Completed";
};

export const ADMIN_BATCHES: AdminBatch[] = [
  { id: "BAT-1001", name: "Cohort 08", program: "AI Career Bootcamp", startDate: "2024-06-10", seats: 40, enrolled: 38, status: "Running" },
  { id: "BAT-1002", name: "Cohort 07", program: "AI Career Bootcamp", startDate: "2024-04-04", seats: 40, enrolled: 40, status: "Completed" },
  { id: "BAT-1003", name: "Cohort 08", program: "Advanced Deep Learning", startDate: "2024-06-24", seats: 30, enrolled: 22, status: "Running" },
  { id: "BAT-1004", name: "Cohort 09", program: "AI Career Bootcamp", startDate: "2024-08-19", seats: 40, enrolled: 0, status: "Recruiting" },
  { id: "BAT-1005", name: "Cohort 07", program: "NLP Mastery", startDate: "2024-05-15", seats: 25, enrolled: 25, status: "Completed" },
  { id: "BAT-1006", name: "Cohort 08", program: "NLP Mastery", startDate: "2024-07-01", seats: 25, enrolled: 18, status: "Running" },
  { id: "BAT-1007", name: "Cohort 09", program: "Advanced Deep Learning", startDate: "2024-09-02", seats: 30, enrolled: 12, status: "Recruiting" },
];

export type AdminBlog = {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  views: number;
  status: "Published" | "Draft" | "Scheduled";
};

export const ADMIN_BLOGS: AdminBlog[] = [
  { id: "BLG-301", title: "How to build an AI learning plan that survives the hype cycle", category: "Learning Strategy", author: "Dr. Sarah Johnson", date: "2024-08-20", views: 12450, status: "Published" },
  { id: "BLG-302", title: "What hiring teams want in AI project portfolios", category: "Career", author: "Prof. Michael Chen", date: "2024-08-14", views: 9810, status: "Published" },
  { id: "BLG-303", title: "Designing internal AI upskilling programs people finish", category: "Corporate", author: "Prof. Ananya Iyer", date: "2024-08-02", views: 5670, status: "Published" },
  { id: "BLG-304", title: "LLMs in production: a practical checklist", category: "Engineering", author: "Dr. Marcus Reid", date: "2024-08-25", views: 0, status: "Draft" },
  { id: "BLG-305", title: "Prompt engineering for business teams", category: "LLM", author: "Dr. Emily Watson", date: "2024-08-28", views: 0, status: "Scheduled" },
];

export type AdminPayment = {
  id: string;
  transactionId: string;
  student: string;
  course: string;
  amount: number;
  method: "Card" | "UPI" | "Net Banking" | "Wallet";
  date: string;
  status: "Success" | "Pending" | "Failed" | "Refunded";
};

export const ADMIN_PAYMENTS: AdminPayment[] = [
  { id: "PYT-9001", transactionId: "TXN-881221", student: "Aarav Sharma", course: "AI Career Bootcamp", amount: 129900, method: "UPI", date: "2024-08-22", status: "Success" },
  { id: "PYT-9002", transactionId: "TXN-881232", student: "Priya Patel", course: "Machine Learning 101", amount: 29900, method: "Card", date: "2024-08-22", status: "Success" },
  { id: "PYT-9003", transactionId: "TXN-881245", student: "Rohan Verma", course: "NLP Mastery", amount: 69900, method: "Net Banking", date: "2024-08-21", status: "Success" },
  { id: "PYT-9004", transactionId: "TXN-881260", student: "Sneha Iyer", course: "NLP with Transformers", amount: 49900, method: "UPI", date: "2024-08-21", status: "Pending" },
  { id: "PYT-9005", transactionId: "TXN-881274", student: "Kiran Kumar", course: "AI Career Bootcamp", amount: 129900, method: "Wallet", date: "2024-08-20", status: "Success" },
  { id: "PYT-9006", transactionId: "TXN-881290", student: "Aisha Khan", course: "Deep Learning", amount: 39900, method: "Card", date: "2024-08-20", status: "Success" },
  { id: "PYT-9007", transactionId: "TXN-881305", student: "Vivek Nair", course: "Python for AI", amount: 19900, method: "UPI", date: "2024-08-19", status: "Failed" },
  { id: "PYT-9008", transactionId: "TXN-881318", student: "Divya Reddy", course: "Reinforcement Learning", amount: 54900, method: "Net Banking", date: "2024-08-18", status: "Success" },
  { id: "PYT-9009", transactionId: "TXN-881330", student: "Aman Gupta", course: "AI Career Bootcamp", amount: 64950, method: "Card", date: "2024-08-18", status: "Refunded" },
];

// Analytics data -------------------------------------------------------------
export const MONTHLY_REVENUE = [
  { month: "Mar", amount: 14.2 },
  { month: "Apr", amount: 16.8 },
  { month: "May", amount: 15.4 },
  { month: "Jun", amount: 19.6 },
  { month: "Jul", amount: 22.1 },
  { month: "Aug", amount: 26.4 },
] as const;

export const MONTHLY_ENROLLMENTS = [
  { month: "Mar", students: 320 },
  { month: "Apr", students: 410 },
  { month: "May", students: 380 },
  { month: "Jun", students: 520 },
  { month: "Jul", students: 610 },
  { month: "Aug", students: 740 },
] as const;

export const TOP_COURSES = [
  { title: "AI Career Bootcamp", students: 2450, revenue: 318.5 },
  { title: "Machine Learning 101", students: 2100, revenue: 62.8 },
  { title: "Prompt Engineering", students: 1500, revenue: 37.4 },
  { title: "NLP with Transformers", students: 650, revenue: 32.4 },
  { title: "Deep Learning", students: 890, revenue: 35.5 },
] as const;

export const DEVICE_BREAKDOWN = [
  { label: "Mobile", value: 58, color: "bg-blue-500" },
  { label: "Desktop", value: 32, color: "bg-cyan-500" },
  { label: "Tablet", value: 10, color: "bg-violet-500" },
] as const;

export const ADMIN_STATS = [
  { label: "Total Students", value: "15,000+", delta: "+12.5%", trending: "up", icon: "users" },
  { label: "Active Courses", value: "50+", delta: "+4 this month", trending: "up", icon: "courses" },
  { label: "Expert Instructors", value: "100+", delta: "+8 this quarter", trending: "up", icon: "instructors" },
  { label: "Revenue (MTD)", value: "₹42.6L", delta: "+18.2%", trending: "up", icon: "payments" },
] as const;