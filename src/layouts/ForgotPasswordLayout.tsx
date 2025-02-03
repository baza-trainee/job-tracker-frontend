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
    setValue,
  } = useAuthForm(type);

  const { t } = useTranslation();

  const error = !!Object.keys(errors).length;

  return (
    <section>
      <div className="text-left sm:max-w-[264px] sm:px-[5px] sm:py-[28px] md:max-w-full md:py-[62px]">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            promptMessage={t("register.promptMessageEmail")}
            setValue={setValue}
          />

          <Button
            type="submit"
            className="mx-auto mt-8 sm:mt-[24px] sm:text-[14px] md:text-[20px] xl:mt-4 2xl:mt-8 2xl:text-[20px]"
            disabled={isCleanInputsForm() || error || isLoading}
            variant="accent"
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
