import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hook";
import { useGetAllUserDataQuery } from "../../store/querySlices/profileQuerySlice";
import { copyInputValue } from "../../utils/copyInputValue";

import { PropsProfileCard } from "./profileCardProps.props";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";
import { openModal } from "@/store/slices/modalSlice/modalSlice";
import useProfileTexts from "./textProfile/useProfileText";
import { Profile } from "@/types/profile.types";

import SocialLinksFields from "./fields/SocialLinksFields";
import { useTranslation } from "react-i18next";
import ProfileLinksField from "./fields/ProfileLinksField";

function FormProfileCard({ cardsType }: PropsProfileCard) {
  const { data: profile } = useGetAllUserDataQuery();
  const { t } = useTranslation();
  console.log("profile", profile);

  const text = useProfileTexts({ cardsType });
  const {
    register,
    resetField,
    formState: { errors },
  } = useForm<Partial<Profile>>({
    mode: "all",
  });

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

  return (
    <div className="flex flex-col gap-2 rounded-[0_12px_12px_12px] border-[4px] border-solid border-backgroundSecondary bg-slate-50 px-2 py-4 md:px-6 md:py-6">
      {cardsType === "addPersonalProperties" && (
        <>
          <ProfileLinksField />
          <SocialLinksFields />
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
              type="vacancy"
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
              type="vacancy"
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
              type="vacancy"
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
