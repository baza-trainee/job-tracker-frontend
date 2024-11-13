import { FC, useEffect } from "react";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import { closeModal } from "../../store/slices/modalSlice/modalSlice";

import { contentMap, colorType, buttonMap } from "./modalMappings";

import { Button } from '../buttons/Button/Button';
import iconClose from "/close.svg";

const Modal: FC = () => {

    const dispatch = useAppDispatch();
    const { isModalOpen, modalContent, onCallFunction, typeModal } = useAppSelector(
        (state) => state.modal,
    );

    const confirmModal = (): void => {
        onCallFunction && onCallFunction();
        setTimeout(() => {
            dispatch(closeModal())
        }, 800)
    }

    const functionButtonMap = {
        success: () => dispatch(closeModal()),
        error: () => dispatch(closeModal()),
        confirm: confirmModal,
        popup: null,
    }

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                dispatch(closeModal());
            }
        };

        if (isModalOpen) {
            window.addEventListener("keydown", handleEscKey);
        };

        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [dispatch, isModalOpen]);

    useEffect(() => {
        let timerModalPopup: number;
        if (typeModal === "popup") {
            timerModalPopup = setTimeout(() => {
                dispatch(closeModal());
            }, 3000);
        };
        return () => clearTimeout(timerModalPopup);

    }, [typeModal, dispatch]);

    if (!isModalOpen) return null;

    return (

        <div
            className="fixed top-0 right-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-50 font-nunito"
            onClick={() => dispatch(closeModal())}>
            
            <div>
                <div className={clsx(
                    "relative top-1 w-[130px] h-[30px] rounded-tr-xl z-30 rounded-tl-xl",
                    colorType[typeModal]?.background
                )}>
                </div>
                <div
                    className={clsx(
                        "flex flex-row justify-between items-start p-4 w-auto h-auto z-40 bg-white rounded-lg rounded-tl-none shadow-form_shadow border-4",
                        colorType[typeModal]?.border)}
                    onClick={e => e.stopPropagation()}>

                    <div
                        className="flex flex-col w-[550px] h-[289px] justify-center items-center gap-8">
                        {contentMap[typeModal]}
                        <div className="text-center text-lg">{modalContent}</div>
                        {typeModal !== "popup" ?
                            (<Button
                                disabled={false}
                                variant="ghost"
                                size={typeModal === "error" ? "small" : "big"}
                                onClick={functionButtonMap[typeModal] || (() => dispatch(closeModal()))}>
                                {buttonMap[typeModal]}
                            </Button>)
                            : (null)
                        }
                    </div>
                    <button
                        onClick={() => dispatch(closeModal())}>
                        <img src={iconClose} />
                    </button>

                </div>
            </div>

        </div>

    );

};

export default Modal;