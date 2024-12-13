import { useCallback } from "react";
import {
  closeModal,
  openModal,
} from "../../../../store/slices/modalSlice/modalSlice";
import { useAppDispatch } from "../../../../store/hook";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../../../../store/slices/authSlice/authSlice";

const InfoModalMap = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    dispatch(clearTokens());
    dispatch(closeModal());
  }, [dispatch]);

  return {
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
      text: ["Вихід з акаунту призведе до завершення вашої сесії. Для повторного входу потрібно буде ввести ваші облікові дані."],
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
  };
};

export default InfoModalMap;
