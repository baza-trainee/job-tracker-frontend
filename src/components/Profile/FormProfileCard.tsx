import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetAllUserDataQuery } from "../../store/querySlices/profileQuerySlice";
import { copyInputValue } from "../../utils/copyInputValue";

import { PropsProfileCard } from "./profileCardProps.props";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";
import { useAppDispatch } from "@/store/hook";
import { openModal } from "@/store/slices/modalSlice/modalSlice";
import useProfileTexts from "./textProfile/useProfileText";

type Inputs = {
  UserName: string;
  Email: string;
  PhoneNumber: string;
};

function FormProfileCard({ cardsType }: PropsProfileCard) {
  const { data: profile } = useGetAllUserDataQuery();
  const text = useProfileTexts({ cardsType });
  const {
    register,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue("UserName", profile?.username as string);
    setValue("Email", profile?.email as string);
  }, []);

  const typeRemoveConfirmation = () => {
    switch (cardsType) {
      case "addCoverLetters":
        return "removeCoverLetters";
      case "addProjects":
        return "removeProjects";
      case "addResumes":
        return "removeResumes";
      case "addPersonalProperties":
        return "removePersonalProperties";

      default:
        break;
    }
  };

  const handleClickButtonRemoveInput = (id: string) => {
    dispatch(
      openModal({
        dataConfirmation: id,
        typeModal: typeRemoveConfirmation(),
      })
    );
  };

  return (
    <form className="flex flex-col gap-3 rounded-[0_12px_12px_12px] border-[1px] border-solid border-backgroundSecondary bg-slate-50 p-6">
      {cardsType === "addPersonalProperties" && (
        <ul>
          {["UserName", "Email", "PhoneNumber"].map((item, index, array) => {
            const value = watch(item as keyof Inputs);
            return (
              <li key={index}>
                <Input
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
                {index === array.length - 1 && (
                  <div className="my-5 h-px w-full bg-slate-900"></div>
                )}
              </li>
            );
          })}
          {/* {profile} */}
        </ul>
      )}

      {cardsType === "addProjects" && (
        <>
          {profile?.projects.map((item) => (
            <Input
              key={item.id}
              value={item.liveProjectLink}
              name={item.name}
              placeholder={item.name}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              isButtonRemoveInput={true}
              handleClickButtonCopyInput={() =>
                copyInputValue(item.liveProjectLink)
              }
              handleClickButtonRemoveInput={() => {
                handleClickButtonRemoveInput(item.id);
              }}
            />
          ))}
        </>
      )}
      {cardsType === "addResumes" && (
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
              handleClickButtonCopyInput={() => copyInputValue(item.link)}
              handleClickButtonRemoveInput={() => {
                handleClickButtonRemoveInput(item.id);
              }}
            />
          ))}
        </>
      )}
      {cardsType === "addCoverLetters" && (
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
              handleClickButtonCopyInput={() => copyInputValue(item.name)}
              handleClickButtonRemoveInput={() => {
                handleClickButtonRemoveInput(item.id);
              }}
            />
          ))}
        </>
      )}
      <Button
        type="button"
        variant="accent"
        onClick={() => dispatch(openModal({ typeModal: cardsType }))}
      >
        {text.buttonAdd} +
      </Button>
    </form>
  );
}

export default FormProfileCard;
