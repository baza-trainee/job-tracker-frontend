import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useNotes from "./useNotes";

import { Input } from "@/components/inputs/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { Button } from "@/components/buttons/Button/Button";
import Icon from "@/components/Icon/Icon";

import { useAppDispatch } from "@/store/hook";
import {
  openConfirmation,
  closeButton,
} from "@/store/slices/modalSlice/modalSlice";

import { TypesModal } from "../../ModalMain.types";
import { NoteType } from "@/types/notes.types";

const NotesModal = ({ type }: NoteType) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isAddNote = type === "addNote";

  const { register, resetField, handleSubmit, errors, isNoteChanged, watch } =
    useNotes(type);

  const hasNoteName = Boolean(watch("noteName"));
  const hasNoteText = Boolean(watch("noteText"));
  const hasErrors = Object.keys(errors).length > 0;
  const isDisabledButton =
    !isNoteChanged || hasErrors || !hasNoteName || !hasNoteText;

  const handleConfirmation = (typeConfirmation: TypesModal) => {
    if (hasErrors || !hasNoteName || !hasNoteText) {
      dispatch(openConfirmation({ typeConfirmation: "closeDiscardModal" }));
    } else {
      handleSubmit((data) => {
        dispatch(
          openConfirmation({
            typeConfirmation,
            dataConfirmation: data,
          })
        );
      })();
    }
  };

  const saveNote = () => handleConfirmation("saveNote");
  const deleteNote = () => handleConfirmation("deleteNote");

  useEffect(() => {
    const isButtonOpen =
      type === "updateNote" ? isNoteChanged : hasNoteName || hasNoteText;

    dispatch(
      closeButton({
        isButtonOpen,
        resetForm: () => handleConfirmation("closeModalsaveNote"),
      })
    );
  }, [isNoteChanged, type, dispatch, hasNoteName, hasNoteText, hasErrors]);

  return (
    <div className="mb-4 mt-10 w-full text-left xl:my-12 xl:mb-4 xl:mt-10">
      <form>
        <div className="flex flex-col gap-3 md:gap-4">
          <Input
            register={register}
            resetField={resetField}
            name="noteName"
            placeholder={t("notesHeader.noteName")}
            type="text"
            className=""
            errors={errors}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
          <Textarea
            register={register}
            resetField={resetField}
            name="noteText"
            placeholder={t("notesHeader.noteText")}
            className=""
            errors={errors}
            watch={watch}
          />

          <div className="flex flex-col justify-center gap-2 md:flex-row xl:mt-4">
            {isAddNote ? (
              <Button
                type="button"
                className="group w-full md:mx-0 md:w-auto"
                variant="accent"
                size="big"
                disabled={isDisabledButton}
                onClick={saveNote}
              >
                {t("notesHeader.createNote")}
                <Icon
                  id={`${isDisabledButton ? "plus-gray" : "plus"}`}
                  className="ml-3 h-6 w-6"
                />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  className="w-full md:mx-0 md:w-auto"
                  variant="ghost"
                  size="small"
                  onClick={deleteNote}
                >
                  {t("addVacancy.form.delete")}
                  <Icon id={"delete"} className="ml-3 h-6 w-6" />
                </Button>
                <Button
                  type="button"
                  className="w-full md:mx-0 md:w-auto"
                  variant="accent"
                  size="big"
                  disabled={isDisabledButton}
                  onClick={saveNote}
                >
                  {t("addVacancy.form.save")}
                  <Icon
                    id={`${isDisabledButton ? "check-box-gray" : "check-box"}`}
                    className="ml-3 h-6 w-6"
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
