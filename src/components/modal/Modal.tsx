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
  const {
    isModalOpen,
    typeModal,
    isConfirmationOpen,
    typeConfirmation,
    isButtonOpen,
    resetForm,
  } = useAppSelector((state) => state.modal);

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
      <div className="flex">
        <ModalMain
          className={classNames("", {
            "scrollbar-transparent absolute left-2/4 top-11 -translate-x-2/4 xl:top-[10%]":
              typeModal === "addVacancy" ||
              typeModal === "editVacancy" ||
              typeModal === "forgotPassword" ||
              typeModal === "addEvent" ||
              typeModal === "editEvent",
          })}
          modalData={modalData}
          btnFunc={() => {
            console.log("isButtonOpen", isButtonOpen)
            return isButtonOpen ? resetForm?.() : dispatch(closeModal());
            // return isButtonOpen ? console.log("++") : console.log("--");
            // return dispatch(closeModal());
          }}
        />
      </div>
      {isConfirmationOpen ? (
        <div
          className={classNames(
            "fixed right-0 top-0 z-50 flex w-full items-center justify-center bg-[#C2C2C2] bg-opacity-50 xl:h-full",
            typeModal === "addVacancy" || typeModal === "editVacancy"
              ? "h-[1300px]"
              : "h-full"
          )}
        >
          <ModalMain
            className="sticky mb-[210px] mt-auto md:mb-[145px] xl:mb-auto"
            modalData={confirmationData}
            btnFunc={() => dispatch(closeConfirmation())}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
