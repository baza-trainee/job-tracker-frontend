import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { NoteSchema } from "@/schemas/noteSchema";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { closeConfirmation, closeModal, } from "@/store/slices/modalSlice/modalSlice";
import { useCreateNoteMutation, useDeleteNoteByIdMutation, useUpdateNoteByIdMutation, } from "@/store/querySlices/notesQuerySlice";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";

import { notifyError, notifySuccess, } from "@/components/Notifications/NotificationService";

function useNotes(type: "addNote" | "updateNote") {
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
    formState: { errors },
  } = useForm<z.infer<typeof NoteSchema>>({
    defaultValues: {
      noteName: "",
      noteText: "",
      noteType: type,
    },
    resolver: zodResolver(NoteSchema),
    mode: "onSubmit",
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
      notifySuccess("Нотатку успішно видалено. Дякую");
    } catch (err) {
      console.log(err);
      notifyError("Виникла помилка. Вакансію не видалено");
    }
    setIsLoading(false);
    dispatch(closeConfirmation());
    dispatch(closeModal());
  };

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
      notifySuccess("Дані успішно збережено. Дякую");
      setIsLoading(true);
    } catch (error) {
      notifyError("Помилка збереження даних");
      console.error(error);
    }
    setIsLoading(false);
    dispatch(closeConfirmation());
    dispatch(closeModal());
  };

  return {
    register,
    resetField,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    deleteNote,
  };
}

export default useNotes;
