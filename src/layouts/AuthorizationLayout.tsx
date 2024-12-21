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

import { useAppSelector, useAppDispatch } from "../store/hook";
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
    isCleanInputsForm,
  } = useAuthForm(type);

  const isSignUpPage = type === "signUp";
  const isLogInPage = type === "logIn";
  const isResetPasswordPage = type === "resetPassword";

  const { loading } = useAppSelector((state) => state.auth);
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
          <div className="container mb-4 flex justify-center gap-6">
            <LoginCardImages />
            <div
              className={classNames(
                "flex w-full max-w-[476px] flex-col font-nunito",
                type === "resetPassword" && "mt-20"
              )}
            >
              {!isResetPasswordPage ? <AuthHeader type={type} /> : null}

              <div className="relative rounded-[20px] bg-background-form px-12 py-10 shadow-form_shadow">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  {isResetPasswordPage ? <AuthHeader type={type} /> : null}

                  <div className="flex flex-col gap-6">
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
                      className={isResetPasswordPage ? "pt-[122px]" : ""}
                      errors={errors}
                    />

                    {isLogInPage ? (
                      <p
                        className="-mt-3 cursor-pointer text-right font-nunito text-[16px] font-medium leading-[135%] text-textBlackLight"
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
                    className="mx-auto mt-8"
                    disabled={isCleanInputsForm() || error || loading}
                    variant="ghost"
                    size="big"
                  >
                    {isSignUpPage ? t("registerButton") : t("loginButton")}
                  </Button>
                </form>

                {!isResetPasswordPage ? <Separator /> : null}

                {!isResetPasswordPage ? <AuthSocialButtons /> : null}

                {!isResetPasswordPage ? (
                  <div className="mt-5 flex justify-center">
                    <p className="font-nunito text-[16px] font-medium text-textBlackLight">
                      {isSignUpPage
                        ? t("register.alreadyRegistered")
                        : t("login.noAccount")}
                      <Link
                        className="ml-[6px] font-nunito text-[16px] font-medium leading-[135%] text-textOther"
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
