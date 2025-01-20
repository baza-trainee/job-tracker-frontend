import { useAuthForm } from "../components/AuthComponents/useAuth";

import { Input } from "../components/inputs/Input/Input";
import { Button } from "../components/buttons/Button/Button";

import { useTranslation } from "react-i18next";

import { AuthHeader } from "../components/AuthComponents/AuthHeader/AuthHeader";

type ForgotPasswordLayoutProps = {
  type: "forgotPassword";
};

const ForgotPasswordLayout = ({ type }: ForgotPasswordLayoutProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    onSubmit,
    errors,
    isCleanInputsForm,
    isLoading,
  } = useAuthForm(type);

  const { t } = useTranslation();

  const error = !!Object.keys(errors).length;

  return (
    <section>
      <div className="px-12 py-[50px] text-left">
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
            disabled={isCleanInputsForm() || error || isLoading}
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
