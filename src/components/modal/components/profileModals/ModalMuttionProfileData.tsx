import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { addProfileData } from "@/schemas/profile/addProfileDataSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/inputs/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea.tsx";
import { Button } from "@/components/buttons/Button/Button";
import { PropsModalAddProperties, useData } from "./modalAddProperties.types";
import Icon from "@/components/Icon/Icon";
// import useMutationProfileData from "@/components/Profile/hooks/useMutationProfileData";
// import useRemoveProfileData from "@/components/Profile/hooks/useRemoveProfileData";

import {
  openConfirmation,
  closeButton,
} from "@/store/slices/modalSlice/modalSlice";
import { TypesModal } from "../../ModalMain.types";

function ModalMuttionProfileData({ cardsType }: PropsModalAddProperties) {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<(typeof addProfileData)[typeof cardsType]>>({
    resolver: zodResolver(addProfileData[cardsType]),
    mode: "all",
  });
  const { data } = useData();
  const { t } = useTranslation();

  const updateItem =
    useAppSelector((state) => state.modal.profileData) || false;

  const isUpdating = Boolean(updateItem?.typeModal);

  useEffect(() => {
    if (!updateItem) return;
    setValue("name", updateItem.name || "");
    setValue("link", updateItem.link || "");
    setValue("technologies", updateItem.technologies || "");
    setValue("text", updateItem.description || updateItem.text);
  }, [updateItem]);

  // alex
  const name = watch("name");
  const link = watch("link");
  const technologies = watch("technologies");
  const text = watch("text");
  const error = Object.keys(errors).length > 0;

  const isFormEmpty: boolean =
    (!name || name === "") &&
    (!link || link === "") &&
    (!technologies || technologies === "") &&
    (!text || text === "");

  const isFormComplete: boolean =
    (name !== undefined ? name !== "" : true) &&
    (link !== undefined ? link !== "" : true) &&
    (technologies !== undefined ? technologies !== "" : true) &&
    (text !== undefined ? text !== "" : true);

  const isFormChanged: boolean = updateItem
    ? (updateItem.name ? updateItem.name === name : true) &&
      (updateItem.link ? updateItem.link === link : true) &&
      (updateItem.technologies
        ? updateItem.technologies === technologies
        : true) &&
      (updateItem.description ? updateItem.description === text : true) &&
      (updateItem.text ? updateItem.text === text : true)
    : isFormEmpty;

  const isButtonDisabled = isFormChanged || error || !isFormComplete;

  const dispatch = useAppDispatch();

  const handleConfirmation = (
    typeConfirmation: TypesModal,
    // якщо add - дані форми, якщо ні = id резюме, листа або проекта
    add: boolean = false
  ) => {
    if (error) {
      dispatch(openConfirmation({ typeConfirmation: "closeDiscardModal" }));
    }
    handleSubmit((data) => {
      console.log("data", data);
      dispatch(
        openConfirmation({
          typeConfirmation,
          dataConfirmation: add ? data : updateItem.id,
        })
      );
    })();
  };
  // add
  const handleAddButton = () => {
    const typeConfirmationAdd: string = "update" + cardsType.slice(3);
    handleConfirmation(typeConfirmationAdd as TypesModal, true);
  };

  // remove
  const handleRemoveButton = () => {
    const typeConfirmationRemove: string = "remove" + cardsType.slice(3);
    handleConfirmation(typeConfirmationRemove as TypesModal);
  };

  // closeButtonModal
  useEffect(() => {
    const typeConfirmationForModal: string = "update" + cardsType.slice(3);
    dispatch(
      closeButton({
        isButtonOpen: !isFormChanged,
        resetForm: () =>
          handleConfirmation(typeConfirmationForModal as TypesModal, true),
      })
    );
  }, [isFormChanged, errors]);

  return (
    <form className="flex h-full w-full flex-col gap-5">
      <Input
        autoFocus
        label={data[cardsType].name}
        name="name"
        placeholder={data[cardsType].placeholderName}
        register={register}
        errors={errors}
        resetField={resetField}
        isCheckButtons={true}
      />

      {data[cardsType].technologies && (
        <Input
          label={data[cardsType].technologies}
          name="technologies"
          placeholder={data[cardsType].placeholderTechnology as string}
          register={register}
          errors={errors}
          resetField={resetField}
          isCheckButtons={true}
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
          isCheckButtons={true}
        />
      )}
      {data[cardsType].text && (
        // <Input
        //   id="textCoverLetter"
        //   type="textarea"
        //   label={data[cardsType].text}
        //   name="text"
        //   placeholder={data[cardsType].placeholderText}
        //   register={register}
        //   errors={errors}
        //   resetField={resetField}
        //   isCheckButtons={false}
        // />
        <Textarea
          id="textCoverLetter"
          label={data[cardsType].text}
          name="text"
          placeholder={data[cardsType].placeholderText}
          register={register}
          errors={errors}
          resetField={resetField}
          watch={watch}
        />
      )}
      <div className="flex flex-col-reverse justify-center gap-5 md:flex-row">
        {cardsType !== "addPersonalProperties" && isUpdating && (
          <Button
            // type="reset"
            // onClick={handleRemove}
            type="button"
            onClick={handleRemoveButton}
            className="group gap-3"
            // disabled={isDisabledButtonRemove}
          >
            {t("infoModal.button.delete")}
            <Icon id="delete" className="h-6 w-6" />
          </Button>
        )}
        <Button
          // type="submit"
          type="button"
          className="group gap-3"
          variant="accent"
          onClick={handleAddButton}
          disabled={isButtonDisabled}
        >
          {t("infoModal.button.save")}
          <Icon
            id={`${isButtonDisabled ? "check-box-gray" : "check-box"}`}
            className="h-6 w-6"
          />
        </Button>
      </div>
    </form>
  );
}

export default ModalMuttionProfileData;
