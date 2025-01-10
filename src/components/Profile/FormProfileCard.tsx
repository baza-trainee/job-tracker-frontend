import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../inputs/Input/Input";
import { PropsProfileCard } from "./profileCardProps.props";

type Inputs = {
  example: string;
  exampleRequired: string;
};

function FormProfileCard({ cardsType }: PropsProfileCard) {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 rounded-[0_12px_12px_12px] border-[1px] border-solid border-color1 bg-amber-200 p-6"
    >
      <Input
        label="Name"
        name="UserName"
        placeholder="User Name"
        register={register}
        errors={errors}
        resetField={resetField}
      />
      <Input
        label="Email"
        name="Email"
        placeholder="Email"
        register={register}
        errors={errors}
        resetField={resetField}
      />
      <Input
        label="Phone number"
        name="Phone number"
        placeholder="Phone number"
        register={register}
        errors={errors}
        resetField={resetField}
      />
      {cardsType !== "personalInfo" && (
        <Input
          type="submit"
          name="submit"
          placeholder="Phon"
          register={register}
          errors={errors}
          resetField={resetField}
        />
      )}
    </form>
  );
}

export default FormProfileCard;
