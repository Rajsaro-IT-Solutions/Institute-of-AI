"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Mock admin authentication for the University Of AI admin panel.
 * In production this should be replaced with server-verified role checks.
 */
export const ADMIN_PASSWORD = "admin123";

type AdminAuthState = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

/**
 * Storage factory for zustand's persist middleware.
 *
 * Throws on the server (where `window`/`localStorage` don't exist) so that
 * `createJSONStorage` catches it internally and returns `undefined` — which
 * makes the persist middleware take its graceful non-persistent path during
 * SSR. On the client it returns `localStorage`, so admin sessions survive
 * page reloads.
 */
function getBrowserStorage(): Storage {
  if (typeof window === "undefined") {
    // Intentionally thrown — createJSONStorage catches this and disables
    // persistence for the current (server) environment. SSR-safe by design.
    throw new Error("localStorage is unavailable during SSR");
  }
  return window.localStorage;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "uoa-admin-session",
      storage: createJSONStorage(getBrowserStorage),
    }
  )
);