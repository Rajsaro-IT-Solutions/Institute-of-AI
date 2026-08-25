export type PasswordStrength = {
  score: number;
  label: "Weak" | "Fair" | "Strong" | "Excellent";
  colorClassName: string;
};

export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z\d]/.test(password)) score += 1;

  if (score <= 1) {
    return { score, label: "Weak", colorClassName: "bg-rose-500" };
  }

  if (score === 2) {
    return { score, label: "Fair", colorClassName: "bg-amber-500" };
  }

  if (score === 3) {
    return { score, label: "Strong", colorClassName: "bg-sky-500" };
  }

  return { score, label: "Excellent", colorClassName: "bg-emerald-500" };
}
