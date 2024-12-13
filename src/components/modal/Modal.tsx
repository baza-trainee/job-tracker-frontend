import { FC, useEffect } from "react";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import { closeModal } from "../../store/slices/modalSlice/modalSlice";

import { contentMap } from "./modalMappings";

import Icon from "../Icon/Icon.tsx";

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, typeModal } = useAppSelector((state) => state.modal);

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
            `relative top-1 z-30 h-[30px] w-[130px] rounded-tl-xl rounded-tr-xl bg-${contentMap[typeModal].color}`
          )}
        ></div>
        <div
          className={clsx(
            `z-40 flex h-auto w-auto flex-row items-start justify-between rounded-lg rounded-tl-none border-4 bg-white p-4 shadow-form_shadow border-${contentMap[typeModal].color}`
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-[289px] min-w-[550px] items-center justify-center">
            {contentMap[typeModal].content}
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="rounded-md hover:bg-color2"
          >
            <Icon id="close-default" className="h-6 w-6 fill-textBlack" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
