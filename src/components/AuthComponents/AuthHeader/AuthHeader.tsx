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
          "absolute left-[50%] mt-[10px] w-full translate-x-[-50%] sm:mt-0 xl:max-w-[400px]",
        type === "forgotPassword"
          ? "sm:mb-[24px] 2xl:mb-[40px]"
          : "mb-1 md:mb-2 xl:mb-4 2xl:mb-10"
      )}
    >
      <h2 className="mb-1 text-center font-nunito text-[20px] font-bold leading-[135%] text-textBlack md:mb-2 md:text-[24px] xl:text-[32px] 2xl:mb-3">
        {authTitle()}
      </h2>
      <p
        className={classNames(
          "mx-auto max-w-[380px] text-center font-nunito text-[14px] font-medium leading-[135%] text-textBlackLight 2xl:text-[16px]",
          // "xl:max-w-[424px]",
          // "2xl:max-w-[424px]",
          // "3xl:max-w-[434px]",
          type === "forgotPassword" || type === "resetPassword"
            ? "!text-textBlack sm:!text-[12px] md:!text-[14px]"
            : "md:max-w-[424px]",
          type === "forgotPassword" && "!text-left"
        )}
      >
        {authSubTitle()}
      </p>
    </div>
  );
};
