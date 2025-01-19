import { useAppDispatch, useAppSelector } from "@/store/hook";
import { PropsModalAddProperties } from "./modalAddProperties.types";
import { Button } from "../buttons/Button/Button";
import { closeModal } from "@/store/slices/modalSlice/modalSlice";
import { useDeleteCoverLetterByIdMutation } from "@/store/querySlices/coverLettersQuerySlice";
import { useDeleteProjectByIdMutation } from "@/store/querySlices/projectQuerySlice";
import { useDeleteResumeByIdMutation } from "@/store/querySlices/resumesQuerySlices";
import { useEffect } from "react";
import {
  notifyError,
  notifySuccess,
} from "../Notifications/NotificationService";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";

function ModalRemoveProperties({ cardsType }: PropsModalAddProperties) {
  const idRemoveItem = useAppSelector((state) => state.modal.dataConfirmation);

  const dispatch = useAppDispatch();

  const { refetch: refetchProfile } = useGetAllUserDataQuery();

  const [
    removeCoverLetter,
    {
      isError: isErrorRemoveCoverLetter,
      isSuccess: isSuccessRemoveCoverLetter,
      isLoading: isLoadingRemoveCoverLetter,
    },
  ] = useDeleteCoverLetterByIdMutation();

  const [
    removeProject,
    {
      isError: isErrorRemoveProject,
      isSuccess: isSuccessRemoveProject,
      isLoading: isLoadingRemoveProject,
    },
  ] = useDeleteProjectByIdMutation();

  const [
    removeResume,
    {
      isError: isErrorRemoveResume,
      isSuccess: isSuccessRemoveResume,
      isLoading: isLoadingRemoveResume,
    },
  ] = useDeleteResumeByIdMutation();

  useEffect(() => {
    if (
      isErrorRemoveCoverLetter ||
      isErrorRemoveProject ||
      isErrorRemoveResume
    ) {
      notifyError("Помилка видалення даних");
    }
  }, [isErrorRemoveCoverLetter, isErrorRemoveProject, isErrorRemoveResume]);

  useEffect(() => {
    if (
      isSuccessRemoveCoverLetter ||
      isSuccessRemoveProject ||
      isSuccessRemoveResume
    ) {
      notifySuccess("Дані видалено успішно");
      refetchProfile();
      dispatch(closeModal());
    }
  }, [
    isSuccessRemoveCoverLetter,
    isSuccessRemoveProject,
    isSuccessRemoveResume,
  ]);

  const handleRemove = async () => {
    switch (cardsType) {
      case "addCoverLetters":
        await removeCoverLetter({ id: idRemoveItem });
        break;

      case "addPersonalProperties":
        console.log("remove personal properties", idRemoveItem);
        break;

      case "addProjects":
        await removeProject({ id: idRemoveItem });
        break;

      case "addResumes":
        await removeResume({ id: idRemoveItem });
        break;

      default:
        break;
    }
  };

  const isDisabledButtonRemove =
    isLoadingRemoveCoverLetter ||
    isLoadingRemoveProject ||
    isLoadingRemoveResume;

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2>Ви впевнені?</h2>
      <div className="flex gap-4">
        <Button type="button" onClick={() => dispatch(closeModal())}>
          Скасувати
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={handleRemove}
          disabled={isDisabledButtonRemove}
        >
          Видалити
        </Button>
      </div>
    </div>
  );
}

export default ModalRemoveProperties;
