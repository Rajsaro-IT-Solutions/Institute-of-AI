import { getPasswordStrength } from "@/features/authentication/utils/password-strength";

export default function PasswordStrengthMeter({
  password,
}: Readonly<{
  password: string;
}>) {
  const strength = getPasswordStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index < strength.score ? strength.colorClassName : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Password strength: <span className="font-medium text-slate-600">{strength.label}</span>
      </p>
    </div>
  );
}