import { AuthHeaderProps } from "./AuthHeader.type";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

export const AuthHeader = ({ type }: AuthHeaderProps) => {
  const { t } = useTranslation();

  const authTitle = () => {
    switch (type) {
      case "signUp":
        return t("authWelcome");
      case "logIn":
        return t("login.header");
      case "resetPassword":
        return t("resetPassword.header");
      default:
        return "";
    }
  };

  const authSubTitle = () => {
    switch (type) {
      case "signUp":
        return t("register.header");
      case "logIn":
        return t("login.subHeader");
      case "resetPassword":
        return t("resetPassword.subHeader");
      default:
        return "";
    }
  };
  return (
    <div
      className={classNames(
        "mb-10",
        type === "resetPassword" &&
          "absolute left-[50%] w-full translate-x-[-50%] mt-[10px]"
      )}
    >
      <h2 className="mb-3 text-center font-nunito text-[32px] font-bold leading-[135%] text-textBlack">
        {authTitle()}
      </h2>
      <p
        className={classNames(
          "text-center font-nunito font-medium leading-[135%] mx-auto",
          // вопрос как перекрыть стили
          type === "resetPassword"
            ? "text-[14px] text-textBlack"
            : "text-[16px] text-textBlackLight max-w-[380px]"
        )}
      >
        {authSubTitle()}
      </p>
    </div>
  );
};
