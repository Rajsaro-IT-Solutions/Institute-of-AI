"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { register } from "@/features/authentication/services/authentication.service";
import { getErrorMessage } from "@/features/authentication/utils/format-error";

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      toast.success(response.message || "Account created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to create account"));
    },
  });
}
