"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyEmail } from "@/features/authentication/services/authentication.service";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (response) => {
      toast.success(response.message || "Email verified");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to verify email"));
    },
  });
}
