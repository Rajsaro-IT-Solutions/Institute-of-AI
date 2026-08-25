import type {
  ApiError,
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from "@/features/authentication/types";

const AUTH_API = {
  forgotPassword: "/api/v1/auth/forgot-password",
  login: "/api/v1/auth/login",
  logout: "/api/v1/auth/logout",
  refreshToken: "/api/v1/auth/refresh-token",
  register: "/api/v1/auth/register",
  resetPassword: "/api/v1/auth/reset-password",
  verifyEmail: "/api/v1/auth/verify-email",
} as const;

async function postJson<TPayload>(url: string, payload?: TPayload): Promise<AuthResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    let errorBody: ApiError | undefined;

    try {
      errorBody = (await response.json()) as ApiError;
    } catch {
      errorBody = undefined;
    }

    throw {
      message: errorBody?.message ?? "Authentication request failed",
      status: response.status,
      fieldErrors: errorBody?.fieldErrors,
    } satisfies ApiError;
  }

  return (await response.json()) as AuthResponse;
}

export function login(payload: LoginPayload) {
  return postJson(AUTH_API.login, payload);
}

export function register(payload: RegisterPayload) {
  return postJson(AUTH_API.register, payload);
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return postJson(AUTH_API.forgotPassword, payload);
}

export function resetPassword(payload: ResetPasswordPayload) {
  return postJson(AUTH_API.resetPassword, payload);
}

export function verifyEmail(payload: VerifyEmailPayload) {
  return postJson(AUTH_API.verifyEmail, payload);
}

export function logout() {
  return postJson(AUTH_API.logout);
}

export function refreshToken() {
  return postJson(AUTH_API.refreshToken);
}
