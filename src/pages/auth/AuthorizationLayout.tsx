// router
import { Link } from "react-router-dom";

// hooks
// import { useAuthForm } from "./useAuth";
import { useAppDispatch } from "../../store/hook.ts";
import { openModal } from "../../store/slices/modalSlice/modalSlice.ts";

//components
// import LoginCardImages from "./LoginImages/LoginCardImages";
import { Input } from "../../components/inputs/Input/Input";
import { InputPassword } from "../../components/inputs/InputPassword/InputPassword";
import Checkbox from "../../components/checkbox/Checkbox";
import Separator from "../../components/separator/Separator";
import { Button } from "../../components/buttons/Button/Button";
import Footer from "../../components/layout/Footer";

//image
import GoogleLogo from "../../assets/img/Google.svg";
import GitHubLogo from "../../assets/img/GitHub.svg";
import { useAuthForm } from "../../components/AuthComponents/useAuth.ts";
import LoginCardImages from "../../components/LoginImages/LoginCardImages.tsx";

type AuthorizationLayoutProps = {
  type: "signUp" | "logIn" | "forgotPassword" | "resetPassword";
};

const AuthorizationLayout = ({ type }: AuthorizationLayoutProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    onSubmit,
    errors,
    // isSending,
    isCleanInputsForm,
  } = useAuthForm(type);

  const isSignUpPage = type === "signUp";
  const isLogInPage = type === "logIn";

  const error = !!Object.keys(errors).length;

  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    // console.log("Клік по кнопці спрацював!");
    dispatch(
      openModal({
        // typeModal: "success",
        // typeModal: "error",
        typeModal: "errorMailExist",
        // typeModal: "popup",
        // typeModal: "recoveryPassword",
      })
    );
  };

  return (
    <section>
      {/* TODO: left side of the page - images */}

      <div className="mx-auto flex h-screen w-screen items-center justify-center gap-[49px] px-3">
        <LoginCardImages />

        <div className="w-full max-w-[477px] font-nunito">
          <div className="mb-[48px]">
            <h2 className="mb-3 font-nunito text-[32px] font-bold leading-[135%] text-textBlack">
              {isSignUpPage ? "Вітаємо!" : "Раді вас знову бачити! "}
            </h2>
            <p className="font-nunito text-[16px] font-medium leading-[135%] text-textBlackLight">
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
                  className="mx-auto mt-[50px]"
                  disabled={
                    isCleanInputsForm() || error
                    // || isSending
                  }
                  variant="ghost"
                  size="big"
                  onClick={handleOpenModal}
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
              >
                <span className="font-nunito text-[20px] font-medium leading-[135%] text-textBlack">
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
                className="gap-[12px]"
                variant="ghost"
                size="small"
              >
                <span className="font-nunito text-[20px] font-medium leading-[135%] text-textBlack">
                  GitHub
                </span>
                <span className="">
                  <figure className="max-h-[36px] max-w-[36px]">
                    <img
                      src={GitHubLogo}
                      className="max-h-full max-w-full object-cover"
                      alt="Google Logo"
                    />
                  </figure>
                </span>
              </Button>
            </div>

            <div className="mt-5 flex justify-center">
              <p className="font-nunito text-[16px] font-medium text-textBlackLight">
                {isSignUpPage
                  ? "Вже зареєстровані?"
                  : "Немає облікового запису?"}
                <Link
                  className="ml-[6px] font-nunito text-[16px] font-medium leading-[135%] text-textOther"
                  to={isSignUpPage ? "/log-in" : "/sign-up"}
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
