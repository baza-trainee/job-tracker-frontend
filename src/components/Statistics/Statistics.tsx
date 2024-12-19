import {
  notifyError,
  notifyInfo,
  notifySuccess,
} from "../Notifications/NotificationService";
import { useAppDispatch } from "../../store/hook";
import { openModal } from "../../store/slices/modalSlice/modalSlice";
import Modal from "../modal/Modal";

function Statistics() {
  const dispatch = useAppDispatch();


  const handleToastError = () => {
    notifyError("Щось пішло не так, дані не збережено");
  };
  const handleToastInfo = () => {
    notifyInfo("Інформація");
  };
  const handleToastSuccess = () => {
    notifySuccess("Звернення надіслано. Відповідь прийде на вказану пошту");
  };

  const handleModal = () => {
    dispatch(
      openModal({
        typeModal: "contactUs",
      })
    );
  };
  return (
    // <div className="flex w-full items-center justify-center">
    <div className="flex w-full flex-col items-center justify-center">
      <h2>Statistics</h2>
      <div className="mt-60 flex flex-col gap-5">
        <button onClick={() => handleToastError()}> Error</button>
        <button onClick={() => handleToastInfo()}> Info</button>
        <button onClick={() => handleToastSuccess()}> Success</button>
        <button onClick={() => handleModal()}> modalButton</button>
      </div>
      <Modal/>
    </div>
  );
}

export default Statistics;
