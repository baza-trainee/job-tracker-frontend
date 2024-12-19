import { FC, useEffect } from "react";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import { closeModal } from "../../store/slices/modalSlice/modalSlice";

import { contentMap } from "./modalMappings";

import Icon from "../Icon/Icon.tsx";

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, typeModal, isConfirmationOpen, typeConfirmation } =
    useAppSelector((state) => state.modal);

  const modalData = contentMap[typeModal || "close"];
  const modalConfirmation = contentMap[typeConfirmation || "close"];

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeModal());
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [dispatch, isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 font-nunito"
      onClick={() => dispatch(closeModal())}
    >
      <div>
        <div
          className={clsx(
            "relative top-1 z-30 h-[30px] w-[130px] rounded-tl-xl rounded-tr-xl",
            modalData.bgColor
          )}
        ></div>
        <div
          className={clsx(
            "z-40 flex h-auto w-auto flex-row items-start justify-between rounded-lg rounded-tl-none border-4 bg-white p-4 shadow-form_shadow",
            modalData.borderColor
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-[289px] min-w-[550px] items-center justify-center">
            {modalData.content}
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="rounded-md hover:bg-color2"
          >
            <Icon id="close-default" className="h-6 w-6 fill-textBlack" />
          </button>
        </div>
      </div>
      {isConfirmationOpen ? (
        <div className={clsx(
            "fixed top-[25%] z-50",
          )}>
          <div
            className={clsx(
              "relative top-1 h-[30px] w-[130px] rounded-tl-xl rounded-tr-xl",
              modalConfirmation.bgColor
            )}
          ></div>
          <div
            className={clsx(
              "z-40 flex h-auto w-auto flex-row items-start justify-between rounded-lg rounded-tl-none border-4 bg-white p-4 shadow-form_shadow",
              modalConfirmation.borderColor
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-[289px] min-w-[550px] items-center justify-center">
              {modalConfirmation.content}
            </div>
            <button
              onClick={() => dispatch(closeModal())}
              className="rounded-md hover:bg-color2"
            >
              <Icon id="close-default" className="h-6 w-6 fill-textBlack" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
