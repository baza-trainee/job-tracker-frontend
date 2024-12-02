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
      case "forgotPassword":
        return t("forgotPassword.header");
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
      case "forgotPassword":
        return t("forgotPassword.subHeader");
      case "resetPassword":
        return t("resetPassword.subHeader");
      default:
        return "";
    }
  };
  return (
    <div
      className={classNames(
        type === "resetPassword" &&
          "absolute left-[50%] mt-[10px] w-full translate-x-[-50%]",
        type === "forgotPassword" ? "mb-[50px]" : "mb-10"
      )}
    >
      <h2 className="mb-3 text-center font-nunito text-[32px] font-bold leading-[135%] text-textBlack">
        {authTitle()}
      </h2>
      <p
        className={classNames(
          "mx-auto max-w-[380px] text-center font-nunito text-[16px] font-medium leading-[135%] text-textBlackLight",
          // вопрос как перекрыть стили
          (type === "forgotPassword" || type === "resetPassword") &&
            "!text-[14px] !text-textBlack",
          type === "forgotPassword" && "!text-left"
        )}
      >
        {authSubTitle()}
      </p>
    </div>
  );
};
