import { useAppDispatch } from "@/store/hook";
import { Button } from "../../buttons/Button/Button";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";
import { useTranslation } from "react-i18next";

import { useRemoveUserMutation } from "@/store/querySlices/authQuerySlice";

import {
  notifyError,
  notifySuccess,
} from "../../Notifications/NotificationService";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";
import { clearTokens } from "@/store/slices/authSlice/authSlice";

function ModalConfirmRemoveAccount() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const { data } = useGetAllUserDataQuery();
  const [removeUser] = useRemoveUserMutation();
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
      <h2 className="col-span-2">
        {t("modalAddProperties.removeConfirmAccountModalText")}
      </h2>

      <Button
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        {t("infoModal.button.cancel")}
      </Button>
      <Button type="button" onClick={removeUserById}>
        {t("infoModal.button.confirm")}
      </Button>
    </div>
  );
}

export default ModalConfirmRemoveAccount;
