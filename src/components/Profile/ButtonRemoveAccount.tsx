import { useAppDispatch } from "@/store/hook";
import { openModal } from "@/store/slices/modalSlice/modalSlice";

import { useTranslation } from "react-i18next";

function ButtonRemoveAccount() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <button
      className="hover:text-redColor before:bg-redColor relative font-nunito text-[20px] font-medium leading-[1.35] text-textBlack before:absolute before:-bottom-2 before:h-px before:w-full before:transition-all hover:transition-all"
      type="button"
      onClick={() => {
        dispatch(openModal({ typeModal: "removeAccount" }));
      }}
    >
      {t("buttonRemoveAccount")}
    </button>
  );
}

export default ButtonRemoveAccount;
