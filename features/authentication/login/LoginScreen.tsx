"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import AuthField from "@/features/authentication/components/AuthField";
import PasswordInput from "@/features/authentication/components/PasswordInput";
import RememberMeCheckbox from "@/features/authentication/components/RememberMeCheckbox";
import SocialLoginButtons from "@/features/authentication/components/SocialLoginButtons";
import { useLogin } from "@/features/authentication/hooks/useLogin";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/authentication/validation/auth.schemas";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export default function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLogin();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    register,
    setValue,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    resolver: zodResolver(loginSchema),
  });

  const rememberMe = useWatch({ control, name: "rememberMe" });
  const password = useWatch({ control, name: "password" });

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome back"
        description="Sign in to access your courses, projects, live classes, certificates, and AI tools."
      />

      <AuthForm
        onSubmit={handleSubmit(async (values) => {
          await loginMutation.mutateAsync(values);
          router.push("/");
        })}
      >
        <AuthField
          autoComplete="email"
          error={errors.email?.message}
          label="Email"
          placeholder="you@instituteofai.com"
          type="email"
          {...register("email")}
        />

        <PasswordInput
          autoComplete="current-password"
          error={errors.password?.message}
          label="Password"
          name="password"
          onBlur={register("password").onBlur}
          onChange={(value) => setValue("password", value, { shouldValidate: true })}
          placeholder="Enter your password"
          value={password}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <RememberMeCheckbox
            checked={rememberMe}
            onCheckedChange={(checked) =>
              setValue("rememberMe", checked, { shouldValidate: true })
            }
          />
          <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Forgot password?
          </Link>
        </div>

        {loginMutation.isError ? (
          <AuthErrorState
            message={getErrorMessage(loginMutation.error, "Unable to sign in")}
          />
        ) : null}

        {loginMutation.isPending ? (
          <AuthLoadingState message="Signing you in securely..." />
        ) : null}

        <Button loading={isSubmitting || loginMutation.isPending} size="lg" type="submit" className="w-full">
          Sign in
        </Button>

        <AuthDivider />
        <SocialLoginButtons />
      </AuthForm>

      <AuthFooter
        linkHref="/register"
        linkLabel="Create account"
        prompt="New to Institute of AI?"
      />
    </AuthCard>
  );
}
