import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import {
  closeConfirmation,
  closeModal,
} from "@/store/slices/modalSlice/modalSlice";
import {
  notifyError,
  notifySuccess,
} from "@/components/Notifications/NotificationService";

import { useCreateNoteMutation } from "@/store/querySlices/notesQuerySlice";

export const NotesSchema = z.object({
  noteName: z.string().min(1, "Має містити більше одного символа"),
  noteText: z.string().min(1, "Має містити більше одного символа"),
  noteType: z.enum(["addNote", "updateNote"]),
});

function useNotes(type: "addNote" | "updateNote") {
  console.log("useNotes", type);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [createNotes] = useCreateNoteMutation();

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NotesSchema>>({
    defaultValues: {
      noteName: "",
      noteText: "",
      noteType: type,
    },
    resolver: zodResolver(NotesSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<z.infer<typeof NotesSchema>> = async (data) => {
    try {
      console.log("4");
      const { noteName, noteText, noteType } = data;
      // 1 - запит на збереження нової нотатки
      if (noteType === "addNote") {
        const response = await createNotes({
          name: noteName,
          text: noteText,
        }).unwrap();
        console.log("resposnse", response);
      }
      // 2 - запит на редагування нотатки
      if (noteType === "updateNote") {
        const response = await createNotes({
          name: noteName,
          text: noteText,
        }).unwrap();
        console.log("resposnse", response);
      }
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

  return { register, resetField, handleSubmit, errors, onSubmit, isLoading };
}

export default useNotes;
