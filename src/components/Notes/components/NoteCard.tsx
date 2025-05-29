import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/store/hook";
import { openModal } from "@/store/slices/modalSlice/modalSlice";

import Icon from "@/components/Icon/Icon";
import { ICON } from "@/components/Icon/icons";
import { IconButton } from "@/components/buttons/IconButton/IconButton";
import { Note } from "@/types/notes.types";

const NoteCard: FC<Note> = (note) => {
  const { i18n } = useTranslation();
  const { id, name, text, updatedAt } = note;

  const locale = i18n.language === "en" ? "en-US" : "uk-UA";

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(updatedAt));

  const dispatch = useAppDispatch();
  const handleNoteCard = (typeModal: "updateNote" | "deleteNote") => {
    dispatch(
      openModal({
        typeModal,
        noteData: note,
      })
    );
  };

  return (
    <div className="w-full font-nunito text-base leading-[135%]" id={id}>
      <div className="w-[118px] truncate rounded-t-xl bg-backgroundSecondary px-3 py-[6px] font-medium text-blackColor dark:bg-greyLightcolor md:w-[141px] md:text-xl xl:w-[149px] xl:px-4">
        {name}
      </div>
      <div className="flex h-auto flex-col justify-between rounded-xl rounded-tl-none border-4 border-backgroundSecondary p-3 dark:border-greyLightcolor">
        <p
          className="mb-6 line-clamp-[7] cursor-pointer break-words text-textBlack smOnly:break-all"
          onClick={() => handleNoteCard("updateNote")}
        >
          {text}
        </p>

        <div className="flex items-end justify-between">
          <div className="text-sm font-medium text-textBlack">
            {formattedDate}
          </div>
          <div className="flex gap-3">
            <IconButton
              label="Delete_note_button"
              variant="default"
              onClick={() => handleNoteCard("deleteNote")}
              className="custom-hover p-0 hover:fill-iconHover active:fill-iconHover"
            >
              <Icon id={ICON.DELETE} className="size-10 md:size-6" />
            </IconButton>
            <IconButton
              label="Edit_note_ button"
              variant="default"
              onClick={() => handleNoteCard("updateNote")}
              className="custom-hover p-0 hover:fill-iconHover active:fill-iconHover"
            >
              <Icon id={ICON.EDIT} className="size-10 md:size-6" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
