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
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinksSchema } from "@/schemas/socialLinksSchema";

const userData: ProfileKeys[] = ["username", "email", "phone"];

function FormProfileCard({ cardsType }: PropsProfileCard) {
  const { data: profile } = useGetAllUserDataQuery();
  const { t } = useTranslation();
  const text = useProfileTexts({ cardsType });
  const {
    register,
    resetField,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Partial<Profile>>({
    resolver: zodResolver(socialLinksSchema),
    mode: "all",
  });

  const [updateSocialLink] = useUpdateSocialLinkMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

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
  const modalTypeUpdate = () => {
    switch (cardsType) {
      case "addCoverLetters":
        return "editCoverLetters";
      case "addProjects":
        return "editProjects";
      case "addResumes":
        return "editResumes";
      case "addPersonalProperties":
        return "editPersonalProperties";

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
    if (!profile.socials) return;
    profile.socials.forEach((item) => {
      setValue(item.id as any, item.link);
      initialValues.current[item.id] = item.link;
    });
  }, [profile, setValue]);

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
        typeModal: modalTypeUpdate(),
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
        })
          .unwrap()
          .then(() => {
            if (name === "phone")
              notifySuccess(t("notification.updatedPhoneSuccess"));
            if (name === "username")
              notifySuccess(t("notification.updatedUserNameSuccess"));
          })
          .catch(() => {
            if (name === "phone") notifyError(t("notification.updatedPhone"));
            if (name === "username")
              notifyError(t("notification.updatedUserName"));
            setValue(name as any, initialValues.current[name]);
          });
      }

      if (type === "social") {
        await updateSocialLink({
          idSocialLink: id as string,
          link: event,
        })
          .unwrap()
          .then(() => notifySuccess(t("notification.updatedSuccess")))
          .catch(() => {
            notifyError(t("notification.updatedErrorLink"));
            setValue(name as any, initialValues.current[name]);
          });
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-2 rounded-[0_12px_12px_12px] border-[4px] border-solid border-backgroundSecondary bg-slate-50 px-2 py-4 md:px-6 md:py-6">
      {cardsType === "addPersonalProperties" && (
        <>
          <ul className="flex flex-col gap-4">
            {userData.map((item, index) => {
              const label =
                item === "email"
                  ? "Email"
                  : item === "phone"
                    ? t("phone")
                    : t("name");
              return (
                <li key={index}>
                  <Input
                    onBlur={(e) => {
                      if (item === "email") return;

                      handleUpdateUserData(
                        item,
                        e.currentTarget.value,
                        "profile"
                      );
                    }}
                    disabled={item === "email" ? true : false}
                    label={label}
                    name={item}
                    placeholder={
                      item === "username"
                        ? "User123"
                        : item === "phone"
                          ? "+380123456789"
                          : ""
                    }
                    register={register}
                    errors={errors}
                    resetField={resetField}
                    isCheckButtons={false}
                    isButtonCopy={true}
                    handleClickButtonCopyInput={() =>
                      copyInputValue({
                        valueToCopy: watch(item) as string,
                        text:
                          item === "username"
                            ? t("notification.userNameCopied")
                            : item === "email"
                              ? t("notification.emailCopied")
                              : t("notification.phoneCopied"),
                      })
                    }
                  />
                  {index === userData.length - 1 && (
                    <div className="mt-4 h-px w-full bg-backgroundSecondary" />
                  )}
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col gap-4">
            {profile?.socials
              ? profile?.socials.map((item) => {
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
                        id={item.id}
                        label={item.name}
                        name={item.id}
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
                        handleClickButtonCopyInput={() =>
                          copyInputValue({
                            valueToCopy: item.link,
                            text: t("notification.linkCopied"),
                          })
                        }
                      />
                    </li>
                  );
                })
              : null}
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
              id={item.id}
              key={item.id}
              value={`${item.name} | ${item.technologies}`}
              onChange={() => {}}
              name={item.id}
              placeholder={item.name}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              isButtonRemoveInput={true}
              handleClickButtonCopyInput={() =>
                copyInputValue({
                  valueToCopy: item.link,
                  text: t("notification.linkCopied"),
                })
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
              id={item.id}
              key={item.id}
              value={item.name}
              onChange={() => {}}
              name={item.id}
              placeholder={item.name}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              isButtonRemoveInput={true}
              handleClickButtonCopyInput={() =>
                copyInputValue({
                  valueToCopy: item.link,
                  text: t("notification.linkCopied"),
                })
              }
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
              id={item.id}
              key={item.id}
              value={item.name}
              onChange={() => {}}
              name={item.id}
              placeholder={item.name}
              register={register}
              errors={errors}
              resetField={resetField}
              isCheckButtons={false}
              isButtonCopy={true}
              isButtonRemoveInput={true}
              handleClickButtonCopyInput={() =>
                copyInputValue({
                  valueToCopy: item.text,
                  text: t("notification.textCopied"),
                })
              }
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
        variant="ghost"
        onClick={() => dispatch(openModal({ typeModal: cardsType }))}
      >
        {text.buttonAdd} +
      </Button>
    </div>
  );
}

export default FormProfileCard;
