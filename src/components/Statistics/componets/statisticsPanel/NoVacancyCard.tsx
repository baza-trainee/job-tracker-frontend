import AddButton from "@/components/buttons/AddButton/AddButton";
import Icon from "../../../Icon/Icon";
import FirstVacancyMessage from "../../../Sceleton/FirstVacancyMessage";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconId } from "@/components/Icon/icons";
import { cn } from "@/utils/utils";

const NoVacancyCard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const page = location.pathname.replace(/^\/+/, "");

  let text = "";
  let buttonText: "vacancies" | "notes" | "noNote" | "archive";
  let icon: IconId;
  const isNote = page === "notes";

  switch (page) {
    case "statistics":
      text = t("statisticsHeader.firstMessage");
      buttonText = "vacancies";
      icon = "girl-and-dashboard";
      break;

    case "notes":
      text = t("notesHeader.cardFirst");
      buttonText = "noNote";
      icon = "dashboard";

      break;

    default:
      text = t("statisticsHeader.firstMessage");
      buttonText = "vacancies";
      icon = "girl-and-dashboard";
      break;
  }

  return (
    <div
      className={cn(
        "mt-4 flex flex-col items-center gap-3 md:mt-8 md:gap-4 xl:mt-[60px] xl:gap-6 2xl:mt-10 2xl:gap-4 3xl:mt-[60px] 3xl:gap-8",
        isNote && "gap-6 md:mt-[60px] md:gap-8 xl:gap-8 2xl:gap-8 3xl:mt-[60px]"
      )}
    >
      <FirstVacancyMessage
        text={text}
        className={isNote ? "xl:w-[521px] 3xl:w-[640px] smOnly:px-14" : ""}
      />
      <AddButton variant={buttonText} />
      <Icon
        id={icon}
        className={cn(
          "mt-2 size-[209px] fill-textBlack md:mt-2 xl:mt-9 2xl:mt-0 3xl:mt-0 3xl:size-[256px]",
          isNote && "mt-9 md:mt-7 xl:mt-7 2xl:mt-7 3xl:mt-7"
        )}
      />
    </div>
  );
};

export default NoVacancyCard;
