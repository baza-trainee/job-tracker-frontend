// router
import { Link } from "react-router-dom";

// hooks
import { useAuthForm } from "./useAuth";
import classNames from "clsx";

//components
import Logo from "../../components/Logo/JobTrackerLogo";
import LoginCardImages from "./LoginImages/LoginCardImages";
import { Input } from "../../components/inputs/Input/Input";
import { InputPassword } from "../../components/inputs/InputPassword/InputPassword";
import Checkbox from "../../components/checkbox/Checkbox";
import Separator from "../../components/separator/Separator";
import { Button } from "../../components/buttons/Button/Button";
import Footer from "../../components/layout/Footer";
//redax
import { useAppSelector } from "../../store/hook";
import { GoogleLogin } from "../../store/slices/authSlice/authOperation";
import { GithubLogin } from "../../store/slices/authSlice/authOperation";
//image
import GoogleLogo from "../../assets/img/Google.svg";
import GitHubLogo from "../../assets/img/GitHub.svg";

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
    <section>
      {/* TODO: left side of the page - images */}
      <Logo />

      <div
        className={classNames(
          "mx-auto flex items-center justify-center gap-[49px] px-3",
          type === "signUp" && "mb-[59px] mt-[4px]",
          type === "logIn" && "mb-[107px] mt-[54px]"
        )}
      >
        <LoginCardImages />

        <div className="w-full max-w-[477px] font-nunito">
          
          <div className="mb-[48px]">
            <h2 className="mb-3 font-nunito text-[32px] font-bold leading-[135%] text-text-primary">
              {isSignUpPage ? "Вітаємо!" : "Раді вас знову бачити! "}
            </h2>
            <p className="font-nunito text-[16px] font-medium leading-[135%] text-text-gray">
              {isSignUpPage
                ? "Зареєструйтесь для того, щоб оптимізувати свій пошук роботи"
                : "Увійдіть, щоб продовжити відслідковувати ваші відгуки"}
            </p>
          </div>

          {/* TODO: Right side of the page  */}

          <div className="rounded-[20px] bg-background-form px-12 py-6 shadow-form_shadow">
            <div>
              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[30px]">
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
                    resetField={resetField}
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
                        className="font-nunito text-[16px] font-medium leading-[135%] text-text-gray"
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
                            <span className="text-text-link">
                              {" політикой конфіденційності "}
                            </span>
                            та
                            <span className="text-text-link">
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
                  className="mx-auto mt-[50px]"
                  disabled={isCleanInputsForm() || error || loading}
                  variant="ghost"
                  size="big"
                >
                  {isSignUpPage ? `Зареєструватись` : `Увійти`}
                </Button>
              </form>
            </div>

            <Separator />

            <div className="flex justify-between gap-[20px]">
              <Button
                type="button"
                className="gap-[12px]"
                variant="ghost"
                size="small"
                onClick={GoogleLogin}
              >
                <span className="font-nunito text-[20px] font-medium leading-[135%] text-text-primary">
                  Google
                </span>
                <img
                  src={GoogleLogo}
                  className="h-[36px] w-[36px]"
                  alt="Google Logo"
                />
              </Button>

              <Button
                type="button"
                className="gap-[12px]"
                variant="ghost"
                size="small"
                onClick={GithubLogin}
              >
                <span className="font-nunito text-[20px] font-medium leading-[135%] text-text-primary">
                  GitHub
                </span>
                <img
                  src={GitHubLogo}
                  className="h-[36px] w-[36px]"
                  alt="Google Logo"
                />
              </Button>
            </div>

            <div className="mt-5 flex justify-center">
              <p className="font-nunito text-[16px] font-medium text-text-gray">
                {isSignUpPage
                  ? "Вже зареєстровані?"
                  : "Немає облікового запису?"}
                <Link
                  className="ml-[6px] font-nunito text-[16px] font-medium leading-[135%] text-text-link"
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
      <Footer />
    </section>
  );
};
export default AuthorizationLayout;
