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
import Footer from "../components/layout/Footer";

import { useAppSelector } from "../store/hook";

import { AuthHeader } from "../components/AuthComponents/AuthHeader/AuthHeader";
import { AuthSocialButtons } from "../components/AuthComponents/AuthSocialButtons/AuthSocialButtons";

type AuthorizationLayoutProps = {
  type: "signUp" | "logIn" | "forgotPassword" | "resetPassword";
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

  const { loading } = useAppSelector((state) => state.auth);

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
              "container flex justify-center gap-6",
              type === "signUp" && "mb-[81px]",
              type === "logIn" && "mb-[179px]"
            )}
          >
            <LoginCardImages />
            <div className="w-full max-w-[476px] font-nunito flex flex-col justify-center">
              <AuthHeader isSignUpPage={isSignUpPage} />
              <div className="rounded-[20px] bg-background-form px-12 py-10 shadow-form_shadow">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    <Input
                      register={register}
                      resetField={resetField}
                      key="email"
                      name="email"
                      placeholder="Введіть пошту"
                      type="text"
                      className=""
                      label="Електронна пошта"
                      errors={errors}
                    />

                    <InputPassword
                      register={register}
                      key="password"
                      name="password"
                      placeholder="Введіть пароль"
                      type="text"
                      label="Пароль"
                      className=""
                      errors={errors}
                    />
                    {isLogInPage ? (
                      <p className={"mt-[-18px] text-right"}>
                        <Link
                          className="font-nunito text-[16px] font-medium leading-[135%] text-textBlackLight"
                          // TODO: змінити посилання на /isforgotPassword
                          to="/sign-up"
                        >
                          Забули пароль?
                        </Link>
                      </p>
                    ) : null}
                    {isSignUpPage ? (
                      <>
                        <InputPassword
                          register={register}
                          resetField={resetField}
                          key="confirmPassword"
                          name="confirmPassword"
                          placeholder="Підтвердіть пароль"
                          type="text"
                          label="Підтвердіть пароль"
                          className=""
                          errors={errors}
                        />
                        <Checkbox
                          register={register}
                          type="signUp"
                          name="terms"
                          errors={errors}
                          label={
                            <p>
                              Погоджуюсь з
                              <span className="text-textOther">
                                {" політикой конфіденційності "}
                              </span>
                              та
                              <span className="text-textOther">
                                {" умовами користувача"}
                              </span>
                            </p>
                          }
                        />
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
                    {isSignUpPage ? `Зареєструватись` : `Увійти`}
                  </Button>
                </form>

                <Separator />

                <AuthSocialButtons />

                <div className="mt-5 flex justify-center">
                  <p className="font-nunito text-[16px] font-medium text-textBlackLight">
                    {isSignUpPage
                      ? "Вже зареєстровані?"
                      : "Немає облікового запису?"}
                    <Link
                      className="ml-[6px] font-nunito text-[16px] font-medium leading-[135%] text-textOther"
                      to={isSignUpPage ? "/log-in" : "/sign-up"}
                      onClick={() => reset()}
                    >
                      {isSignUpPage ? "Увійти" : "Зареєструватись"}
                    </Link>
                  </p>
                </div>
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
