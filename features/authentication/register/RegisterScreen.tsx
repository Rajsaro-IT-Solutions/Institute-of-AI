"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AuthCard from "@/features/authentication/components/AuthCard";
import AuthDivider from "@/features/authentication/components/AuthDivider";
import AuthErrorState from "@/features/authentication/components/AuthErrorState";
import AuthFooter from "@/features/authentication/components/AuthFooter";
import AuthForm from "@/features/authentication/components/AuthForm";
import AuthHeader from "@/features/authentication/components/AuthHeader";
import AuthLoadingState from "@/features/authentication/components/AuthLoadingState";
import AuthSuccessState from "@/features/authentication/components/AuthSuccessState";
import AuthField from "@/features/authentication/components/AuthField";
import PasswordInput from "@/features/authentication/components/PasswordInput";
import PasswordStrengthMeter from "@/features/authentication/components/PasswordStrengthMeter";
import SocialLoginButtons from "@/features/authentication/components/SocialLoginButtons";
import { useRegister } from "@/features/authentication/hooks/useRegister";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/authentication/validation/auth.schemas";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export default function RegisterScreen() {
  const registerMutation = useRegister();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    register,
    setValue,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      acceptTerms: false,
      confirmPassword: "",
      email: "",
      fullName: "",
      password: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  if (registerMutation.isSuccess) {
    return (
      <AuthCard>
        <AuthSuccessState
          actionHref="/verify-email"
          actionLabel="Verify email"
          description="Your account has been created. Check your inbox for a verification link or continue to code verification."
          title="Registration successful"
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        description="Join University Of AI to unlock structured learning, expert mentorship, and premium AI workflows."
      />

      <AuthForm
        onSubmit={handleSubmit(async (values) =>
          registerMutation.mutateAsync({
            ...values,
            acceptTerms: Boolean(values.acceptTerms),
          })
        )}
      >
        <AuthField
          autoComplete="name"
          error={errors.fullName?.message}
          label="Full name"
          placeholder="Aarav Sharma"
          {...register("fullName")}
        />
        <AuthField
          autoComplete="email"
          error={errors.email?.message}
          label="Email"
          placeholder="you@universityofai.com"
          type="email"
          {...register("email")}
        />
        <AuthField
          autoComplete="tel"
          error={errors.phone?.message}
          hint="Include country code if available"
          label="Phone"
          placeholder="+91 98765 43210"
          type="tel"
          {...register("phone")}
        />
        <PasswordInput
          autoComplete="new-password"
          error={errors.password?.message}
          hint="At least 8 characters with uppercase, lowercase, number, and symbol"
          label="Password"
          name="password"
          onBlur={register("password").onBlur}
          onChange={(value) => setValue("password", value, { shouldValidate: true })}
          placeholder="Create a secure password"
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
          placeholder="Re-enter your password"
          value={confirmPassword}
        />

        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500"
            {...register("acceptTerms")}
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-700">
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Privacy Policy
            </Link>
            {errors.acceptTerms?.message ? (
              <span className="mt-1 block text-rose-600">{errors.acceptTerms.message}</span>
            ) : null}
          </span>
        </label>

        {registerMutation.isError ? (
          <AuthErrorState
            message={getErrorMessage(registerMutation.error, "Unable to create account")}
          />
        ) : null}

        {registerMutation.isPending ? (
          <AuthLoadingState message="Creating your secure account..." />
        ) : null}

        <Button
          loading={isSubmitting || registerMutation.isPending}
          size="lg"
          type="submit"
          className="w-full"
        >
          Create account
        </Button>

        <AuthDivider />
        <SocialLoginButtons />
      </AuthForm>

      <AuthFooter
        linkHref="/login"
        linkLabel="Sign in"
        prompt="Already have an account?"
      />
    </AuthCard>
  );
}
