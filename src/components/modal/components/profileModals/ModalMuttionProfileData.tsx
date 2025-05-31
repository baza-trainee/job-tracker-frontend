import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { addProfileData } from "@/schemas/profile/addProfileDataSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/inputs/Input/Input";
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
    formState: { errors, isDirty },
  } = useForm<z.infer<(typeof addProfileData)[typeof cardsType]>>({
    resolver: zodResolver(addProfileData[cardsType]),
    mode: "all",
  });
  const { data } = useData();
  const { t } = useTranslation();

  const updateItem =
    useAppSelector((state) => state.modal.profileData) || false;

  const isUpdating = Boolean(updateItem?.typeModal);
  // const { onSubmit, isSubmitDisabled } = useMutationProfileData({
  //   isUpdating,
  //   cardsType,
  //   updateItem,
  //   errors,
  // });

  // const { handleRemove, isDisabledButtonRemove } = useRemoveProfileData({
  //   cardsType,
  //   idRemoveItem: updateItem.id,
  //   shoudCloseModal: true,
  // });
  useEffect(() => {
    if (!updateItem) return;
    setValue("name", updateItem.name || "");
    setValue("link", updateItem.link || "");
    setValue("technologies", updateItem.technologies || "");
    setValue("text", updateItem.description || updateItem.text);
  }, [updateItem]);

  const isDisabledSubmitButton =
    // isSubmitDisabled ||
    !isDirty ||
    (isUpdating &&
      (updateItem.name ? updateItem.name === watch("name") : true) &&
      (updateItem.link ? updateItem.link === watch("link") : true) &&
      (updateItem.technologies
        ? updateItem.technologies === watch("technologies")
        : true) &&
      (updateItem.description
        ? updateItem.description === watch("text")
        : true) &&
      (updateItem.text ? updateItem.text === watch("text") : true));
  //     ||
  //   !(
  //     (watch("name") ? watch("name") !== "" : true) &&
  //     (watch("link") ? watch("link") !== "" : true) &&
  //     (watch("technologies") ? watch("technologies") !== "" : true) &&
  //     (watch("text") ? watch("text") !== "" : true)
  //   );

  //alex
  const dispatch = useAppDispatch();

  const handleConfirmation = (
    typeConfirmation: TypesModal,
    // якщо add - дані форми, якщо ні = id резюме, листа або проекта
    add: boolean = false
  ) => {
    if (Object.keys(errors).length) {
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
        isButtonOpen: !isDisabledSubmitButton,
        resetForm: () =>
          handleConfirmation(typeConfirmationForModal as TypesModal, true),
      })
    );
  }, [isDisabledSubmitButton, errors]);

  return (
    <form
      className="flex h-full w-full flex-col gap-5"
      // onSubmit={handleSubmit(onSubmit)}
    >
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
            // type="reset"
            // onClick={handleRemove}
            type="button"
            onClick={handleRemoveButton}
            className="group gap-3"
            // disabled={isDisabledButtonRemove}
          >
            {t("infoModal.button.delete")}
            <Icon
              id="delete"
              className="h-6 w-6 fill-textBlack dark:group-hover:fill-blackColor"
            />
          </Button>
        )}
        <Button
          // type="submit"
          type="button"
          className="group gap-3"
          variant="accent"
          onClick={handleAddButton}
          disabled={isDisabledSubmitButton}
        >
          {t("infoModal.button.save")}
          <Icon
            id={`${isDisabledSubmitButton ? "check-box-gray" : "check-box"}`}
            className="h-6 w-6 fill-textBlack dark:group-hover:fill-blackColor"
          />
        </Button>
      </div>
    </form>
  );
}

export default ModalMuttionProfileData;
