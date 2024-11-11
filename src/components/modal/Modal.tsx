import { FC } from "react";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import { closeModal } from "../../store/slices/modalSlice/modalSlice";
import { isOpenModal, modalCallFunction, modalContent, typeModal } from "../../store/slices/modalSlice/selectors";

import { Button } from '../buttons/Button/Button';
import iconClose from "/close.svg";

const Modal: FC = () => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(isOpenModal);
    
    const content = useAppSelector(modalContent);
    const onCallFunction = useAppSelector(modalCallFunction);
    const type = useAppSelector(typeModal);

    const confirmModal = (): void => {
        onCallFunction && onCallFunction();
        setTimeout(() => {
            dispatch(closeModal())
        }, 800)
    }

    const contentMap = {
        success: <span className="text-4xl font-bold text-modalWindowGreen">Успіх!</span>,
        error: <span className="text-4xl font-bold text-error">Упс!</span>,
        confirm: <span className="text-4xl font-bold text-successful">Підтвердіть дію!</span>,
        popup: "",
    }
    const colorType = {
        success: {
            background: "bg-modalWindowGreen",
            border: "border-modalWindowGreen",
        },
        error: {
            background: "bg-modalWindowRed",
            border: "border-modalWindowRed",
        },
        confirm: {
            background: "bg-modalWindowGreen",
            border: "border-modalWindowGreen",
        },
        popup: {
            background: "bg-white",
            border: "border-white",
        }
    }
    const buttonMap = {
        success: "Продовжити",
        error: "Повторити спробу",
        confirm: "Ок",
        popup: "",
    }
    const functionButtonMap = {
        success: () => dispatch(closeModal()),
        error: () => dispatch(closeModal()),
        confirm: confirmModal,
        popup: null,
    }

    if (!isOpen) return null;
    if (type === "popup") setTimeout(() => {dispatch(closeModal())}, 3000);

    return (

        <div
            className="fixed top-0 right-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-50 font-nunito"
            onClick={() => dispatch(closeModal())}>
            
            <div>
                <div className={clsx(
                    "relative top-1 w-[130px] h-[30px] rounded-tr-xl z-30 rounded-tl-xl",
                    colorType[type]?.background
                )}>
                </div>
                <div
                    className={clsx(
                        "flex flex-row justify-between items-start p-4 w-auto h-auto z-40 bg-white rounded-lg rounded-tl-none shadow-form_shadow border-4",
                        colorType[type]?.border)}
                    onClick={e => e.stopPropagation()}>

                    <div
                        className="flex flex-col w-[550px] h-[289px] justify-center items-center gap-8">
                        {contentMap[type]}
                        <div className="text-center text-lg">{content}</div>
                        {type !== "popup" ? 
                            (<Button 
                                disabled={false}
                                variant="ghost"
                                size={type==="error" ? "small" : "big"}
                                onClick={ functionButtonMap[type] || (() => dispatch(closeModal())) }>
                                {buttonMap[type]}
                            </Button>)
                            : (null)
                        }
                    </div>
                    <button 
                        className=""
                        onClick={() => dispatch(closeModal())}>
                        <img src={iconClose} />
                    </button>

                </div>
            </div>

        </div>

    );

};

export default Modal;