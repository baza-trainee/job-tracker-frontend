import { useMemo, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpSchema } from "../../schemas/SignUpSchema";
import { LogInSchema } from "../../schemas/LogInSchema";
import { ForgotPasswordSchema } from "../../schemas/ForgotPasswordSchema";
import { ResetPasswordSchema } from "../../schemas/ResetPasswordSchema";
import { useAppDispatch } from "../../store/hook";
import {
  refreshUser,
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
} from "../../store/slices/authSlice/authOperation";

export function useAuthForm(
  type: "signUp" | "logIn" | "forgotPassword" | "resetPassword"
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshUser());
  }, []);

  const formConfigs = useMemo(() => {
    return {
      signUp: {
        defaultValues: {
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        },
        schema: SignUpSchema,
      },
      logIn: {
        defaultValues: {
          email: "",
          password: "",
        },
        schema: LogInSchema,
      },
      forgotPassword: {
        defaultValues: {
          email: "",
        },
        schema: ForgotPasswordSchema,
      },
      resetPassword: {
        defaultValues: {
          password: "",
          confirmPassword: "",
        },
        schema: ResetPasswordSchema,
      },
    };
  }, []);

  const initsSchema = formConfigs[type].schema;
  const initDefaultValues = formConfigs[type].defaultValues;

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
    mode: "onBlur",
  });

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

      case "forgotPassword":
        return !emailWatch;

      case "resetPassword":
        return !passwordWatch || !confirmPasswordWatch;

      default:
        return false;
    }
  }, [watch, type]);

  const onSubmit: SubmitHandler<z.infer<typeof initsSchema>> = useCallback(
    async (data) => {
      try {
        switch (type) {
          case "signUp":
          case "logIn":
            if ("email" in data && "password" in data) {
              return type === "signUp"
                ? await dispatch(signUp(data))
                : await dispatch(logIn(data));
            }
            throw new Error("Missing email or password for sign-up or login");

          case "forgotPassword":
            if ("email" in data) {
              return await dispatch(forgotPassword(data));
            }
            throw new Error("Missing email for password recovery");

          case "resetPassword":
            if ("password" in data) {
              const queryParams = new URLSearchParams(window.location.search);
              const tokenFromUrl = queryParams.get("verify");
              const token = tokenFromUrl || "";
              await dispatch(resetPassword({ ...data, token }));
              navigate("/log-in");
              return;
            }
            throw new Error("Missing password or token for reset password");

          default:
            throw new Error("Unknown form type");
        }
      } catch (error) {
        console.error("Submission failed:", error);
      } finally {
        reset();
      }
    },
    [type, dispatch, reset, navigate]
  );

  return {
    register,
    handleSubmit,
    reset,
    resetField,
    onSubmit,
    errors,
    isCleanInputsForm,
  };
}
