import { useAppDispatch } from "@/store/hook";
import { openModal } from "@/store/slices/modalSlice/modalSlice";
import { useTranslation } from "react-i18next";

function ButtonRemoveAccount() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <button
      className="relative font-nunito text-[20px] font-medium leading-[1.35] text-textBlack before:absolute before:-bottom-2 before:h-px before:w-full before:bg-color2 before:transition-all hover:text-color2 hover:transition-all"
      type="button"
      onClick={() => {
        dispatch(openModal({ typeModal: "removeAccount" }));
        console.log("remove");
      }}
    >
      {t("buttonRemoveAccount")}
    </button>
  );
}

export default ButtonRemoveAccount;
