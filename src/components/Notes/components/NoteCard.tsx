import Icon from "@/components/Icon/Icon";
import { ICON } from "@/components/Icon/icons";
import { IconButton } from "@/components/buttons/IconButton/IconButton";
import { Note } from "@/types/notes.types";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const NoteCard: FC<Note> = (note) => {
  const { id, name, text, updatedAt } = note;

  const { i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "uk-UA";

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(updatedAt));

  return (
    <div className="" id={id}>
      <div className="w-[118px] rounded-t-xl bg-backgroundSecondary px-3 py-[6px]">
        {name}
      </div>
      <div className="flex flex-col justify-between rounded-xl rounded-tl-none border-4 border-backgroundSecondary p-3">
        <p>{text}</p>
        <div className="flex items-end justify-between">
          <div>{formattedDate}</div>
          <div className="flex gap-3">
            <IconButton
              label="Delete note button"
              variant="default"
              onClick={() => console.log("first")}
              className="p-0"
            >
              <Icon id={ICON.DELETE} className="size-10" />
            </IconButton>
            <IconButton
              label="Edit note button"
              variant="default"
              onClick={() => console.log("first")}
              className="p-0"
            >
              <Icon id={ICON.EDIT} className="size-10" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
