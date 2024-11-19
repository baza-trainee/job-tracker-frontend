import { useMemo, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpSchema } from "../../schemas/SignUpSchema";
import { LogInSchema } from "../../schemas/LogInSchema";
import { ForgotPasswordSchema } from "../../schemas/ForgotPasswordSchema";
import { ResetPasswordSchema } from "../../schemas/ResetPasswordSchema";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  clearTokens,
  saveTokens,
} from "../../store/slices/authSlice/authSlice";
import {
  fetchUser,
  signUp,
  logIn,
} from "../../store/slices/authSlice/authOperation";

//TODO

export function useAuthForm(
  type: "signUp" | "logIn" | "forgotPassword" | "resetPassword"
) {
  const dispatch = useAppDispatch();
  const { user, tokens } = useAppSelector((state) => state.auth);
  console.log("user",user);

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
          confirmCode: "",
          newPassword: "",
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
    mode: "onChange",
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

      default:
        return "";
    }
  }, [watch, type]);

  const onSubmit: SubmitHandler<z.infer<typeof initsSchema>> = useCallback(
    async (data) => {
      try {
        if ("email" in data && "password" in data) {
          switch (type) {
            case "signUp":
              return await dispatch(signUp(data));
            case "logIn":
              return await dispatch(logIn(data));
            default:
              throw new Error("Unknown form type");
          }
        }
      } catch (error) {
        console.error("Submission failed:", error);
      } finally {
        reset();
      }
    },
    [type, dispatch, reset]
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
