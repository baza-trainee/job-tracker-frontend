import { useCallback } from "react";
import {
  closeConfirmation,
  closeModal,
  openModal,
  openConfirmation,
  closeButton,
} from "../../../../store/slices/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  notifyInfo,
  notifyError,
  notifySuccess,
} from "../../../Notifications/NotificationService";

import {
  setSearchQuery,
  setSortType,
} from "../../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";

import { useLogOutUserMutation } from "../../../../store/querySlices/authQuerySlice";
import useVacancy from "../addVacancyModals/useVacancy";
import useEditVacancy from "../editVacancy/useEditVacancy";
import useNotes from "../notesModals/useNotes";
import {
  useCreateEventMutation,
  useDeleteEventByIdMutation,
  useUpdateEventByIdMutation,
  useGetAllEventsQuery,
} from "../../../../store/querySlices/eventsQuerySlice";
import { TypesModal } from "../../ModalMain.types";

const InfoModalMap = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [logOut, { isLoading: isLoadinglogOut }] = useLogOutUserMutation();
  const dataModalForConfirm = useAppSelector(
    (state) => state.modal.dataConfirmation
  );
  // console.log("dataModalForConfirm -", dataModalForConfirm);

  const { onSubmit: addVacanciesSubmit, isLoading: addVacanciesLoading } =
    useVacancy();

  const {
    onSubmit: editVacanciesSubmit,
    isLoading: editVacanciesLoading,
    deleteVacancy,
  } = useEditVacancy();

  const {
    onSubmit: notesSubmit,
    isLoading: notesLoading,
    deleteNote,
  } = useNotes(dataModalForConfirm?.noteType);

  const [addCreateEvent] = useCreateEventMutation();
  const [deleteEventById] = useDeleteEventByIdMutation();
  const [updateEventById] = useUpdateEventByIdMutation();
  const { refetch } = useGetAllEventsQuery();

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
    console.log("handleAddVacancy", dataModalForConfirm);
    addVacanciesSubmit(dataModalForConfirm);
  }, [addVacanciesSubmit, dataModalForConfirm]);

  const handleCloseConfirmation = useCallback((): void => {
    notifyInfo(t("notification.notSaveInfo")); // test
    dispatch(closeConfirmation());
  }, [dispatch]);

  const handleCloseBtnModal = useCallback((): void => {
    notifyInfo(t("notification.notSaveInfo")); // test
    dispatch(closeConfirmation());
    dispatch(closeModal());
    dispatch(closeButton({ isButtonOpen: false, resetForm: undefined }));
  }, [dispatch]);

  // Видалити вакансію
  const handleDeleteVacancy = useCallback((): void => {
    console.log("handleDeleteVacancy");
    deleteVacancy();
  }, [deleteVacancy]);

  // Збереження редагованої вакансії
  const handleEditVacancy = useCallback((): void => {
    editVacanciesSubmit(dataModalForConfirm);
    dispatch(closeButton({ isButtonOpen: false, resetForm: undefined }));
  }, [editVacanciesSubmit, dataModalForConfirm]);

  // Архівувати вакансію
  const handleArhiveVacancy = useCallback((): void => {
    dispatch(
      openConfirmation({
        typeConfirmation: "arhiveVacancy",
        dataConfirmation: dataModalForConfirm,
      })
    );
  }, [dispatch, dataModalForConfirm]);

  const handleButonArhiveVacancy = useCallback((): void => {
    editVacanciesSubmit({
      ...dataModalForConfirm,
      isArchived: !dataModalForConfirm.isArchived,
    });
  }, [dataModalForConfirm, editVacanciesSubmit]);

  // Додавання (створення) події
  const handleAddEvent = useCallback(async () => {
    // console.log("InfoModalMap: handleAddEvent викликано з даними:", dataModalForConfirm);
    if (!dataModalForConfirm) return;
    try {
      await addCreateEvent({
        name: dataModalForConfirm.soonEventName,
        text: dataModalForConfirm.soonEventNotes || "",
        date:
          dataModalForConfirm.date || new Date().toISOString().split("T")[0],
        time: `${String(dataModalForConfirm.hours).padStart(2, "0")}:${String(dataModalForConfirm.minutes).padStart(2, "0")}`,
      }).unwrap();

      dispatch(closeConfirmation());
      dispatch(closeModal());
      refetch();
      notifySuccess(t("infoModal.saveAddEvent.notifyAddEventSuccess"));

      if (dataModalForConfirm.resetForm) {
        dataModalForConfirm.resetForm();
      }
    } catch (error) {
      notifyError(t("infoModal.saveAddEvent.notifyAddEventError"));
      console.error("handleAddEvent: помилка при збереженні -", error);
    }
  }, [dataModalForConfirm, addCreateEvent, dispatch, refetch]);

  // Видалення події
  const handleDeleteEvent = useCallback(async () => {
    if (!dataModalForConfirm) return;
    try {
      await deleteEventById(dataModalForConfirm.id).unwrap();
      dispatch(closeConfirmation());
      dispatch(closeModal());
      refetch();
      notifySuccess(t("infoModal.deleteEvent.notifyDeleteEventSuccess"));
    } catch (error) {
      notifyError(t("infoModal.deleteEvent.notifyDeleteEventError"));
    }
  }, [dataModalForConfirm, deleteEventById, dispatch, refetch]);

  // Збереження редагування події
  const handleEditEvent = useCallback(async () => {
    // console.log("handleEditEvent викликано!");
    if (!dataModalForConfirm) {
      // console.log("handleEditEvent: dataModalForConfirm is null");
      notifyError(t("infoModal.saveEditEvent.notifyEditEventError"));
      return;
    }
    // console.log("handleEditEvent: dataModalForConfirm перед відправкою -", dataModalForConfirm);
    try {
      // const response = await updateEventById({
      await updateEventById({
        id: dataModalForConfirm.id,
        name: dataModalForConfirm.soonEventName,
        text: dataModalForConfirm.soonEventNotes,
        time: `${dataModalForConfirm.hours}:${dataModalForConfirm.minutes}:00`,
        date: dataModalForConfirm.date,
      }).unwrap();
      // console.log("handleEditEvent: успішна відповідь -", response);
      dispatch(closeConfirmation());
      dispatch(closeModal());
      dispatch(closeButton({ isButtonOpen: false, resetForm: undefined }));
      refetch();
      notifySuccess(t("infoModal.saveEditEvent.notifyEditEventSuccess"));
    } catch (error) {
      console.error("handleEditEvent: помилка при збереженні -", error);
      notifyError(t("infoModal.saveEditEvent.notifyEditEventError"));
    }
  }, [dataModalForConfirm, updateEventById, dispatch, refetch]);

  // Збереження нотатки
  const handleAddNotes = useCallback((): void => {
    console.log("handleaddNotes", dataModalForConfirm);
    notesSubmit(dataModalForConfirm);
  }, [notesSubmit, dataModalForConfirm]);

  // Видалення нотатки
  const handleDeleteNotes = useCallback((): void => {
    console.log("handleDeleteNotes", dataModalForConfirm);
    deleteNote();
  }, [deleteNote, dataModalForConfirm]);

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

  // Закриваємо інфо-модалку і повертаємося до редагування основної модалки при закритті х
  const handleReturnToEdit = useCallback(() => {
    dispatch(closeConfirmation());
  }, [dispatch]);

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
    removeCoverLetters: { title: t("ll"), text: ["jhhvggcg"], button: [] },
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
        createButton(
          t("infoModal.button.cancel"),
          handleCancel,
          "text-[20px]",
          "small",
          "ghost",
          isLoadinglogOut
        ),
        createButton(
          t("infoModal.button.logOut"),
          handleLogOut,
          "text-[20px] w-full bg-button md:mx-auto xl:mx-0 xl:w-auto",
          "small",
          "ghost",
          isLoadinglogOut
        ),
      ],
    },
    saveAddVacancies: {
      title: t("infoModal.saveAddVacancies.title"),
      titleSize: "small",
      text: [t("infoModal.saveAddVacancies.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
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
      text: dataModalForConfirm?.isArchived
        ? [t("")]
        : [t("infoModal.deleteVacancy.text_1")],
      button: [
        createButton(
          dataModalForConfirm?.isArchived
            ? t("infoModal.button.cancel")
            : t("infoModal.button.archive"),
          dataModalForConfirm?.isArchived
            ? handleCloseConfirmation
            : handleArhiveVacancy,
          "",
          "small",
          "ghost",
          editVacanciesLoading
        ),
        createButton(
          t("infoModal.button.delete"),
          handleDeleteVacancy,
          "",
          "big",
          "accent",
          editVacanciesLoading
        ),
      ],
    },
    arhiveVacancy: {
      title: t("infoModal.arhiveVacancy.title"),
      titleSize: "small",
      text: [t("infoModal.arhiveVacancy.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
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
          "accent",
          editVacanciesLoading
        ),
      ],
    },
    restoreVacancy: {
      title: t("infoModal.restoreVacancy.title"),
      titleSize: "small",
      text: [t("infoModal.restoreVacancy.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
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
          "accent",
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
          t("infoModal.button.cancel"),
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
    saveAddEvent: {
      title: t("infoModal.saveAddEvent.title"),
      titleSize: "small",
      text: [t("infoModal.saveAddEvent.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
          handleCloseConfirmation,
          "",
          "small",
          "ghost"
        ),
        createButton(
          t("infoModal.button.save"),
          handleAddEvent,
          "",
          "big",
          "accent"
        ),
      ],
    },
    saveEditEvent: {
      title: t("infoModal.saveEditEvent.title"),
      titleSize: "small",
      text: [t("infoModal.saveEditEvent.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
          handleCloseConfirmation,
          "",
          "small",
          "ghost"
        ),
        createButton(
          t("infoModal.button.save"),
          handleEditEvent,
          "",
          "big",
          "accent"
        ),
      ],
    },
    deleteEvent: {
      title: t("infoModal.deleteEvent.title"),
      titleSize: "small",
      text: [t("infoModal.deleteEvent.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
          handleCloseConfirmation,
          "",
          "small",
          "ghost"
        ),
        createButton(
          t("infoModal.button.delete"),
          handleDeleteEvent,
          "",
          "big",
          "accent"
        ),
      ],
    },
    saveNote: {
      title: t("infoModal.saveAddVacancies.title"),
      titleSize: "small",
      text: [t("infoModal.saveAddVacancies.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
          handleCloseConfirmation,
          "",
          "small",
          "ghost",
          notesLoading
        ),
        createButton(
          t("infoModal.button.save"),
          handleAddNotes,
          "",
          "big",
          "accent",
          notesLoading
        ),
      ],
    },
    deleteNote: {
      title: t("notesHeader.deleteNote.title"),
      titleSize: "small",
      text: [t("notesHeader.deleteNote.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
          handleCancel,
          "",
          "small",
          "ghost",
          notesLoading
        ),
        createButton(
          t("notesHeader.deleteNote.button"),
          handleDeleteNotes,
          "",
          "big",
          "accent",
          notesLoading
        ),
      ],
    },
    closeModalsaveEditVacancies: {
      title: t("infoModal.saveAddVacancies.title"),
      titleSize: "small",
      text: [t("infoModal.saveAddVacancies.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
          handleCloseBtnModal,
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
    closeModalsaveEditEvent: {
      title: t("infoModal.saveEditEvent.title 999"),
      titleSize: "small",
      text: [t("infoModal.saveEditEvent.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
          handleCloseBtnModal,
          "",
          "small",
          "ghost"
        ),
        createButton(
          t("infoModal.button.save"),
          handleEditEvent,
          "",
          "big",
          "accent"
        ),
      ],
    },
    closeModalsaveAddEvent: {
      title: t("infoModal.saveAddEvent.title"),
      titleSize: "small",
      text: [t("infoModal.saveAddEvent.text_1")],
      button: [
        createButton(
          t("infoModal.button.cancel"),
          handleCloseBtnModal,
          "",
          "small",
          "ghost"
        ),
        createButton(
          t("infoModal.button.save"),
          handleAddEvent,
          "",
          "big",
          "accent"
        ),
      ],
    },
    closeDiscardModal: {
      title: t("infoModal.discardModal.title"),
      titleSize: "small",
      text: [t("infoModal.discardModal.text_1")],
      button: [
        createButton(
          t("infoModal.button.close"),
          handleCloseBtnModal,
          "",
          "small",
          "ghost"
        ),
        createButton(
          t("infoModal.button.edit"),
          handleReturnToEdit,
          "",
          "big",
          "accent"
        ),
      ],
    },
  };
  return map;
};

export default InfoModalMap;
