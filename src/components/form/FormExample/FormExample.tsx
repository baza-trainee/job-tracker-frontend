import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../buttons/Button/Button";

import { Input } from "../../inputs/Input/Input";
import { InputPassword } from "../../inputs/InputPassword/InputPassword";

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

  password: z
    .string()
    .min(1, "Required")
    .min(8, `Min 8`)
    .regex(passwordRegex, `Regex error`)
    .max(50, `Max 50`),
  email: z
    .string()
    .min(1, "Required")
    .regex(emailRegex, `Regex error`)
    .max(40, `Max 40`)
    .min(4, `Min 4`),
});

export const FormExample = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<z.infer<typeof RegisterSchema>>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },

    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

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

  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <Input
            register={register}
            key="username"
            name="username"
            placeholder="type your name"
            type="text"
            className=""
            errors={errors}
          />

          <Input
            register={register}
            key="email"
            name="email"
            placeholder="type your email"
            type="email"
            className=""
            errors={errors}
          />

          <InputPassword
            register={register}
            key="password"
            name="password"
            placeholder="type your password"
            type="text"
            className=""
            errors={errors}
          />
        </div>

        <Button
          type="submit"
          className=""
          disabled={!isDirty || isSending || !isValid}
          variant="white"
        >
          Register
        </Button>
      </form>
    </>
  );
};