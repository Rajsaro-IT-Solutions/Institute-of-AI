"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { login } from "@/features/authentication/services/authentication.service";
import { getErrorMessage } from "@/features/authentication/utils/format-error";
import { useAuthStore } from "@/features/authentication/utils/auth-store";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.user) {
        setUser(response.user);
      }
      toast.success(response.message || "Logged in successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to sign in"));
    },
  });
}
