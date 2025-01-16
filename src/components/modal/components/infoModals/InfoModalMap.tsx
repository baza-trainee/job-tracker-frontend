import { useCallback } from "react";
import {
  closeConfirmation,
  closeModal,
  openModal,
  openConfirmation,
} from "../../../../store/slices/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { useNavigate } from "react-router-dom";

import { notifyInfo } from "../../../Notifications/NotificationService";

import {
  setSearchQuery,
  setSortType,
} from "../../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";

import { useLogOutUserMutation } from "../../../../store/querySlices/authQuerySlice";
import useVacancy from "../addVacancyModals/useVacancy";
import useEditVacancy from "../editVacancy/useEditVacancy";

const InfoModalMap = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const handleButton = useCallback((): void => {
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

  // Архівувати вакансію
  const handleArhiveVacancy = useCallback((): void => {
    console.log("handleArhiveVacancy - подумати ЩЕ ЩЕ ЩЕ ЩЕ");
    dispatch(
      openConfirmation({
        typeConfirmation: "arhiveVacancy",
      })
    );
  }, [dispatch]);

  // Збереження редагованої вакансії
  const handleEditVacancy = useCallback((): void => {
    editVacanciesSubmit(dataAddEditVacancy);
  }, [editVacanciesSubmit, dataAddEditVacancy]);

  // Функція створення кнопок
  const createButton = (
    label: string,
    funcButton: () => void,
    size = "small",
    variant = "ghost",
    disabled = false
  ) => ({
    label,
    type: "button",
    className: "",
    variant,
    size,
    funcButton,
    disabled,
  });

  const map = {
    logInSuccess: {
      title: "Успіх!",
      text: ["Авторизація пройшла успішно."],
      button: [createButton("Продовжити", handleButton, "big")],
    },
    logInError: {
      title: "Упс",
      text: ["Перевірте введені дані та спробуйте ще раз."],
      button: [createButton("Продовжити", handleButton, "big")],
    },
    signUpSuccess: {
      title: "Успіх!",
      text: [
        "Реєстрація пройшла успішно.",
        "Зараз ви можете налаштувати свій профіль.",
      ],
      button: [createButton("Продовжити", handleButton, "big")],
    },
    signUpError: {
      title: "Упс",
      text: [
        "Обліковий запис з такою поштою вже існує.",
        "Спробуйте увійти або відновити пароль.",
      ],
      button: [
        createButton("Відновити", handleForgotPassword),
        createButton("Увійти", handleLogIn),
      ],
    },
    forgotPasswordSuccess: {
      title: "",
      text: ["Вам надіслано повідомлення на електронну пошту"],
      button: [createButton("Продовжити", handleButton, "big")],
    },
    resetPasswordSuccess: {
      title: "",
      text: ["Зміна пароля успішна.", "Авторизуйтесь з новим паролем"],
      button: [createButton("Продовжити", handleLogIn, "big")],
    },
    resetPasswordErrorLink: {
      title: "",
      text: ["Посилання на відновлення паролю не дійсне.", "Спробуйте ще раз"],
      button: [
        createButton("Скасувати", handleButton),
        createButton("Спробувати", handleForgotPassword),
      ],
    },
    logOut: {
      title: "Ви впевнені, що хочете вийти?",
      text: [
        "Вихід з акаунту призведе до завершення вашої сесії. Для повторного входу потрібно буде ввести ваші облікові дані.",
      ],
      button: [
        createButton("Скасувати", handleButton),
        createButton("Вийти", handleLogOut),
      ],
    },
    saveAddVacancies: {
      title: "Зберегти зміни?",
      text: ["Якщо ви не збережете данні, вони будуть втрачені"],
      button: [
        createButton(
          "Вийти",
          handleCloseConfirmation,
          "small",
          "ghost",
          addVacanciesLoading
        ),
        createButton(
          "Зберегти",
          handleAddVacancy,
          "big",
          "ghost",
          addVacanciesLoading
        ),
      ],
    },
    deleteVacancy: {
      title: "Видалити вакансію?",
      text: [
        "Ця дія буде безповортньою. Натомість, ви можете перенести цю вакансію в архів",
      ],
      button: [
        createButton(
          "Архівувати",
          handleArhiveVacancy,
          "small",
          "ghost",
          addVacanciesLoading
        ),
        createButton(
          "Видалити",
          handleDeleteVacancy,
          "big",
          "ghost",
          addVacanciesLoading
        ),
      ],
    },
    arhiveVacancy: {
      // title: "Перенести вакансію в архів?",
      title: "Архів ЧЕРЕЗ САБМИТ",
      text: [
        // "Ви завжди зможете знайти його за допомогою кнопки в верхньому правому куті",
      ],
      button: [
        createButton(
          "Відмінити",
          handleCloseConfirmation,
          "small",
          "ghost",
          addVacanciesLoading
        ),
        createButton(
          "В архів",
          handleDeleteVacancy,
          "big",
          "ghost",
          addVacanciesLoading
        ),
      ],
    },
    saveEditVacancies: {
      title: "Зберегти зміни?",
      text: ["Якщо ви не збережете данні, вони будуть втрачені"],
      button: [
        createButton(
          "Вийти",
          handleCloseConfirmation,
          "small",
          "ghost",
          editVacanciesLoading
        ),
        createButton(
          "Зберегти",
          handleEditVacancy,
          "big",
          "ghost",
          editVacanciesLoading
        ),
      ],
    },
  };
  return map;
};

export default InfoModalMap;
