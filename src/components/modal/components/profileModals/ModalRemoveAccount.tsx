import { useTranslation } from "react-i18next";
import { Button } from "../../../buttons/Button/Button";
import { useAppDispatch } from "@/store/hook";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";
import { useRemoveUserMutation } from "@/store/querySlices/authQuerySlice";
import {
  notifyError,
  notifySuccess,
} from "@/components/Notifications/NotificationService";
import { clearTokens } from "@/store/slices/authSlice/authSlice";
import { useState } from "react";

function ModalRemoveAccount() {
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { data } = useGetAllUserDataQuery();
  const [removeUser, { isLoading }] = useRemoveUserMutation();
  const userId = data?.id as string;

  const removeUserById = async () => {
    if (!userId) {
      notifyError("Error removing account. Cannot find user id");
      return;
    }

    try {
      await removeUser({
        userId,
      }).unwrap();
      notifySuccess("Account removed successfully");
      dispatch(closeModal());
      dispatch(clearTokens());
    } catch (error) {
      notifyError("Error removing account");
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <h2 className="col-span-1 font-nunito text-[20px] font-bold leading-[135%] sm:text-[20px] md:col-span-2 md:text-[24px] xl:text-[32px]">
        {!isConfirmModal
          ? t("modalAddProperties.removeAccountModalText")
          : t("modalAddProperties.removeConfirmAccountModalText")}
      </h2>

      <Button
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        {t("infoModal.button.cancel")}
      </Button>
      <Button
        variant="accent"
        disabled={isLoading}
        onClick={() => {
          !isConfirmModal ? setIsConfirmModal(true) : removeUserById();
        }}
      >
        {!isConfirmModal
          ? t("infoModal.button.agree")
          : t("infoModal.button.delete")}
      </Button>
    </div>
  );
}

export default ModalRemoveAccount;
