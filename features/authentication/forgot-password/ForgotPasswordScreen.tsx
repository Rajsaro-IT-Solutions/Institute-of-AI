"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AuthCard from "@/features/authentication/components/AuthCard";
import AuthErrorState from "@/features/authentication/components/AuthErrorState";
import AuthFooter from "@/features/authentication/components/AuthFooter";
import AuthForm from "@/features/authentication/components/AuthForm";
import AuthHeader from "@/features/authentication/components/AuthHeader";
import AuthLoadingState from "@/features/authentication/components/AuthLoadingState";
import AuthSuccessState from "@/features/authentication/components/AuthSuccessState";
import AuthField from "@/features/authentication/components/AuthField";
import { useForgotPassword } from "@/features/authentication/hooks/useForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/authentication/validation/auth.schemas";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export default function ForgotPasswordScreen() {
  const forgotPasswordMutation = useForgotPassword();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  if (forgotPasswordMutation.isSuccess) {
    return (
      <AuthCard>
        <AuthSuccessState
          actionHref="/login"
          actionLabel="Back to login"
          description="If the email exists in our system, a reset link is already on its way."
          title="Check your inbox"
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Forgot your password?"
        description="Enter your email and we’ll send a secure link to reset your password."
      />

      <AuthForm
        onSubmit={handleSubmit(async (values) => forgotPasswordMutation.mutateAsync(values))}
      >
        <AuthField
          autoComplete="email"
          error={errors.email?.message}
          label="Email"
          placeholder="you@universityofai.com"
          type="email"
          {...register("email")}
        />

        {forgotPasswordMutation.isError ? (
          <AuthErrorState
            message={getErrorMessage(
              forgotPasswordMutation.error,
              "Unable to send reset link"
            )}
          />
        ) : null}

        {forgotPasswordMutation.isPending ? (
          <AuthLoadingState message="Sending reset instructions..." />
        ) : null}

        <Button
          loading={isSubmitting || forgotPasswordMutation.isPending}
          size="lg"
          type="submit"
          className="w-full"
        >
          Send reset link
        </Button>
      </AuthForm>

      <AuthFooter linkHref="/login" linkLabel="Back to sign in" prompt="Remembered it?" />
    </AuthCard>
  );
}
