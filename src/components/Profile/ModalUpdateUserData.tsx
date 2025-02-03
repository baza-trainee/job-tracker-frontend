import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../inputs/Input/Input";
import { Button } from "../buttons/Button/Button";
import {
  notifyError,
  notifySuccess,
} from "../Notifications/NotificationService";
import {
  useCreateSocialLinkMutation,
  useGetAllUserDataQuery,
  useUpdateSocialLinkMutation,
} from "@/store/querySlices/profileQuerySlice";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";

import { useAppDispatch, useAppSelector } from "@/store/hook";

export default function ModalUpdateUserData() {
  const updateItem = useAppSelector((state) => state.modal.dataConfirmation);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
  } = useForm<{ link: string }>({
    // resolver: zodResolver('kkk'),
    mode: "all",
  });
  const dispatch = useAppDispatch();
  const { refetch: refetchProfile } = useGetAllUserDataQuery();

  useEffect(() => {
    setValue("link", updateItem.link);
  }, [updateItem]);
  console.log(updateItem);

  const [
    updateSocialLink,
    {
      isLoading: isLodingUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
    },
  ] = useUpdateSocialLinkMutation();

  const [
    createSocialLink,
    {
      isLoading: isLoadingCreate,
      isSuccess: isSuccessCreate,
      isError: isErrorCreate,
    },
  ] = useCreateSocialLinkMutation();

  const onSubmit: SubmitHandler<{ link: string }> = async (data) => {
    if (updateItem.id) {
      await updateSocialLink({
        idSocialLink: updateItem.id,
        name: (updateItem.name as string).toLocaleLowerCase(),
        link: data.link,
      });
    } else {
      await createSocialLink({
        name: (updateItem.name as string).toLocaleLowerCase(),
        link: data.link,
      });
    }
  };

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) {
      notifySuccess("Дані оновлено успішно");
      refetchProfile();
      dispatch(closeModal());
    }
  }, [isSuccessCreate, isSuccessUpdate]);

  useEffect(() => {
    if (isErrorCreate || isErrorUpdate) {
      notifyError("Дані не вдалося оновити");
    }
  }, [isErrorCreate, isErrorUpdate]);

  return (
    <form
      className="flex h-full w-full flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label={updateItem.name}
        name="link"
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
        <Button
          type="submit"
          variant="accent"
          disabled={isLoadingCreate || isLodingUpdate}
        >
          Зберегти
        </Button>
      </div>
    </form>
  );
}
