import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordRegex =
  /^(?=.*[A-Z\u0400-\u04FF])(?=.*\d)[A-Za-z\u0400-\u04FF\d]{8,}$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SignInSchema = z
  .object({
    email: z
      .string()
      .min(1, "Помилка")
      .max(40, `Max 40`)
      .regex(emailRegex, `Електронна пошта має містити “@” та “.com”`)
      .min(4, `Min 4`)
      .trim(),

    password: z
      .string()
      .min(1, "Помилка")
      .max(50, `Пароль має містити менше 50 символів`)
      .min(8, `Пароль має містити 8 символів`)
      .regex(passwordRegex, `Невірний формат`),

    confirmPassword: z
    .string()
    .min(1, "Помилка")
    .max(50, `Пароль має містити менше 50 символів`)
    .regex(passwordRegex, `Невірний формат`)
    .min(8, `Пароль має містити 8 символів`),

    terms: z.boolean().refine((value) => value === true, {
      message: "Дайте згоду",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Введенные пароли не совпадают",
  });

export const LogInSchema = z.object({
  email: z
    .string()
    .min(1, "Помилка")
    .max(40, `Max 40`)
    .regex(emailRegex, `Електронна пошта має містити “@” та “.com”`)
    .min(4, `Min 4`)
    .trim(),

  password: z
    .string()
    .min(1, "Помилка")
    .max(50, `Пароль має містити менше 8 символів`)
    .regex(passwordRegex, `Regex error`)
    .min(8, `Пароль має містити 8 символів`),
});

export function useAuthForm(type: "signUp" | "logIn") {
  console.log("type - ", type);

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
        return !emailWatch || !passwordWatch || !confirmPasswordWatch || !termsWatch;

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
