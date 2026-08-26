"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AuthCard from "@/features/authentication/components/AuthCard";
import AuthErrorState from "@/features/authentication/components/AuthErrorState";
import AuthFooter from "@/features/authentication/components/AuthFooter";
import AuthForm from "@/features/authentication/components/AuthForm";
import AuthHeader from "@/features/authentication/components/AuthHeader";
import AuthLoadingState from "@/features/authentication/components/AuthLoadingState";
import AuthSuccessState from "@/features/authentication/components/AuthSuccessState";
import AuthField from "@/features/authentication/components/AuthField";
import EmailVerificationBanner from "@/features/authentication/components/EmailVerificationBanner";
import OTPInput from "@/features/authentication/components/OTPInput";
import { useForgotPassword } from "@/features/authentication/hooks/useForgotPassword";
import { useVerifyEmail } from "@/features/authentication/hooks/useVerifyEmail";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "@/features/authentication/validation/auth.schemas";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export default function VerifyEmailScreen() {
  const searchParams = useSearchParams();
  const defaultEmail = useMemo(() => searchParams.get("email") ?? "", [searchParams]);
  const [resent, setResent] = useState(false);
  const verifyEmailMutation = useVerifyEmail();
  const resendMutation = useForgotPassword();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    register,
    setValue,
  } = useForm<VerifyEmailFormValues>({
    defaultValues: {
      code: "",
      email: defaultEmail,
    },
    resolver: zodResolver(verifyEmailSchema),
  });

  const email = useWatch({ control, name: "email" });
  const code = useWatch({ control, name: "code" });

  if (verifyEmailMutation.isSuccess) {
    return (
      <AuthCard>
        <AuthSuccessState
          actionHref="/login"
          actionLabel="Continue to login"
          description="Your email address has been verified. You can now access the full University Of AI platform."
          title="Email verified"
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Verify your email"
        description="Complete email verification to activate access to your dashboard, courses, live classes, and certificates."
      />

      <div className="space-y-5">
        <EmailVerificationBanner email={email} />
        {resent ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Verification email sent again. Check your inbox and spam folder.
          </div>
        ) : null}
      </div>

      <AuthForm
        className="mt-6"
        onSubmit={handleSubmit(async (values) => verifyEmailMutation.mutateAsync(values))}
      >
        <AuthField
          autoComplete="email"
          error={errors.email?.message}
          label="Email"
          placeholder="you@universityofai.com"
          type="email"
          {...register("email")}
        />

        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Verification code
          </span>
          <OTPInput
            error={errors.code?.message}
            onChange={(value) => setValue("code", value, { shouldValidate: true })}
            value={code}
          />
        </div>

        {verifyEmailMutation.isError ? (
          <AuthErrorState
            message={getErrorMessage(verifyEmailMutation.error, "Unable to verify email")}
          />
        ) : null}

        {verifyEmailMutation.isPending ? (
          <AuthLoadingState message="Verifying your email..." />
        ) : null}

        <Button
          loading={isSubmitting || verifyEmailMutation.isPending}
          size="lg"
          type="submit"
          className="w-full"
        >
          Verify email
        </Button>

        <button
          type="button"
          onClick={async () => {
            if (!email) return;
            await resendMutation.mutateAsync({ email });
            setResent(true);
          }}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Resend verification email
        </button>
      </AuthForm>

      <AuthFooter linkHref="/login" linkLabel="Back to sign in" prompt="Already verified?" />
    </AuthCard>
  );
}
