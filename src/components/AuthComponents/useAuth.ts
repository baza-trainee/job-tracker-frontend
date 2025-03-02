import { useMemo, useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpSchema } from "../../schemas/SignUpSchema";
import { LogInSchema } from "../../schemas/LogInSchema";
import { ForgotPasswordSchema } from "../../schemas/ForgotPasswordSchema";
import { ResetPasswordSchema } from "../../schemas/ResetPasswordSchema";
import {
  useForgotPasswordUserMutation,
  useLogInUserWithCredentialsMutation,
  useRegisterUserWithCredentialsMutation,
  useResetUserPasswordMutation,
} from "../../store/querySlices/authQuerySlice";

import { useAppDispatch } from "@/store/hook";
import { closeModal, openModal } from "@/store/slices/modalSlice/modalSlice";

export function useAuthForm(
  type: "signUp" | "logIn" | "forgotPassword" | "resetPassword"
) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginUser] = useLogInUserWithCredentialsMutation();

  const [registerUser] = useRegisterUserWithCredentialsMutation();

  const [forgotUserPassword] = useForgotPasswordUserMutation();

  const [resetUserPassword] = useResetUserPasswordMutation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    trigger,
    setValue,
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
      setIsLoading(true);
      // console.log(type, errors);
      try {
        switch (type) {
          case "signUp":
          case "logIn":
            if ("email" in data && "password" in data) {
              return type === "signUp"
                ? (await registerUser({
                    email: data.email,
                    password: data.password,
                  }),
                  navigate("/profile"))
                : await loginUser({
                    email: data.email,
                    password: data.password,
                  });
            }
            throw new Error("Missing email or password for sign-up or login");

          case "forgotPassword":
            if ("email" in data) {
              return (
                await forgotUserPassword({ email: data.email }),
                dispatch(
                  openModal({
                    typeModal: "forgotPasswordSuccess",
                  })
                )
              );
            }
            throw new Error("Missing email for password recovery");

          case "resetPassword":
            if ("password" in data) {
              const queryParams = new URLSearchParams(window.location.search);
              const tokenFromUrl = queryParams.get("verify");
              const token = tokenFromUrl || "";

              await resetUserPassword({
                password: data.password,
                token,
              });
              dispatch(
                openModal({
                  typeModal: "resetPasswordSuccess",
                })
              );
              setTimeout(() => {
                navigate("/log-in");
                dispatch(closeModal());
              }, 5000);

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
        setIsLoading(false);
      }
    },
    [
      dispatch,
      errors,
      forgotUserPassword,
      loginUser,
      navigate,
      registerUser,
      reset,
      resetUserPassword,
      type,
    ]
  );

  return {
    register,
    handleSubmit,
    reset,
    resetField,
    onSubmit,
    errors,
    isCleanInputsForm,
    isLoading,
    watch,
    trigger,
    setValue,
  };
}
