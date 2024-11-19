import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../buttons/Button/Button";

import { Input } from "../../inputs/Input/Input";
import { InputPassword } from "../../inputs/InputPassword/InputPassword";

import { SignUpSchema } from "../../../schemas/SignUpSchema";

export const FormExample = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof SignUpSchema>>({
    defaultValues: {
      password: "",
      email: "",
    },

    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = async (
    data
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
      <form
        className="space-y-[30px] rounded-[20px] bg-background-form px-12 py-6 shadow-form_shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-[30px]">
          <Input
            register={register}
            resetField={resetField}
            key="email"
            name="email"
            placeholder="type your email"
            type="text"
            className=""
            label="Електронна пошта"
            errors={errors}
          />

          <InputPassword
            register={register}
            resetField={resetField}
            key="password"
            name="password"
            placeholder="type your password"
            type="text"
            label="Пароль"
            className=""
            errors={errors}
          />
        </div>

        <Button
          type="submit"
          className=""
          disabled={!isDirty || isSending}
          variant="ghost"
        >
          Register
        </Button>
      </form>
    </>
  );
};
