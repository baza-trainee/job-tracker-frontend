import { FC } from "react";

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
        onCallFunction()
        setTimeout(() => {
            dispatch(closeModal())
        }, 800)
    }

    const contentMap = {
        success: <span className="text-4xl font-bold text-successful">Успіх!</span>,
        error: <span className="text-4xl font-bold text-error">Упс!</span>,
        confirm: <span className="text-4xl font-bold text-successful">Підтвердіть дію!</span>,
        popup: "",
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

            <div
                className="flex flex-row justify-between items-start w-auto h-auto bg-white rounded-lg shadow-form_shadow"
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

    );

};

export default Modal;