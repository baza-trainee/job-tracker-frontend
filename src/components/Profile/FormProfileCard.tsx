import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetAllUserDataQuery } from "../../store/querySlices/profileQuerySlice";
import { copyInputValue } from "../../utils/copyInputValue";

import { PropsProfileCard } from "./profileCardProps.props";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";

type Inputs = {
  UserName: string;
  Email: string;
  PhoneNumber: string;
};

function FormProfileCard({ cardsType }: PropsProfileCard) {
  const { data: profile } = useGetAllUserDataQuery();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  useEffect(() => {
    setValue("UserName", profile?.username as string);
    setValue("Email", profile?.email as string);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 rounded-[0_12px_12px_12px] border-[1px] border-solid border-color1 bg-backgroundSecondary p-6"
    >
      {cardsType === "personalInfo" &&
        ["UserName", "Email", "PhoneNumber"].map((item, index) => {
          const value = watch(item as keyof Inputs);
          return (
            <Input
              key={index}
              label={item}
              name={item}
              placeholder={item}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              handleClickButtonCopyInput={() => copyInputValue(value)}
            />
          );
        })}

      {/* {cardsType === "links" && (
        <>
          {profile?.links.map((item) => (
            <Input
              key={item.id}
              value={item.link}
              name={item.name}
              placeholder={item.name}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              isButtonRemoveInput={true}
            />
          ))}
        </>
      )} */}
      {/* {cardsType === "projects" && (
        <>
          {profile?.projects.map((item) => (
            <Input
              key={item.id}
              value={item.link}
              name={item.name}
              placeholder={item.name}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              isButtonRemoveInput={true}
            />
          ))}
        </>
      )} */}
      {cardsType === "resumes" && (
        <>
          {profile?.resumes.map((item) => (
            <Input
              key={item.id}
              value={item.link}
              name={item.name}
              label={item.name}
              placeholder={item.name}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              isButtonRemoveInput={true}
            />
          ))}
        </>
      )}
      {cardsType === "coverLetters" && (
        <>
          {profile?.coverLetters.map((item) => (
            <Input
              key={item.id}
              value={item.name}
              name={item.name}
              placeholder={item.name}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              isButtonRemoveInput={true}
            />
          ))}
        </>
      )}

      {cardsType !== "personalInfo" && (
        <Button type="submit" variant="accent">
          Add {cardsType}
        </Button>
      )}
    </form>
  );
}

export default FormProfileCard;
