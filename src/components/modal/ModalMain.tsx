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
          "relative top-1 z-30 flex w-fit max-w-[260px] items-center justify-center rounded-tl-xl rounded-tr-xl px-6 py-3",
          "sm:top-[1px] sm:min-h-[20px] sm:min-w-[100px]",
          "md:min-h-[32px] md:min-w-[134px]",
          backgroundColorModal || modalData.bgColor
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {modalData?.nameModal && (
          <span className="text-xl">{t(modalData.nameModal)}</span>
        )}
      </div>
      <div
        className={clsx(
          "z-40 flex h-auto w-auto flex-row items-start justify-between rounded-lg rounded-tl-none border-4 bg-white p-4 shadow-form_shadow",
          // alex p-2 ---> md:p-5
          "sm:border-[2px] sm:p-2",
          "md:border-[4px]",
          borderColorModal || modalData.borderColor
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={clsx(
            "flex items-center justify-center",
            "sm:min-h-[217px] sm:min-w-[264px]",
            "md:min-h-[237px] md:min-w-[449px]",
            "xl:min-h-[292px] xl:min-w-[588px]",
            "3xl:min-h-[320px]"
          )}
        >
          {modalData.content}
        </div>
        <button
          onClick={btnFunc}
          className={"z-50 -ml-6 rounded-md hover:bg-color2"}
        >
          <Icon id="close-default" className="h-6 w-6 fill-textBlack" />
        </button>
      </div>
    </div>
  );
};

export default ModalMain;
