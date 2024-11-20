import { useAuthForm } from "../components/AuthComponents/useAuth";
import classNames from "clsx";

import Logo from "../components/Logo/JobTrackerLogo";
import LoginCardImages from "../components/LoginImages/LoginCardImages";
import Separator from "../components/separator/Separator";
import Footer from "../components/layout/Footer";

import { useAppSelector } from "../store/hook";

import { AuthHeader } from "../components/AuthComponents/AuthHeader/AuthHeader";
import { AuthForm } from "../components/AuthComponents/AuthForm/AuthForm";
import { AuthSocialButtons } from "../components/AuthComponents/AuthSocialButtons/AuthSocialButtons";
import { AuthFooter } from "../components/AuthComponents/AuthFooter/AuthFooter";

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
          <AuthHeader isSignUpPage={isSignUpPage} />
          <div className="rounded-[20px] bg-background-form px-12 py-6 shadow-form_shadow">
            <AuthForm
              isSignUpPage={isSignUpPage}
              isLogInPage={isLogInPage}
              register={register}
              handleSubmit={handleSubmit}
              resetField={resetField}
              onSubmit={onSubmit}
              errors={errors}
              isCleanInputsForm={isCleanInputsForm}
              loading={loading}
              error={error}
            />
            <Separator />

            <AuthSocialButtons />

            <AuthFooter isSignUpPage={isSignUpPage} reset={reset} />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default AuthorizationLayout;
