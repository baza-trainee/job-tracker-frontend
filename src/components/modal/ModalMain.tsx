import clsx from "clsx";
import Icon from "../Icon/Icon";
import { ReactNode } from "react";
import { useAppSelector } from "@/store/hook";

//alex
import { useTranslation } from "react-i18next";

type ModalDataProps = {
  content: ReactNode;
  nameModal?: string | undefined;
  bgColor: string;
  borderColor: string;
  paddingGeneral?: string;
  customClassIcon?: string;
};

type ModalMainProps = {
  className?: string;
  modalData: ModalDataProps;
  btnFunc: () => void;
};

const ModalMain = ({ className, modalData, btnFunc }: ModalMainProps) => {
  const { borderColorModal, backgroundColorModal } = useAppSelector(
    (state) => state.modal
  );
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div
        className={clsx(
          "relative top-1 z-30 flex min-h-[32px] w-fit px-6 py-3 min-w-[134px] max-w-[260px] items-center justify-center rounded-tl-xl rounded-tr-xl",
          backgroundColorModal || modalData.bgColor
        )}
      >
        {modalData?.nameModal && (
          <span className="text-xl">{t(modalData.nameModal)}</span>
        )}
      </div>
      <div
        className={clsx(
          "z-40 flex h-auto w-auto flex-row items-start justify-between rounded-lg rounded-tl-none border-4 bg-white shadow-form_shadow",
          borderColorModal || modalData.borderColor,
          modalData.paddingGeneral || "p-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-[289px] min-w-[550px] items-center justify-center">
          {modalData.content}
        </div>
        <button onClick={btnFunc} className="rounded-md hover:bg-color2 -ml-6">
          <Icon id="close-default" className={clsx("fill-textBlack", modalData.customClassIcon || "h-6 w-6")} />
        </button>
      </div>
    </div>
  );
};

export default ModalMain;
