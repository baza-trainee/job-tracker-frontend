import { useAppDispatch } from "@/store/hook";
import { Button } from "../../buttons/Button/Button";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";
import { useTranslation } from "react-i18next";
import { Input } from "../../inputs/Input/Input";
import { useForm } from "react-hook-form";
import { useRemoveUserMutation } from "@/store/querySlices/authQuerySlice";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";
import {
  notifyError,
  notifySuccess,
} from "../../Notifications/NotificationService";

function ModalConfirmRemoveAccount() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ passwordRemove: string }>({
    mode: "all",
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [removeUser] = useRemoveUserMutation();
  const { data: userData } = useGetAllUserDataQuery();
  const onSubmit = async (data: { passwordRemove: string }) => {
    console.log(data.passwordRemove);
    await removeUser({ id: "userData?.id" as string })
      .unwrap()
      .then(() => {
        notifySuccess("Account removed successfully");
        dispatch(closeModal());
      })
      .catch((er) => {
        notifyError("Error removing account");
        console.log(er);
      })
      .finally(() => {
        console.log("finally id>>>", userData?.id);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2">
        {t("modalAddProperties.removeConfirmAccountModalText")}
      </h2>
      <Input
        className="col-span-2"
        id="passwordRemove"
        type="password"
        name="passwordRemove"
        placeholder={"Type your password"}
        register={register}
        errors={errors}
        resetField={resetField}
        isCheckButtons={false}
      />
      <Button
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        {t("infoModal.button.cancel")}
      </Button>
      <Button type="submit">{t("infoModal.button.confirm")}</Button>
    </form>
  );
}

export default ModalConfirmRemoveAccount;
