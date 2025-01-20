import { useAuthForm } from "../components/AuthComponents/useAuth";
import classNames from "clsx";
import { Link } from "react-router-dom";

import Logo from "../components/Logo/JobTrackerLogo";
import LoginCardImages from "../components/LoginImages/LoginCardImages";
import { Input } from "../components/inputs/Input/Input";
import { InputPassword } from "../components/inputs/InputPassword/InputPassword";
import Checkbox from "../components/checkbox/Checkbox";
import { Button } from "../components/buttons/Button/Button";
import Separator from "../components/separator/Separator";

import { useAppDispatch } from "../store/hook";
import { useTranslation } from "react-i18next";

import { AuthHeader } from "../components/AuthComponents/AuthHeader/AuthHeader";
import { AuthSocialButtons } from "../components/AuthComponents/AuthSocialButtons/AuthSocialButtons";
import { openModal } from "../store/slices/modalSlice/modalSlice";
import Footer from "../components/commonComponents/Footer";

type AuthorizationLayoutProps = {
  type: "signUp" | "logIn" | "resetPassword";
};

const AuthorizationLayout = ({ type }: AuthorizationLayoutProps) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    onSubmit,
    errors,
    isLoading,
    isCleanInputsForm,
  } = useAuthForm(type);

  const isSignUpPage = type === "signUp";
  const isLogInPage = type === "logIn";
  const isResetPasswordPage = type === "resetPassword";

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const error = !!Object.keys(errors).length;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <header className="flex p-6 pb-[14px]">
        <Logo />
      </header>

      <main className="flex-grow">
        <section>
          <div
            className={classNames(
              "container mb-4 flex justify-center",
              "sm:mt-[18px]",
              "md:-mt-12",
              "xl:mt-0 xl:gap-10",
              "2xl:gap-6",
              "3xl:gap-[158px]"
            )}
          >
            <LoginCardImages />
            <div
              className={classNames(
                "flex w-full flex-col font-nunito",
                "md:max-w-[444px]",
                "2xl:max-w-[476px]",
                "3xl:max-w-[498px]",
                type === "resetPassword"
                  ? "mt-20 xl:max-w-[444px] 3xl:mt-[180px]"
                  : "xl:max-w-[499px]"
              )}
            >
              {!isResetPasswordPage ? <AuthHeader type={type} /> : null}

              <div
                className={classNames(
                  "relative rounded-[20px] bg-background-form shadow-form_shadow",
                  "sm:px-2 sm:py-4",
                  "md:p-8",
                  "xl:px-14 xl:py-14",
                  "2xl:px-12 2xl:py-10",
                  "3xl:px-8 3xl:py-[34px]"
                )}
              >
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  {isResetPasswordPage ? <AuthHeader type={type} /> : null}

                  <div
                    className={classNames(
                      "flex flex-col",
                      "sm:gap-2",
                      "md:gap-4",
                      "xl:gap-6",
                      "2xl:gap-6",
                      "3xl:"
                    )}
                  >
                    {!isResetPasswordPage ? (
                      <Input
                        register={register}
                        resetField={resetField}
                        key="email"
                        name="email"
                        placeholder={t("register.enterEmail")}
                        type="text"
                        className=""
                        label={t("register.email")}
                        errors={errors}
                      />
                    ) : null}

                    <InputPassword
                      register={register}
                      key="password"
                      name="password"
                      placeholder={t("register.enterPassword")}
                      type="text"
                      label={
                        isResetPasswordPage
                          ? t("resetPassword.label")
                          : t("register.password")
                      }
                      className={
                        isResetPasswordPage ? "pt-[122px] xl:pt-[164px]" : ""
                      }
                      errors={errors}
                    />

                    {isLogInPage ? (
                      <p
                        className={classNames(
                          "cursor-pointer text-right font-nunito text-[16px] font-medium leading-[135%] text-textBlackLight",
                          "sm:mt-0 sm:text-[12px]",
                          "md:text-[16px]",
                          "xl:-mt-3"
                        )}
                        onClick={() =>
                          dispatch(
                            openModal({
                              typeModal: "forgotPassword",
                            })
                          )
                        }
                      >
                        {t("login.forgotPassword")}
                      </p>
                    ) : null}

                    {!isLogInPage ? (
                      <>
                        <InputPassword
                          register={register}
                          resetField={resetField}
                          key="confirmPassword"
                          name="confirmPassword"
                          placeholder={t("register.confirmPassword")}
                          type="text"
                          label={t("register.confirmPassword")}
                          className=""
                          errors={errors}
                        />

                        {isSignUpPage ? (
                          <Checkbox
                            register={register}
                            type="signUp"
                            name="terms"
                            errors={errors}
                            label={
                              <p>
                                {t("register.agreeWith")}
                                <span className="cursor-pointer text-textOther">
                                  {t("register.privacyPolicy")}
                                </span>
                                {t("register.and")}
                                <span className="cursor-pointer text-textOther">
                                  {t("register.userTerms")}
                                </span>
                              </p>
                            }
                          />
                        ) : null}
                      </>
                    ) : null}
                  </div>

                  <Button
                    type="submit"
                    className="mx-auto mt-4 text-[14px] md:text-[16px] xl:mt-4 2xl:mt-8 2xl:text-[20px]"
                    disabled={isCleanInputsForm() || error || isLoading}
                    variant="ghost"
                    size="big"
                  >
                    {isSignUpPage ? t("registerButton") : t("loginButton")}
                  </Button>
                </form>

                {!isResetPasswordPage ? <Separator /> : null}

                {!isResetPasswordPage ? <AuthSocialButtons /> : null}

                {!isResetPasswordPage ? (
                  <div
                    className={classNames(
                      "flex justify-center",
                      "sm:mt-2",
                      "md:mt-4",
                      "xl:mt-6",
                      "2xl:mt-5"
                    )}
                  >
                    <p
                      className={classNames(
                        "font-nunito text-[12px] font-medium text-textBlackLight md:text-[16px]",
                        "md:text-[14px]",
                        "xl:text-4",
                        "2xl:",
                        "3xl:"
                      )}
                    >
                      {isSignUpPage
                        ? t("register.alreadyRegistered")
                        : t("login.noAccount")}
                      <Link
                        className={classNames(
                          "ml-[6px] font-nunito text-[12px] font-medium leading-[135%] text-textOther",
                          "md:text-[14px]",
                          "xl:text-4",
                          "2xl:ml-[6px]",
                          "3xl:"
                        )}
                        to={isSignUpPage ? "/log-in" : "/sign-up"}
                        onClick={() => reset()}
                      >
                        {isSignUpPage ? t("loginButton") : t("registerButton")}
                      </Link>
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default AuthorizationLayout;
