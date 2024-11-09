import { FC, ReactNode } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { closeModal } from "../../store/slices/modalSlice";

import { Button } from '../buttons/Button/Button';
import CloseIcon from '../../../public/close.svg';


interface ModalProps {
    content?: ReactNode;
    onCallFunction?: () => unknown;
}

const Modal: FC<ModalProps> = ({ content, onCallFunction }) => {

    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const dispatch = useDispatch();

    if (!isOpen) return null;

    return (

        <div
            className="fixed top-0 right-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-50"
            onClick={() => dispatch(closeModal())}>

            <div
                className="flex flex-row justify-between items-start w-auto h-auto container bg-white"
                onClick={e => e.stopPropagation()}>
                <div
                    className="flex flex-col w-[100%] h-[100%] justify-center items-center">
                    {content}
                    {typeof onCallFunction === "function"
                        ?
                        <Button
                            className=""
                            disabled={false}
                            variant="ghost"
                            size='big'
                            onClick={onCallFunction}>
                            Ok
                        </Button>
                        :
                        null}
                </div>
                <button
                    onClick={() => dispatch(closeModal())}>
                    <img src={CloseIcon} />
                </button>
            </div>

        </div>

    )

}

export default Modal;