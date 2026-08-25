"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPassword } from "@/features/authentication/services/authentication.service";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Password updated");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to update password"));
    },
  });
}
