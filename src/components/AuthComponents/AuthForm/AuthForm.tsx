import { Input } from "../../inputs/Input/Input";
import { InputPassword } from "../../inputs/InputPassword/InputPassword";
import { Checkbox } from "../../checkbox/Checkbox";
import { Button } from "../../buttons/Button/Button";

import { Link } from "react-router-dom";

import { AuthorizationLayoutProps } from "./AuthFormtype";

export const AuthForm = ({
  isSignUpPage,
  isLogInPage,
  register,
  handleSubmit,
  resetField,
  onSubmit,
  errors,
  isCleanInputsForm,
  loading,
  error,
}: AuthorizationLayoutProps) => {
  return (
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
  );
};
