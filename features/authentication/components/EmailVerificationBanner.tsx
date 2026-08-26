import { MailCheck } from "lucide-react";

export default function EmailVerificationBanner({
  email,
}: Readonly<{
  email?: string;
}>) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
      <div className="flex items-start gap-3">
        <MailCheck className="mt-0.5 h-4 w-4 flex-none" />
        <p>
          We&apos;ve sent a verification email{email ? ` to ${email}` : ""}. Enter the
          6-digit code below to activate your account.
        </p>
      </div>
    </div>
  );
}