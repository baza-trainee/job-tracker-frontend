// router
import { Link } from "react-router-dom";

// hooks
import { useAuthForm } from "./useAuth";

//components
import LoginCardImages from "./LoginImages/LoginCardImages";
import { Input } from "../../components/inputs/Input/Input";
import { InputPassword } from "../../components/inputs/InputPassword/InputPassword";
import Checkbox from "../../components/checkbox/Checkbox";
import Separator from "../../components/separator/Separator";
import { Button } from "../../components/buttons/Button/Button";

//image
import GoogleLogo from "../../assets/img/Google.svg";
import GitHubLogo from "../../assets/img/GitHub.svg";

type SignInCardProps = {
  type: "signUp" | "logIn";
};

const SignInCard = ({ type }: SignInCardProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    onSubmit,
    errors,
    isDirty,
    isSending,
  } = useAuthForm();

  const isSignUpPage = type === "signUp";

  return (
    <section>
      {/* left side of the page - images */}

      <div className="mx-auto flex h-screen w-screen items-center justify-center gap-[49px] px-3">
        <LoginCardImages />

        <div className="w-full max-w-[477px] font-nunito">
          <div className="mb-[48px]">
            <h2 className="mb-3 font-nunito text-[32px] font-bold leading-[135%] text-text-primary">
              {isSignUpPage ? "Вітаємо!" : "Увійти"}
            </h2>
            <p className="font-nunito text-[16px] font-medium leading-[135%] text-text-gray">
              {isSignUpPage
                ? "Зареєструйтесь для того, щоб оптимізувати свій пошук роботи"
                : "Увійдіть, щоб продовжити відслідковувати ваші відгуки"}
            </p>
          </div>

          {/* Right side of the page  */}

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
                    key="password"
                    name="password"
                    placeholder="Введіть пароль"
                    type="text"
                    label="Пароль"
                    className=""
                    errors={errors}
                  />
                  {isSignUpPage ? (
                    <>
                      <InputPassword
                        register={register}
                        key="confirm_password"
                        name="confirm_password"
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
                  disabled={!isDirty || isSending}
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
                className="flex gap-[12px]"
                disabled={!isDirty || isSending}
                variant="ghost"
                size="small"
              >
                <span className="font-nunito text-[20px] font-medium leading-[135%] text-text-primary">
                  Google
                </span>
                <span className="">
                  <figure className="max-h-[36px] max-w-[36px]">
                    <img
                      src={GoogleLogo}
                      className="max-h-full max-w-full object-cover"
                      alt="Google Logo"
                    />
                  </figure>
                </span>
              </Button>

              <Button
                type="button"
                className="flex gap-[12px]"
                disabled={!isDirty || isSending}
                variant="ghost"
                size="small"
              >
                <span className="font-nunito text-[20px] font-medium leading-[135%] text-text-primary">
                  GitHub
                </span>
                <span className="">
                  <figure className="max-h-[36px] max-w-[36px]">
                    <img
                      src={GitHubLogo}
                      className="max-h-full max-w-full object-cover"
                      alt="GitHub Logo"
                    />
                  </figure>
                </span>
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
                >
                  {isSignUpPage ? "Увійти" : "Зареєструватись"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignInCard;
