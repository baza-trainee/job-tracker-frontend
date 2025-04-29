import { Input } from "@/components/inputs/Input/Input";
import { copyInputValue } from "@/utils/copyInputValue";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/hook";
import { openModal } from "@/store/slices/modalSlice/modalSlice";
import {
  useGetAllUserDataQuery,
  useUpdateSocialLinkMutation,
} from "@/store/querySlices/profileQuerySlice";
import {
  notifyError,
  notifySuccess,
} from "@/components/Notifications/NotificationService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinksSchema } from "@/schemas/profile/socialLinksSchema";

import { useEffect, useRef, useState } from "react";

export default function SocialLinksFields() {
  const [isInputLoading, setIsInputLoading] = useState<string>("");
  const { data: profile } = useGetAllUserDataQuery();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    resetField,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(socialLinksSchema),
    mode: "all",
  });

  const initialValues = useRef<Record<string, string>>({});

  const [updateSocialLink] = useUpdateSocialLinkMutation();

  useEffect(() => {
    if (!profile?.socials) return;
    profile.socials.forEach((item) => {
      setValue(item.id as any, item.link);
      initialValues.current[item.id] = item.link;
    });
  }, [profile?.socials, setValue]);

  const handleUpdateUserData = async (event: string, id?: string) => {
    if (initialValues.current[id as string] === event) {
      console.warn("Value did not change for", id);
      return;
    }
    const isValid = await trigger(id as any);
    if (!isValid) {
      console.warn("Validation failed for", id);
      setValue(id as any, initialValues.current[id as string]);
      return;
    }

    try {
      setIsInputLoading(id as string);
      await updateSocialLink({
        idSocialLink: id as string,
        link: event,
      }).unwrap();
      notifySuccess(t("notification.updatedSuccess"));
    } catch (error) {
      console.error("error", error);
      notifyError(t("notification.updatedErrorLink"));
      setValue(id as any, initialValues.current[id as string]);
    } finally {
      setIsInputLoading("");
    }
  };

  const handleClickButtonRemoveInput = (id: string) => {
    dispatch(
      openModal({
        dataConfirmation: id,
        typeModal: "removePersonalProperties",
      })
    );
  };
  if (!profile?.socials) return null;
  return (
    <ul className="flex flex-col gap-4">
      {profile?.socials
        ? profile?.socials.map((item) => {
            return (
              <li key={item.id}>
                <Input
                  onBlur={(e) => {
                    handleUpdateUserData(e.currentTarget.value, item.id);
                  }}
                  disabled={isInputLoading === item.id}
                  id={item.id}
                  label={item.name}
                  type="vacancy"
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
  );
}
