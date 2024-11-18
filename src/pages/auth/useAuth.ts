import { useMemo, useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../config/axios";

import { SignInSchema } from "../../schemas/SignInSchema";
import { LogInSchema } from "../../schemas/LogInSchema";
import { ForgotPasswordSchema } from "../../schemas/ForgotPasswordSchema";
import { ResetPasswordSchema } from "../../schemas/ResetPasswordSchema";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../store/hook";
import {
  clearTokens,
  saveTokens,
} from "../../store/slices/authSlice/authSlice";
import { fetchUser } from "../../store/slices/authSlice/authOperation";

//TODO

export function useAuthForm(
  type: "signUp" | "logIn" | "forgotPassword" | "resetPassword"
) {
  const dispatch = useAppDispatch();
  const { tokens } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedTokens = localStorage.getItem("auth_tokens");
    if (storedTokens) {
      dispatch(saveTokens(JSON.parse(storedTokens)));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (tokens) {
        try {
          await dispatch(fetchUser()).unwrap();
        } catch (error) {
          console.error("Failed to fetch user:", error);
          dispatch(clearTokens());
        }
      }
    };

    fetchData();
  }, [tokens, dispatch]);

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

  const isCleanInputsForm = useCallback(() => {
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
  }, [watch, type]);

  const onSubmit: SubmitHandler<z.infer<typeof initsSchema>> = useCallback(
    async (data) => {
      if ("email" in data && "password" in data) {
        try {
          setIsSending(true);
          const response = await axios.post(`/auth/${initAuthRoutes}`, {
            email: data.email,
            password: data.password,
          });
          dispatch(saveTokens(response.data));
          await dispatch(fetchUser()).unwrap();
          setIsSending(false);
        } catch (error: any) {
          if (error.response?.status === 409) {
            alert("Обліковий запис з такою поштою існує");
          }
          console.error(`${initErrorMessage} failed`, error);
          setIsSending(false);
          throw new Error(`${initErrorMessage} failed`);
        } finally {
          setIsSending(false);
          reset();
        }
      }
    },
    [dispatch, reset, initAuthRoutes, initErrorMessage]
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
  };
}
