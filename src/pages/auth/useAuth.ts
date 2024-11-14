import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignInSchema } from "../../schemas/SignInSchema";
import { LogInSchema } from "../../schemas/LogInSchema";
import { ForgotPasswordSchema } from "../../schemas/ForgotPasswordSchema";
import { ResetPasswordSchema } from "../../schemas/ResetPasswordSchema";

export function useAuthForm(
  type: "signUp" | "logIn" | "forgotPassword" | "resetPassword",
) {
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

  const onSubmit: SubmitHandler<z.infer<typeof initsSchema>> = async (data) => {
    try {
      setIsSending(true);
      console.log("data", data);
      setIsSending(false);
    } catch (error) {
      console.log("error", error);
      setIsSending(false);
    } finally {
      setIsSending(false);
      reset();
    }
  };
  return {
    register,
    handleSubmit,
    resetField,
    onSubmit,
    errors,
    isSending,
    isCleanInputsForm,
  };
}
