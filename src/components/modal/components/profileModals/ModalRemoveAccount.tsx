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
    console.log(userId);
    try {
      const response = await removeUser({
        userId,
      }).unwrap();
      notifySuccess("Account removed successfully");
      dispatch(closeModal());
      dispatch(clearTokens());
      console.log(response);
    } catch (error) {
      notifyError("Error removing account");
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {!isConfirmModal ? (
        <h2 className="col-span-2">
          {t("modalAddProperties.removeAccountModalText")}
        </h2>
      ) : (
        <h2 className="col-span-2">
          {t("modalAddProperties.removeConfirmAccountModalText")}
        </h2>
      )}
      <Button
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        {t("infoModal.button.cancel")}
      </Button>
      <Button
        disabled={isLoading}
        onClick={() => {
          !isConfirmModal ? setIsConfirmModal(true) : removeUserById();
        }}
      >
        {!isConfirmModal ? t("infoModal.button.confirm") : "remove"}
      </Button>
    </div>
  );
}

export default ModalRemoveAccount;
