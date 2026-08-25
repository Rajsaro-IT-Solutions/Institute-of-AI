"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AuthCard from "@/features/authentication/components/AuthCard";
import AuthErrorState from "@/features/authentication/components/AuthErrorState";
import AuthFooter from "@/features/authentication/components/AuthFooter";
import AuthForm from "@/features/authentication/components/AuthForm";
import AuthHeader from "@/features/authentication/components/AuthHeader";
import AuthLoadingState from "@/features/authentication/components/AuthLoadingState";
import AuthSuccessState from "@/features/authentication/components/AuthSuccessState";
import PasswordInput from "@/features/authentication/components/PasswordInput";
import PasswordStrengthMeter from "@/features/authentication/components/PasswordStrengthMeter";
import { useResetPassword } from "@/features/authentication/hooks/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/authentication/validation/auth.schemas";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export default function ResetPasswordScreen() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const resetPasswordMutation = useResetPassword();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    setValue,
    register,
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      confirmPassword: "",
      password: "",
      token,
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  if (!token) {
    return (
      <AuthCard>
        <AuthErrorState message="Reset token is missing. Request a new password reset link to continue." />
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href="/forgot-password">Request new reset link</Link>
          </Button>
        </div>
      </AuthCard>
    );
  }

  if (resetPasswordMutation.isSuccess) {
    return (
      <AuthCard>
        <AuthSuccessState
          actionHref="/login"
          actionLabel="Sign in now"
          description="Your password was updated successfully. Use your new credentials to continue."
          title="Password updated"
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Set a new password"
        description="Choose a strong password to protect your learning workspace and account data."
      />

      <AuthForm
        onSubmit={handleSubmit(async (values) => {
          await resetPasswordMutation.mutateAsync({ ...values, token });
        })}
      >
        <PasswordInput
          autoComplete="new-password"
          error={errors.password?.message}
          label="New password"
          name="password"
          onBlur={register("password").onBlur}
          onChange={(value) => setValue("password", value, { shouldValidate: true })}
          placeholder="Create a new password"
          value={password}
        />
        <PasswordStrengthMeter password={password} />
        <PasswordInput
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          label="Confirm password"
          name="confirmPassword"
          onBlur={register("confirmPassword").onBlur}
          onChange={(value) =>
            setValue("confirmPassword", value, { shouldValidate: true })
          }
          placeholder="Confirm your new password"
          value={confirmPassword}
        />

        {resetPasswordMutation.isError ? (
          <AuthErrorState
            message={getErrorMessage(
              resetPasswordMutation.error,
              "Unable to update password"
            )}
          />
        ) : null}

        {resetPasswordMutation.isPending ? (
          <AuthLoadingState message="Updating your password..." />
        ) : null}

        <Button
          loading={isSubmitting || resetPasswordMutation.isPending}
          size="lg"
          type="submit"
          className="w-full"
        >
          Update password
        </Button>
      </AuthForm>

      <AuthFooter linkHref="/login" linkLabel="Back to sign in" prompt="Need your account again?" />
    </AuthCard>
  );
}
