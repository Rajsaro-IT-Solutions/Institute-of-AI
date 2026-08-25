"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPassword } from "@/features/authentication/services/authentication.service";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Password reset link sent");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to send reset link"));
    },
  });
}
