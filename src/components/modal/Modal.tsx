import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  closeConfirmation,
  closeModal,
} from "../../store/slices/modalSlice/modalSlice";

import { contentMap } from "./modalMappings";

import ModalMain from "./ModalMain.tsx";
import classNames from "classnames";

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, typeModal, isConfirmationOpen, typeConfirmation } =
    useAppSelector((state) => state.modal);

  const modalData = contentMap[typeModal || "close"];
  const confirmationData = contentMap[typeConfirmation || "close"];

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isConfirmationOpen) {
          return dispatch(closeConfirmation());
        }
        dispatch(closeModal());
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [dispatch, isModalOpen, isConfirmationOpen]);

  const handleCloseModal = () => {
    if (isConfirmationOpen) {
      return;
    }
    dispatch(closeModal());
  };

  if (!isModalOpen) return null;

  return (
    <div
      className={classNames(
        "fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 font-nunito backdrop-blur-sm"
      )}
      onClick={() => handleCloseModal()}
    >
      <div className="">
        <ModalMain
          className={classNames("", {
            "scrollbar-transparent absolute left-2/4 top-11 -translate-x-2/4 xl:top-24":
              typeModal === "addVacancy" || typeModal === "editVacancy",
          })}
          modalData={modalData}
          btnFunc={() => dispatch(closeModal())}
        />
      </div>
      {isConfirmationOpen ? (
        <div className="absolute right-0 top-0 z-50 flex h-full w-full items-center justify-center">
          <ModalMain
            className="fixed top-[25%] z-50"
            modalData={confirmationData}
            btnFunc={() => dispatch(closeConfirmation())}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
