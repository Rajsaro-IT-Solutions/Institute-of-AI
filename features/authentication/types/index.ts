export type AuthProvider = "google" | "github" | "microsoft";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type AuthResponse = {
  message: string;
  user?: AuthUser;
  tokens?: AuthTokens;
};

export type ApiError = {
  message: string;
  status?: number;
  fieldErrors?: Record<string, string[]>;
};

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type VerifyEmailPayload = {
  code: string;
  email?: string;
};
