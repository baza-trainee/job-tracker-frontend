import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hook";
import {
  useGetAllUserDataQuery,
  useUpdateSocialLinkMutation,
  useUpdateUserProfileMutation,
} from "../../store/querySlices/profileQuerySlice";
import { copyInputValue } from "../../utils/copyInputValue";

import { PropsProfileCard } from "./profileCardProps.props";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";
import { openModal } from "@/store/slices/modalSlice/modalSlice";
import useProfileTexts from "./textProfile/useProfileText";
import { Profile, ProfileKeys } from "@/types/profile.types";
import { useEffect, useRef } from "react";
import {
  notifyError,
  notifySuccess,
} from "../Notifications/NotificationService";

const userData: ProfileKeys[] = ["username", "email", "phone"];

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

  const [updateSocialLink, { isSuccess: isSuccessSocial }] =
    useUpdateSocialLinkMutation();

  const [updateUserProfile, { isSuccess: isSuccessProfile }] =
    useUpdateUserProfileMutation();

  const dispatch = useAppDispatch();
  const initialValues = useRef<Record<string, string>>({});

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
    userData.forEach((item) => {
      const value = profile[item] ?? "";
      setValue(item, value);
      initialValues.current[item] = value as string;
    });

    profile.socials.forEach((item) => {
      setValue(item.name as any, item.link);
      initialValues.current[item.name] = item.link;
    });
  }, [profile, setValue]);

  useEffect(() => {
    if (isSuccessProfile || isSuccessSocial) {
      notifySuccess("Дані успішно оновлено");
    }
  }, [isSuccessProfile, isSuccessSocial]);

  const handleClickButtonRemoveInput = (id: string) => {
    dispatch(
      openModal({
        dataConfirmation: id,
        typeModal: typeRemoveConfirmation(),
      })
    );
  };

  const handleUpdateInput = (data: any) => {
    dispatch(
      openModal({
        dataConfirmation: data,
        typeModal: cardsType,
      })
    );
  };

  const handleUpdateUserData = async (
    name: string,
    event: string,
    type: "profile" | "social",
    id?: string
  ) => {
    if (initialValues.current[name] === event) {
      return;
    }
    try {
      if (type === "profile") {
        await updateUserProfile({
          [name]: event,
        }).unwrap();
      }
      if (type === "social") {
        await updateSocialLink({
          idSocialLink: id as string,
          link: event,
        }).unwrap();
      }
    } catch (error) {
      notifyError(
        (error as { data: { message: string[] } }).data.message[0] ||
          "Помилка оновлення даних"
      );
      setValue(name as any, initialValues.current[name]);
    }
  };

  return (
    <form className="flex flex-col gap-2 rounded-[0_12px_12px_12px] border-[4px] border-solid border-backgroundSecondary bg-slate-50 p-6">
      {cardsType === "addPersonalProperties" && (
        <>
          <ul className="flex flex-col gap-4">
            {userData.map((item, index) => {
              return (
                <li key={index}>
                  <Input
                    onBlur={(e) =>
                      handleUpdateUserData(
                        item,
                        e.currentTarget.value,
                        "profile"
                      )
                    }
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
                  {index === 2 && (
                    <div className="mt-4 h-px w-full bg-backgroundSecondary" />
                  )}
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col gap-4">
            {profile?.socials.map((item) => {
              return (
                <li key={item.id}>
                  <Input
                    onBlur={(e) =>
                      handleUpdateUserData(
                        item.name,
                        e.currentTarget.value,
                        "social",
                        item.id
                      )
                    }
                    label={item.name}
                    name={item.name}
                    placeholder={item.name}
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
              onFocus={() =>
                handleUpdateInput({ ...item, typeModal: "update" })
              }
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
              onFocus={() =>
                handleUpdateInput({ ...item, typeModal: "update" })
              }
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
              onFocus={() =>
                handleUpdateInput({ ...item, typeModal: "update" })
              }
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
        className="mx-auto h-[48px] w-auto"
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
