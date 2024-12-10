import { Input } from "../../inputs/Input/Input";
import { Button } from "../../buttons/Button/Button";
import { Textarea } from "../../Textarea/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { ContactUsSchema } from "../../../schemas/ContactUsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactUs = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<z.infer<typeof ContactUsSchema>>({
    defaultValues: {
      name: "",
      email: "",
      requestText: "",
    },
    resolver: zodResolver(ContactUsSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<z.infer<typeof ContactUsSchema>> = (data) => {
    reset();
    console.log(data);
  };

  const error = !!Object.keys(errors).length;

  return (
    <div className="w-[449px] text-left my-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            register={register}
            resetField={resetField}
            key="name"
            name="name"
            placeholder={"Вкажіть ваше ім’я"}
            type="text"
            className=""
            label="Ім’я"
            errors={errors}
          />
          <Input
            register={register}
            resetField={resetField}
            key="email"
            name="email"
            placeholder={t("register.enterEmail")}
            type="text"
            className=""
            label={t("register.email")}
            errors={errors}
          />
          <Textarea
            register={register}
            resetField={resetField}
            key="requestText"
            name="requestText"
            placeholder="Введіть текст звернення"
            className=""
            label="Текст звернення"
            errors={errors}
          />

          <div className="-mt-4 flex">
            <Button
              type="button"
              className="mx-auto mt-8"
              // disabled={isCleanInputsForm() || errors || loading}
              disabled={error}
              variant="ghost"
              size="small"
              onClick={() => reset()}
            >
              Скасувати
            </Button>
            <Button
              type="submit"
              className="mx-auto mt-8"
              disabled={error}
              variant="ghost"
              size="big"
            >
              Надіслати
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
