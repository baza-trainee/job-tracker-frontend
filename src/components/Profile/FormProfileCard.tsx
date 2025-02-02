import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hook";
import { useGetAllUserDataQuery } from "../../store/querySlices/profileQuerySlice";
import { copyInputValue } from "../../utils/copyInputValue";

import { PropsProfileCard } from "./profileCardProps.props";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";
import { openModal } from "@/store/slices/modalSlice/modalSlice";
import useProfileTexts from "./textProfile/useProfileText";
import { Profile, ProfileKeys } from "@/types/profile.types";
import { useEffect } from "react";

const userData: ProfileKeys[] = ["username", "email", "phone"];

const userLinks = ["telegram", "linkedin", "github", "behance"];

function FormProfileCard({ cardsType }: PropsProfileCard) {
  const { data: profile } = useGetAllUserDataQuery();
  const text = useProfileTexts({ cardsType });
  const {
    register,
    resetField,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Partial<Profile>>();
  // console.log(profile);

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (!profile) return;
    userData.forEach((item) => setValue(item, profile[item] ?? ""));
    userLinks.forEach((item) =>
      setValue(item, (profile.socials?.[0]?.[item] as string) ?? "")
    );
  }, [profile, setValue]);

  const handleClickButtonRemoveInput = (id: string) => {
    dispatch(
      openModal({
        dataConfirmation: id,
        typeModal: typeRemoveConfirmation(),
      })
    );
  };

  return (
    <form className="flex flex-col gap-2 rounded-[0_12px_12px_12px] border-[4px] border-solid border-backgroundSecondary bg-slate-50 p-6">
      {cardsType === "addPersonalProperties" && (
        <>
          <ul className="flex flex-col gap-4">
            {userData.map((item, index, array) => {
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
                    handleClickButtonCopyInput={() =>
                      copyInputValue(watch(item) as string)
                    }
                  />
                  {index === array.length - 1 && (
                    <div className="mt-4 h-px w-full bg-backgroundSecondary" />
                  )}
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col gap-4">
            {userLinks.map((item, index) => {
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
                    handleClickButtonCopyInput={() =>
                      copyInputValue((watch(item) as string) || "")
                    }
                  />
                </li>
              );
            })}
            {profile?.socials.map((item) => {
              return (
                <li key={item.id}>
                  <Input
                    label={item.name}
                    name={item.name}
                    placeholder={item.name}
                    value={item.link}
                    register={register}
                    errors={errors}
                    resetField={resetField}
                    isCheckButtons={false}
                    isButtonCopy={true}
                    isButtonRemoveInput={true}
                    handleClickButtonRemoveInput={() =>
                      handleClickButtonRemoveInput(item.id)
                    }
                    handleClickButtonCopyInput={() => copyInputValue(item.link)}
                  />
                </li>
              );
            })}
          </ul>
        </>
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
        className="mx-auto h-[48px] w-[226px]"
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
