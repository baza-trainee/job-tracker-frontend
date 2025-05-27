import { useTranslation } from "react-i18next";

import { Input } from "@/components/inputs/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { Button } from "@/components/buttons/Button/Button";
import Icon from "@/components/Icon/Icon";

import { useAppDispatch } from "@/store/hook";
import {
  openConfirmation,
  closeButton,
} from "@/store/slices/modalSlice/modalSlice";

import { useEffect } from "react";

import useNotes from "./useNotes";

type NotesProps = {
  type: "addNote" | "updateNote";
};

const NotesModal = ({ type }: NotesProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isAddNote = type === "addNote";

  const { register, resetField, handleSubmit, errors, isNoteChanged } =
    useNotes(type);
  const error = !!Object.keys(errors).length;
  const isDisabledButton = !isNoteChanged || error;

  const handleButton = (typeConfirmation: "saveNote" | "deleteNote") => {
    handleSubmit((data) => {
      dispatch(
        openConfirmation({
          typeConfirmation,
          dataConfirmation: data,
        })
      );
    })();
  };

  // alez

  const handleConfirmation = (
    typeConfirmation: "saveNote" | "deleteNote" | "closeModalsaveEditVacancies"
  ) => {
    handleSubmit((data) => {
      dispatch(
        openConfirmation({
          typeConfirmation,
          dataConfirmation: data,
        })
      );
    })();
  };

  useEffect(() => {
    dispatch(
      closeButton({
        isButtonOpen: isNoteChanged,
        resetForm: () => handleConfirmation("deleteNote"),
      })
    );
  }, [isNoteChanged]);

  return (
    <div className="mb-4 mt-10 w-full text-left xl:my-12 xl:mb-4 xl:mt-10">
      <form>
        <div className="flex flex-col gap-3 md:gap-4">
          <Input
            register={register}
            resetField={resetField}
            key="noteName"
            name="noteName"
            placeholder={t("notesHeader.noteName")}
            type="text"
            className=""
            errors={errors}
            // alex
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
          <Textarea
            register={register}
            resetField={resetField}
            key="noteText"
            name="noteText"
            placeholder={t("notesHeader.noteText")}
            className=""
            errors={errors}
          />

          <div className="flex flex-col justify-center gap-2 md:flex-row xl:mt-4">
            {isAddNote ? (
              <Button
                type="button"
                className="w-full bg-button md:mx-0 md:w-auto"
                variant="ghost"
                size="big"
                disabled={isDisabledButton}
                onClick={() => handleButton("saveNote")}
              >
                {t("notesHeader.createNote")}
                <Icon
                  id={"plus"}
                  className="ml-3 h-6 w-6 fill-textBlack dark:group-hover:fill-blackColor"
                />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  className="w-full md:mx-0 md:w-auto"
                  variant="ghost"
                  size="small"
                  onClick={() => handleButton("deleteNote")}
                >
                  {t("addVacancy.form.delete")}
                  <Icon
                    id={"delete"}
                    className="ml-3 h-6 w-6 fill-textBlack dark:group-hover:fill-blackColor"
                  />
                </Button>
                <Button
                  type="button"
                  className="w-full bg-button md:mx-0 md:w-auto"
                  variant="ghost"
                  size="big"
                  disabled={isDisabledButton}
                  onClick={() => handleButton("saveNote")}
                >
                  {t("addVacancy.form.save")}
                  <Icon
                    id={"check-box"}
                    className="ml-3 h-6 w-6 fill-textBlack dark:group-hover:fill-blackColor"
                  />
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NotesModal;
