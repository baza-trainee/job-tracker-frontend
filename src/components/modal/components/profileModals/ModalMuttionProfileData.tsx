import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { addProfileData } from "@/schemas/addProfileDataSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/store/hook";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/inputs/Input/Input";
import { Button } from "@/components/buttons/Button/Button";
import { PropsModalAddProperties, useData } from "./modalAddProperties.types";
import Icon from "@/components/Icon/Icon";
import useMutationProfileData from "@/components/Profile/hooks/useMutationProfileData";
import useRemoveProfileData from "@/components/Profile/hooks/useRemoveProfileData";

function ModalMuttionProfileData({ cardsType }: PropsModalAddProperties) {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<z.infer<(typeof addProfileData)[typeof cardsType]>>({
    resolver: zodResolver(addProfileData[cardsType]),
    mode: "all",
  });
  const { data } = useData();
  const { t } = useTranslation();

  const updateItem =
    useAppSelector((state) => state.modal.dataConfirmation) || false;

  const isUpdating = Boolean(updateItem?.typeModal);
  const { onSubmit, isSubmitDisabled } = useMutationProfileData({
    isUpdating,
    cardsType,
    updateItem,
    errors,
  });
  const { handleRemove, isDisabledButtonRemove } = useRemoveProfileData({
    cardsType,
    idRemoveItem: updateItem.id,
    shoudCloseModal: true,
  });
  useEffect(() => {
    if (!updateItem) return;
    setValue("name", updateItem.name || "");
    setValue("link", updateItem.link || "");
    setValue("technologies", updateItem.technologies || "");
    setValue("text", updateItem.description || updateItem.text);
  }, [updateItem]);

  return (
    <form
      className="flex h-full w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        autoFocus
        label={data[cardsType].name}
        name="name"
        placeholder={data[cardsType].placeholderName}
        register={register}
        errors={errors}
        resetField={resetField}
        isCheckButtons={false}
      />

      {data[cardsType].technologies && (
        <Input
          label={data[cardsType].technologies}
          name="technologies"
          placeholder={data[cardsType].placeholderTechnology as string}
          register={register}
          errors={errors}
          resetField={resetField}
          isCheckButtons={false}
        />
      )}
      {data[cardsType].link && (
        <Input
          label={data[cardsType].link}
          name="link"
          placeholder={data[cardsType].placeholderLink}
          register={register}
          errors={errors}
          resetField={resetField}
          isCheckButtons={false}
        />
      )}
      {data[cardsType].text && (
        <Input
          id="textCoverLetter"
          type="textarea"
          label={data[cardsType].text}
          name="text"
          placeholder={data[cardsType].placeholderText}
          register={register}
          errors={errors}
          resetField={resetField}
          isCheckButtons={false}
        />
      )}
      <div className="flex flex-col-reverse justify-center gap-5 md:flex-row">
        {cardsType !== "addPersonalProperties" && isUpdating && (
          <Button
            type="reset"
            onClick={handleRemove}
            disabled={isDisabledButtonRemove}
          >
            {t("infoModal.button.delete")}
            <Icon id="delete" className="h-6 w-6" />
          </Button>
        )}
        <Button
          type="submit"
          className="gap-3"
          variant="accent"
          disabled={isSubmitDisabled}
        >
          {t("infoModal.button.save")}
          <Icon id="check-box" className="h-6 w-6" />
        </Button>
      </div>
    </form>
  );
}

export default ModalMuttionProfileData;
