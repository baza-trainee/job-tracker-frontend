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
  paddingAddEventModal?: string;
  iconCloseEventModal?: string;
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
          "relative z-0 flex w-fit max-w-[330px] items-center justify-center rounded-tl-xl rounded-tr-xl",
          "top-[1px] min-h-[20px] min-w-[100px] px-4 py-2",
          "md:min-h-[32px] md:min-w-[134px] md:px-6 md:py-3",
          backgroundColorModal || modalData?.bgColor || "bg-backgroundTertiary" // Тимчасово, пошукати далі
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {modalData?.nameModal && (
          <span className="text-[16px] font-bold text-blackColor md:text-[20px]">
            {t(modalData.nameModal)}
          </span>
        )}
      </div>
      <div
        className={clsx(
          //alex mb-11
          "z-0 mb-11 flex h-auto w-[280px] md:w-auto",
          "flex-row items-start justify-between rounded-lg rounded-tl-none border-4 bg-backgroundTertiary p-2 shadow-form_shadow md:p-4",
          // alex p-2 ---> md:p-5
          "border-[2px]",
          "md:border-[4px]",
          borderColorModal || modalData?.borderColor || "bg-backgroundTertiary",
          modalData?.paddingAddEventModal || "sm:p-2"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={clsx(
            "flex items-center justify-center",
            "min-h-[217px] w-full min-w-[260px]",
            "md:min-h-[237px] md:min-w-[449px]",
            "xl:min-h-[292px] xl:min-w-[588px] xl:px-3",
            "3xl:min-h-[320px]"
          )}
        >
          {modalData?.content}
        </div>
        <button
          onClick={btnFunc}
          className={"z-0 -ml-6 rounded-md md:hover:bg-color2"}
        >
          <Icon
            id="close-default"
            className={clsx(
              "fill-textBlack",
              modalData?.iconCloseEventModal || "h-6 w-6"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default ModalMain;
