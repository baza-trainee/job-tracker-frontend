import { useAuthForm } from "../components/AuthComponents/useAuth";

import { Input } from "../components/inputs/Input/Input";
import { Button } from "../components/buttons/Button/Button";

import { useAppSelector } from "../store/hook";
import { useTranslation } from "react-i18next";

import { AuthHeader } from "../components/AuthComponents/AuthHeader/AuthHeader";

type AuthorizationLayoutProps = {
  type: "forgotPassword";
};

const ForgotPasswordLayout = ({ type }: AuthorizationLayoutProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    onSubmit,
    errors,
    isCleanInputsForm,
  } = useAuthForm(type);

  const { loading } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  const error = !!Object.keys(errors).length;

  return (
    <section>
      <div className="text-left px-12 py-[50px]">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <AuthHeader type={type} />

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

          <Button
            type="submit"
            className="mx-auto mt-8"
            disabled={isCleanInputsForm() || error || loading}
            variant="ghost"
            size="big"
          >
            {t("forgotPassword.button")}
          </Button>
        </form>
      </div>
    </section>
  );
};
export default ForgotPasswordLayout;
