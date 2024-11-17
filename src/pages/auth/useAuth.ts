import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { SignInSchema } from "../../schemas/SignInSchema";
import { LogInSchema } from "../../schemas/LogInSchema";
import { ForgotPasswordSchema } from "../../schemas/ForgotPasswordSchema";
import { ResetPasswordSchema } from "../../schemas/ResetPasswordSchema";

//TODO
interface User {
  id: string;
  username: string;
}

interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export function useAuthForm(
  type: "signUp" | "logIn" | "forgotPassword" | "resetPassword"
) {
  const [user, setUser] = useState<User | null>(null);
  const tokensRef = useRef<AuthTokens | null>(null);

  useEffect(() => {
    const storedTokens = localStorage.getItem("auth_tokens");
    if (storedTokens) {
      tokensRef.current = JSON.parse(storedTokens);
    }
  }, []);

  const saveTokens = useCallback((newTokens: AuthTokens) => {
    localStorage.setItem("auth_tokens", JSON.stringify(newTokens));
    tokensRef.current = newTokens;
  }, []);
  const clearTokens = useCallback(() => {
    localStorage.removeItem("auth_tokens");
    tokensRef.current = null;
  }, []);

  const refreshTokens = useCallback(async () => {
    if (!tokensRef.current) throw new Error("No refresh token available");
    try {
      const response = await axios.post("/auth/refresh", {
        refresh_token: tokensRef.current.refresh_token,
      });
      saveTokens(response.data);
      return response.data.access_token;
    } catch (error) {
      console.error("Token refresh failed", error);
      clearTokens();
      throw error;
    }
  }, [saveTokens, clearTokens]);

  const fetchUser = useCallback(async () => {
    if (!tokensRef.current) return;

    try {
      const response = await axios.get("/user/profile", {
        headers: { Authorization: `Bearer ${tokensRef.current.access_token}` },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshTokens();
          const retryResponse = await axios.get("/user/profile", {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          setUser(retryResponse.data);
          console.log(retryResponse.data);
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          clearTokens();
          setUser(null);
        }
      } else {
        console.error("Failed to fetch user", error);
        setUser(null);
      }
    }
  }, [refreshTokens, clearTokens]);

  useEffect(() => {
    if (tokensRef.current) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [fetchUser]);

  const formConfigs = useMemo(() => {
    return {
      signUp: {
        defaultValues: {
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        },
        schema: SignInSchema,
        authRoutes: "register",
        errorMessage: "Registration",
      },
      logIn: {
        defaultValues: {
          email: "",
          password: "",
        },
        schema: LogInSchema,
        authRoutes: "login",
        errorMessage: "Login",
      },
      forgotPassword: {
        defaultValues: {
          email: "",
        },
        schema: ForgotPasswordSchema,
        authRoutes: "",
        errorMessage: "",
      },
      resetPassword: {
        defaultValues: {
          confirmCode: "",
          newPassword: "",
        },
        schema: ResetPasswordSchema,
        authRoutes: "",
        errorMessage: "",
      },
    };
  }, []);

  const initsSchema = formConfigs[type].schema;
  const initDefaultValues = formConfigs[type].defaultValues;
  const initAuthRoutes = formConfigs[type].authRoutes;
  const initErrorMessage = formConfigs[type].errorMessage;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    resetField,
    formState: { errors },
  } = useForm<z.infer<typeof initsSchema>>({
    defaultValues: initDefaultValues,
    resolver: zodResolver(initsSchema),
    mode: "onChange",
  });

  const [isSending, setIsSending] = useState(false);

  const isCleanInputsForm = () => {
    const emailWatch = watch("email");
    const passwordWatch = watch("password");
    const confirmPasswordWatch = watch("confirmPassword");
    const termsWatch = watch("terms");

    switch (type) {
      case "signUp":
        return (
          !emailWatch || !passwordWatch || !confirmPasswordWatch || !termsWatch
        );

      case "logIn":
        return !emailWatch || !passwordWatch;

      default:
        return "";
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof initsSchema>> = useCallback(
    async (data) => {
      if ("email" in data && "password" in data) {
        try {
          setIsSending(true);
          const response = await axios.post(
            `https://job-tracker-backend-x.vercel.app/api/auth/${initAuthRoutes}`,
            {
              email: data.email,
              password: data.password,
            }
          );
          saveTokens(response.data);
          await fetchUser();
          setIsSending(false);
          console.log("Вдало >> ", data)
        } catch (error) {
          console.error(`${initErrorMessage} failed`, error);
          setIsSending(false);
          throw new Error(`${initErrorMessage} failed`);
        } finally {
          setIsSending(false);
          reset();
        }
      }
    },
    [saveTokens, fetchUser, reset, initAuthRoutes, initErrorMessage]
  );

  const handleGoogleLogin = useCallback(() => {
    window.location.href =
      "https://job-tracker-backend-x.vercel.app/api/auth/google";
  }, []);

  const handleGithubLogin = useCallback(() => {
    window.location.href =
      "https://job-tracker-backend-x.vercel.app/api/auth/github";
  }, []);

  return {
    register,
    handleSubmit,
    reset,
    resetField,
    onSubmit,
    errors,
    isSending,
    isCleanInputsForm,
    handleGoogleLogin,
    handleGithubLogin,
    user
  };
}
