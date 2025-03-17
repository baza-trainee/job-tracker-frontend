import { useCallback } from "react";
import {
  closeConfirmation,
  closeModal,
  openModal,
  openConfirmation,
} from "../../../../store/slices/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { notifyInfo } from "../../../Notifications/NotificationService";

import {
  setSearchQuery,
  setSortType,
} from "../../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";

import { useLogOutUserMutation } from "../../../../store/querySlices/authQuerySlice";
import useVacancy from "../addVacancyModals/useVacancy";
import useEditVacancy from "../editVacancy/useEditVacancy";
import { TypesModal } from "../../ModalMain.types";

const InfoModalMap = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [logOut] = useLogOutUserMutation();
  const dataAddEditVacancy = useAppSelector(
    (state) => state.modal.dataConfirmation
  );
  const { onSubmit: addVacanciesSubmit, isLoading: addVacanciesLoading } =
    useVacancy();
  const {
    onSubmit: editVacanciesSubmit,
    isLoading: editVacanciesLoading,
    deleteVacancy,
  } = useEditVacancy();

  const handleCancel = useCallback((): void => {
    dispatch(closeModal());
  }, [dispatch]);

  const handleForgotPassword = useCallback((): void => {
    dispatch(openModal({ typeModal: "forgotPassword" }));
  }, [dispatch]);

  const handleLogIn = useCallback((): void => {
    navigate("/log-in");
    dispatch(closeModal());
  }, [navigate, dispatch]);

  const handleLogOut = useCallback((): void => {
    dispatch(setSearchQuery(""));
    dispatch(setSortType(""));

    logOut();
  }, [dispatch, logOut]);

  // Збереження вакансії
  const handleAddVacancy = useCallback((): void => {
    console.log("handleAddVacancy", dataAddEditVacancy);
    addVacanciesSubmit(dataAddEditVacancy);
  }, [addVacanciesSubmit, dataAddEditVacancy]);

  const handleCloseConfirmation = useCallback((): void => {
    notifyInfo("Інформацію не збережно"); // test
    dispatch(closeConfirmation());
  }, [dispatch]);

  // Видалити вакансію
  const handleDeleteVacancy = useCallback((): void => {
    console.log("handleDeleteVacancy");
    deleteVacancy();
  }, [deleteVacancy]);

  // Збереження редагованої вакансії
  const handleEditVacancy = useCallback((): void => {
    editVacanciesSubmit(dataAddEditVacancy);
  }, [editVacanciesSubmit, dataAddEditVacancy]);

  // Архівувати вакансію
  const handleArhiveVacancy = useCallback((): void => {
    dispatch(
      openConfirmation({
        typeConfirmation: "arhiveVacancy",
        dataConfirmation: dataAddEditVacancy,
      })
    );
  }, [dispatch, dataAddEditVacancy]);

  const handleButonArhiveVacancy = useCallback((): void => {
    editVacanciesSubmit({
      ...dataAddEditVacancy,
      isArchived: !dataAddEditVacancy.isArchived,
    });
  }, [dataAddEditVacancy, editVacanciesSubmit]);

  // Функція створення кнопок
  const createButton = (
    label: string,
    funcButton: () => void,
    className = "sm:text-[14px] md:text-[16px] xl:text-[20px]",
    size = "small",
    variant = "ghost",
    disabled = false
  ) => ({
    label,
    type: "button",
    className,
    variant,
    size,
    funcButton,
    disabled,
  });

  const map: Partial<
    Record<
      TypesModal,
      {
        title: string;
        titleSize?: "small";
        text: string[];
        button: {
          label: string;
          type: string;
          className?: string;
          variant: string;
          size: string;
          funcButton: () => void;
          disabled: boolean;
        }[];
      }
    >
  > = {
    logInSuccess: {
      title: t("infoModal.success"),
      text: [t("infoModal.logInSuccess.text_1")],
      button: [
        createButton(
          t("infoModal.button.continue"),
          handleCancel,
          "",
          "big",
          "accent"
        ),
      ],
    },
    logInError: {
      title: t("infoModal.oops"),
      text: [t("infoModal.logInError.text_1")],
      button: [
        createButton(
          t("infoModal.button.continue"),
          handleCancel,
          "",
          "big",
          "accent"
        ),
      ],
    },
    signUpSuccess: {
      title: t("infoModal.success"),
      text: [
        t("infoModal.signUpSuccess.text_1"),
        t("infoModal.signUpSuccess.text_2"),
      ],
      button: [
        createButton(
          t("infoModal.button.continue"),
          handleCancel,
          "",
          "big",
          "accent"
        ),
      ],
    },
    signUpError: {
      title: t("infoModal.oops"),
      text: [
        t("infoModal.signUpError.text_1"),
        t("infoModal.signUpError.text_2"),
      ],
      button: [
        createButton(
          t("infoModal.button.login"),
          handleLogIn,
          "",
          "small",
          "accent"
        ),
        createButton(t("infoModal.button.restore"), handleForgotPassword),
      ],
    },
    forgotPasswordSuccess: {
      title: t("forgotPassword.header"),
      text: [t("infoModal.forgotPasswordSuccess.text_1")],
      button: [
        createButton(
          t("infoModal.button.continue"),
          handleCancel,
          "",
          "big",
          "accent"
        ),
      ],
    },
    resetPasswordSuccess: {
      title: "",
      text: [
        t("infoModal.resetPasswordSuccess.text_1"),
        t("infoModal.resetPasswordSuccess.text_2"),
      ],
      button: [
        createButton(
          t("infoModal.button.continue"),
          handleLogIn,
          "",
          "big",
          "accent"
        ),
      ],
    },
    resetPasswordErrorLink: {
      title: "",
      text: [
        t("infoModal.resetPasswordErrorLink.text_1"),
        t("infoModal.resetPasswordErrorLink.text_2"),
      ],
      button: [
        createButton(t("infoModal.button.cancel"), handleCancel),
        createButton(t("infoModal.button.try"), handleForgotPassword),
      ],
    },
    logOut: {
      title: t("infoModal.logOut.title"),
      titleSize: "small",
      text: [t("infoModal.logOut.text_1")],
      button: [
        createButton(t("infoModal.button.cancel"), handleCancel, "text-[20px]"),
        createButton(t("infoModal.button.logOut"), handleLogOut, "text-[20px]"),
      ],
    },
    saveAddVacancies: {
      title: t("infoModal.saveAddVacancies.title"),
      titleSize: "small",
      text: [t("infoModal.saveAddVacancies.text_1")],
      button: [
        createButton(
          t("infoModal.button.logOut"),
          handleCloseConfirmation,
          "",
          "small",
          "ghost",
          addVacanciesLoading
        ),
        createButton(
          t("infoModal.button.save"),
          handleAddVacancy,
          "",
          "big",
          "accent",
          addVacanciesLoading
        ),
      ],
    },
    deleteVacancy: {
      title: t("infoModal.deleteVacancy.title"),
      titleSize: "small",
      text: dataAddEditVacancy?.isArchived
        ? [t("")]
        : [t("infoModal.deleteVacancy.text_1")],
      button: [
        createButton(
          dataAddEditVacancy?.isArchived
            ? t("infoModal.button.cancel")
            : t("infoModal.button.archive"),
          dataAddEditVacancy?.isArchived
            ? handleCloseConfirmation
            : handleArhiveVacancy,
          "",
          "small",
          "ghost",
          addVacanciesLoading
        ),
        createButton(
          t("infoModal.button.delete"),
          handleDeleteVacancy,
          "",
          "big",
          "ghost",
          addVacanciesLoading
        ),
      ],
    },
    arhiveVacancy: {
      title: "Перенести вакансію в архів?",
      titleSize: "small",
      text: [
        "Ви завжди зможете знайти його за допомогою кнопки в верхньому правому куті",
      ],
      button: [
        createButton(
          t("infoModal.button.undo"),
          handleCloseConfirmation,
          "text-[20px]",
          "small",
          "ghost",
          editVacanciesLoading
        ),
        createButton(
          t("infoModal.button.toArchive"),
          handleButonArhiveVacancy,
          "text-[20px]",
          "big",
          "ghost",
          editVacanciesLoading
        ),
      ],
    },
    restoreVacancy: {
      title: "Відновити вакансію з архіву?",
      titleSize: "small",
      text: ["Вакансію буде перенесено до основного списку"],
      button: [
        createButton(
          t("infoModal.button.undo"),
          handleCloseConfirmation,
          "text-[20px]",
          "small",
          "ghost",
          editVacanciesLoading
        ),
        createButton(
          t("addVacancy.form.restore"),
          handleButonArhiveVacancy,
          "text-[20px]",
          "big",
          "ghost",
          editVacanciesLoading
        ),
      ],
    },
    saveEditVacancies: {
      title: t("infoModal.saveAddVacancies.title"),
      titleSize: "small",
      text: [t("infoModal.saveAddVacancies.text_1")],
      button: [
        createButton(
          t("infoModal.button.logOut"),
          handleCloseConfirmation,
          "",
          "small",
          "ghost",
          editVacanciesLoading
        ),
        createButton(
          t("infoModal.button.save"),
          handleEditVacancy,
          "",
          "big",
          "accent",
          editVacanciesLoading
        ),
      ],
    },
  };
  return map;
};

export default InfoModalMap;
