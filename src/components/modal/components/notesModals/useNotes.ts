import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { NoteSchema } from "@/schemas/noteSchema";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  closeConfirmation,
  closeModal,
} from "@/store/slices/modalSlice/modalSlice";
import {
  useCreateNoteMutation,
  useDeleteNoteByIdMutation,
  useUpdateNoteByIdMutation,
} from "@/store/querySlices/notesQuerySlice";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";

import {
  notifyError,
  notifySuccess,
} from "@/components/Notifications/NotificationService";

function useNotes(type: "addNote" | "updateNote") {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [createNote] = useCreateNoteMutation();
  const [updateNoteById] = useUpdateNoteByIdMutation();

  const { refetch: refetchNote } = useGetAllUserDataQuery();

  const { noteData } = useAppSelector((state) => state.modal);

  const {
    register,
    resetField,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof NoteSchema>>({
    defaultValues: {
      noteName: "",
      noteText: "",
      noteType: type,
    },
    resolver: zodResolver(NoteSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (type === "updateNote") {
      reset({
        noteName: noteData?.name,
        noteText: noteData?.text,
        noteType: type,
      });
    }
  }, []);

  // Видалити нотатку
  const [deleteNoteById] = useDeleteNoteByIdMutation();

  const deleteNote = async () => {
    try {
      setIsLoading(true);
      await deleteNoteById({ id: noteData?.id as string }).unwrap();
      refetchNote();
      notifySuccess(t("notification.noteDelete"));
      dispatch(closeModal());
    } catch (err) {
      console.log(err);
      notifyError(t("notification.noteDeleteError"));
    }
    setIsLoading(false);
    dispatch(closeConfirmation());
  };

  // якщо зміна у нотатках відбулася, активна кнопка збереження
  // та кнопка закриття модального вікна пропонує зберегти, якщо ні ...
  const watchedValues = watch();
  const isNoteChanged = useMemo(() => {
    if (type === "addNote") {
      return (
        watchedValues?.noteName?.length > 0 &&
        watchedValues?.noteText?.length > 0
      );
    }

    if (!noteData) return false;
    return (
      watchedValues?.noteName !== noteData.name ||
      watchedValues?.noteText !== noteData.text
    );
  }, [watchedValues, noteData, type]);

  const onSubmit: SubmitHandler<z.infer<typeof NoteSchema>> = async (data) => {
    try {
      const { noteName, noteText, noteType } = data;
      // 1 - запит на збереження нової нотатки
      if (noteType === "addNote") {
        const response = await createNote({
          name: noteName,
          text: noteText,
        }).unwrap();
        console.log("resposnse", response);
      }
      // 2 - запит на редагування нотатки
      if (noteType === "updateNote") {
        const response = await updateNoteById({
          id: noteData?.id || "",
          name: noteName,
          text: noteText,
        }).unwrap();
        console.log("resposnse", response);
      }
      refetchNote();
      notifySuccess(t("notification.vacancyAdded"));
      setIsLoading(true);
      dispatch(closeModal());
    } catch (error) {
      notifyError(t("notification.vacancyError"));
      console.error(error);
    }
    setIsLoading(false);
    dispatch(closeConfirmation());
  };

  return {
    register,
    resetField,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    deleteNote,
    isNoteChanged,
    watch,
  };
}

export default useNotes;
