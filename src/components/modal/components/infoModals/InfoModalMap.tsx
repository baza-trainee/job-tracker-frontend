import { useCallback } from "react";
import {
  closeConfirmation,
  closeModal,
  openModal,
} from "../../../../store/slices/modalSlice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { useNavigate } from "react-router-dom";

import {
  notifyError,
  notifyInfo,
} from "../../../Notifications/NotificationService";

import {
  setSearchQuery,
  setSortType,
} from "../../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";

import { useLogOutUserMutation } from "../../../../store/querySlices/authQuerySlice";
import useVacancy from "../addVacancyModals/useVacancy";

const InfoModalMap = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logOut] = useLogOutUserMutation();
  const dataAddVacancy = useAppSelector(
    (state) => state.modal.dataConfirmation
  );
  const { onSubmit } = useVacancy();

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

  // відправка збереженої вакансії
  const handleAddVacancy = useCallback((): void => {
    console.log("handleAddVacancy", dataAddVacancy);
    onSubmit(dataAddVacancy);
  }, [onSubmit, dataAddVacancy]);

  const handleCloseConfirmation = useCallback((): void => {
    notifyError("Щось пішло не так, дані не збережено"); // test
    notifyInfo("Інформацію не збережно"); // test
    dispatch(closeConfirmation());
  }, [dispatch]);

  const map = {
    logInSuccess: {
      title: "Успіх!",
      text: ["Авторизація пройшла успішно."],
      button: [
        {
          label: "Продовжити",
          type: "button",
          className: "",
          variant: "ghost",
          size: "big",
          funcButton: handleButton,
        },
      ],
    },
    logInError: {
      title: "Упс",
      text: ["Перевірте введені дані та спробуйте ще раз."],
      button: [
        {
          label: "Продовжити",
          type: "button",
          className: "",
          variant: "ghost",
          size: "big",
          funcButton: handleButton,
        },
      ],
    },
    signUpSuccess: {
      title: "Успіх!",
      text: [
        "Реєстрація пройшла успішно.",
        "Зараз ви можете налаштувати свій профіль.",
      ],
      button: [
        {
          label: "Продовжити",
          type: "button",
          className: "",
          variant: "ghost",
          size: "big",
          funcButton: handleButton,
        },
      ],
    },
    signUpError: {
      title: "Упс",
      text: [
        "Обліковий запис з такою поштою вже існує.",
        "Спробуйте увійти або відновити пароль.",
      ],
      button: [
        {
          label: "Відновити",
          type: "button",
          className: "",
          variant: "ghost",
          size: "small",
          funcButton: handleForgotPassword,
        },
        {
          label: "Увійти",
          type: "button",
          className: "",
          variant: "ghost",
          size: "small",
          funcButton: handleLogIn,
        },
      ],
    },
    forgotPasswordSuccess: {
      title: "",
      text: ["Вам надіслано повідомлення на електронну пошту"],
      button: [
        {
          label: "Продовжити",
          type: "button",
          className: "",
          variant: "ghost",
          size: "big",
          funcButton: handleButton,
        },
      ],
    },
    resetPasswordSuccess: {
      title: "",
      text: ["Зміна пароля успішна.", "Авторизуйтесь з новим паролем"],
      button: [
        {
          label: "Продовжити",
          type: "button",
          className: "",
          variant: "ghost",
          size: "big",
          funcButton: handleLogIn,
        },
      ],
    },
    resetPasswordErrorLink: {
      title: "",
      text: ["Посилання на відновлення паролю не дійсне.", "Спробуйте ще раз"],
      button: [
        {
          label: "Скасувати",
          type: "button",
          className: "",
          variant: "ghost",
          size: "small",
          funcButton: handleButton,
        },
        {
          label: "Спробувати",
          type: "button",
          className: "",
          variant: "ghost",
          size: "small",
          funcButton: handleForgotPassword,
        },
      ],
    },
    logOut: {
      title: "Ви впевнені, що хочете вийти?",
      text: [
        "Вихід з акаунту призведе до завершення вашої сесії. Для повторного входу потрібно буде ввести ваші облікові дані.",
      ],
      button: [
        {
          label: "Скасувати",
          type: "button",
          className: "",
          variant: "ghost",
          size: "small",
          funcButton: handleButton,
        },
        {
          label: "Вийти",
          type: "button",
          className: "",
          variant: "ghost",
          size: "small",
          funcButton: handleLogOut,
        },
      ],
    },
    saveChangesVacancies: {
      title: "Зберегти зміни?",
      text: ["Якщо ви не збережете данні, вони будуть втрачені"],
      button: [
        {
          label: "Вийти",
          type: "button",
          className: "",
          variant: "ghost",
          size: "small",
          funcButton: handleCloseConfirmation,
        },
        {
          label: "Зберегти",
          type: "button",
          className: "",
          variant: "ghost",
          size: "big",
          funcButton: handleAddVacancy,
        },
      ],
    },
  };
  return map;
};

export default InfoModalMap;
