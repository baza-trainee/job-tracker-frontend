import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";
import {
  notifyError,
  notifySuccess,
} from "../Notifications/NotificationService";
import {
  useGetAllUserDataQuery,
  useUpdateUserProfileMutation,
} from "@/store/querySlices/profileQuerySlice";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Profile } from "@/types/profile.types";

export default function ModalUpdateUserData() {
  const updateItem: { name: keyof Profile; value: string } = useAppSelector(
    (state) => state.modal.dataConfirmation
  );
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
  } = useForm<Profile>({
    // resolver: zodResolver('kkk'),
    mode: "all",
  });
  const dispatch = useAppDispatch();
  const { refetch: refetchProfile } = useGetAllUserDataQuery();

  useEffect(() => {
    setValue(updateItem.name, updateItem.value);
  }, [updateItem]);

  const [
    updateProfile,
    {
      isLoading: isLodingUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
    },
  ] = useUpdateUserProfileMutation();

  const onSubmit: SubmitHandler<Profile> = async (data) => {
    await updateProfile({ [updateItem.name]: data[updateItem.name] });
  };

  useEffect(() => {
    if (!isSuccessUpdate) return;

    notifySuccess("Дані оновлено успішно");
    refetchProfile();
    dispatch(closeModal());
  }, [isSuccessUpdate]);

  useEffect(() => {
    if (isErrorUpdate) {
      notifyError("Дані не вдалося оновити");
    }
  }, [isErrorUpdate]);

  return (
    <form
      className="flex h-full w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        autoFocus
        label={updateItem.name}
        name={updateItem.name}
        placeholder={updateItem.name}
        register={register}
        errors={errors}
        resetField={resetField}
        isCheckButtons={false}
      />

      <div className="flex justify-center gap-5">
        <Button type="reset" onClick={() => dispatch(closeModal())}>
          Скасувати
        </Button>
        <Button type="submit" variant="accent" disabled={isLodingUpdate}>
          Зберегти
        </Button>
      </div>
    </form>
  );
}
