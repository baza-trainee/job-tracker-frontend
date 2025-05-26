import { Input } from "../../../inputs/Input/Input";
import { Button } from "../../../buttons/Button/Button";
import { Textarea } from "../../../Textarea/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { ContactUsSchema } from "../../../../schemas/ContactUsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../../store/hook";
import { closeModal } from "../../../../store/slices/modalSlice/modalSlice";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";
import { useEffect } from "react";

const ContactUs = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: dataUser } = useGetAllUserDataQuery();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof ContactUsSchema>>({
    defaultValues: {
      name: "",
      email: "",
      requestText: "",
    },
    resolver: zodResolver(ContactUsSchema),
    mode: "all",
  });
  useEffect(() => {
    reset({
      name: dataUser?.username || "",
      email: dataUser?.email || "",
      requestText: "",
    });
  }, [dataUser, reset]);

  const onSubmit: SubmitHandler<z.infer<typeof ContactUsSchema>> = (data) => {
    reset();
    console.log(data);
  };
  // -------------------------------------------------------------
  const handleCancel = (): void => {
    dispatch(closeModal());
  };
  const error = !!Object.keys(errors).length;
  const isCleanInputsForm =
    error || !watch("name") || !watch("email") || !watch("requestText");

  return (
    <div className="my-2 w-[449px] text-left xl:my-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 md:gap-4">
          <Input
            register={register}
            resetField={resetField}
            key="name"
            name="name"
            placeholder={t("contactUs.namePlaceholder")}
            type="text"
            className=""
            label={t("contactUs.name")}
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
            placeholder={t("contactUs.textPlaceholder")}
            className=""
            label={t("contactUs.text")}
            errors={errors}
          />

          <div className="flex flex-col justify-center gap-2 md:flex-row xl:mt-4">
            <Button
              type="button"
              className="md:mx-0 md:w-auto"
              disabled={isCleanInputsForm}
              variant="ghost"
              size="small"
              onClick={() => handleCancel()}
            >
              {t("infoModal.button.cancel")}
            </Button>
            <Button
              type="submit"
              className="w-full md:mx-0 md:w-auto"
              disabled={isCleanInputsForm}
              variant="accent"
              size="big"
            >
              {t("contactUs.send")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
