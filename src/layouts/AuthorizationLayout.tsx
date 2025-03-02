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
    watch,
    trigger,
    setValue,
  } = useAuthForm(type);

  const isSignUpPage = type === "signUp";
  const isLogInPage = type === "logIn";
  const isResetPasswordPage = type === "resetPassword";

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const error = !!Object.keys(errors).length;

  const checkPassword = () => {
    if (watch("password") && watch("confirmPassword")) {
      trigger("confirmPassword");
    }
  };

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-backgroundSecondary">
      <header
        className={classNames(
          "flex p-5 pb-0",
          "md:p-6 md:pb-0",
          "xl:pb-[10px]",
          "2lx:pb-[14px]",
          "3xl:p-10 3xl:pb-7"
        )}
      >
        <Logo className="h-[26px] w-[47px] md:h-[52px] md:w-[94px] xl:h-[42px] xl:w-[84px] 2xl:h-[52px] 2xl:w-[94px]" />
      </header>

      <main className="w-full flex-grow">
        <section>
          <div
            className={classNames(
              "container mb-[10px] flex justify-center gap-0",
              type === "signUp" && "md:-mt-[36px] xl:mt-0",
              "xl:mb-[42px] xl:gap-10",
              "2xl:mb-[80px] 2xl:gap-6",
              "3xl:mb-[96px] 3xl:gap-[158px]"
            )}
          >
            <LoginCardImages />
            <div
              className={classNames(
                "flex w-full flex-col font-nunito",
                // alex comment
                // "md:max-w-[444px]",
                // "xl:max-w-[444px]",
                // "2xl:max-w-[476px]",
                // "3xl:max-w-[498px]",
                type === "resetPassword" &&
                  "mt-[100px] md:mt-[100px] xl:mt-[106px] 2xl:mt-[96px] 3xl:mt-[184px]",
                type === "logIn" && "mt-8 xl:mt-[41px]"
              )}
            >
              {!isResetPasswordPage ? <AuthHeader type={type} /> : null}

              <div
                className={classNames(
                  "relative rounded-[20px] bg-backgroundMain px-2 py-4 shadow-form_shadow",
                  "md:p-8",
                  "xl:-mb-[42px] xl:px-8 xl:py-8",
                  "2xl:px-12 2xl:py-10",
                  "3xl:px-8 3xl:py-[34px]"
                )}
              >
                <form
                  className=""
                  onSubmit={handleSubmit(onSubmit)}
                  onBlur={checkPassword}
                >
                  {isResetPasswordPage ? <AuthHeader type={type} /> : null}

                  <div
                    className={classNames(
                      "flex flex-col gap-2",
                      "md:gap-4",
                      "xl:gap-4",
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
                        promptMessage={t(
                          `${!isLogInPage ? "register.promptMessageEmail" : ""}`
                        )}
                        setValue={setValue}
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
                        isResetPasswordPage
                          ? "pt-[75px] md:pt-[94px] xl:pt-[124px]"
                          : ""
                      }
                      errors={errors}
                      promptMessage={t(
                        `${!isLogInPage ? "register.promptMessagePassword" : ""}`
                      )}
                    />

                    {isLogInPage ? (
                      <p className="-mt-1 text-right text-[12px] md:-mt-3 md:text-[16px]">
                        <span
                          className={classNames(
                            "cursor-pointer font-nunito font-medium leading-[135%] text-textBlackLight hover:text-textOther hover:underline"
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
                        </span>
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
                                <span className="cursor-pointer text-textOther hover:underline">
                                  {t("register.privacyPolicy")}
                                </span>
                                {t("register.and")}
                                <span className="cursor-pointer text-textOther hover:underline">
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
                    className="mx-auto mt-4 text-[14px] md:text-[20px] xl:mt-4 2xl:mt-8 2xl:text-[20px]"
                    disabled={isCleanInputsForm() || error || isLoading}
                    variant="accent"
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
                      "mt-2 flex justify-center",
                      "md:mt-4",
                      "xl:mt-6",
                      "2xl:mt-5"
                    )}
                  >
                    <p
                      className={classNames(
                        "font-nunito text-[12px] font-medium text-textBlackLight",
                        "md:text-[16px]",
                        "xl:text-[16px]",
                        "2xl:",
                        "3xl:"
                      )}
                    >
                      {isSignUpPage
                        ? t("register.alreadyRegistered")
                        : t("login.noAccount")}
                      <Link
                        className={classNames(
                          "ml-[6px] font-nunito text-[12px] font-medium leading-[135%] text-textOther hover:underline",
                          "md:text-[16px]",
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
