import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ.,'’\- ]+$/;
const passwordRegex =
  /^(?=.*[A-Z\u0400-\u04FF])(?=.*\d)[A-Za-z\u0400-\u04FF\d]{8,}$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const RegisterSchema = z.object({
  username: z
  .string()
  .min(1, "Required")
  .regex(nameRegex, `Regex error`)
  .max(50, `Max 50}`)
  .min(2, `Min 2`),

  email: z
    .string()
    .min(1, "Required")
    .regex(emailRegex, `Regex error`)
    .max(40, `Max 40`)
    .min(4, `Min 4`),

  password: z
    .string()
    .min(1, "Required")
    .min(8, `Min 8`)
    .regex(passwordRegex, `Regex error`)
    .max(50, `Max 50`),

  confirm_password: z
    .string()
    .min(1, "Required")
    .min(8, `Min 8`)
    .regex(passwordRegex, `Regex error`)
    .max(50, `Max 50`),

  terms: z.boolean().refine((value) => value === true, {
    message: "Дайте згоду",
  }),
});

export function useAuthForm() {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof RegisterSchema>>({
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const [isSending, setIsSending] = useState(false);

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    data,
  ) => {
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
    isDirty,
    isSending,
  };
}
