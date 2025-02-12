import { useTranslation } from "react-i18next";
import { Button } from "../buttons/Button/Button";
import { useAppDispatch } from "@/store/hook";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";

function ModalRemoveAccount() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2">
        {t("modalAddProperties.removeAccountModalText")}
      </h2>
      <Button
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        {t("infoModal.button.cancel")}
      </Button>
      <Button>{t("infoModal.button.confirm")}</Button>
    </div>
  );
}

export default ModalRemoveAccount;
