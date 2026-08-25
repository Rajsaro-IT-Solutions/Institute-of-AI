import { FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import type { AuthProvider } from "@/features/authentication/types";

const providers: Array<{
  icon: typeof FaGoogle;
  id: AuthProvider;
  label: string;
}> = [
  { icon: FaGoogle, id: "google", label: "Google" },
  { icon: FaGithub, id: "github", label: "GitHub" },
  { icon: FaMicrosoft, id: "microsoft", label: "Microsoft" },
];

export default function SocialLoginButtons() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {providers.map((provider) => {
        const Icon = provider.icon;

        return (
          <button
            key={provider.id}
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Icon className="h-4 w-4" />
            {provider.label}
          </button>
        );
      })}
    </div>
  );
}