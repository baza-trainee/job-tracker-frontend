import AddButton from "@/components/buttons/AddButton/AddButton";
import Icon from "../../../Icon/Icon";
import FirstVacancyMessage from "../../../Sceleton/FirstVacancyMessage";

const NoVacancyCard = () => {
  return (
    <div className="mt-4 flex flex-col items-center gap-3 md:mt-8 md:gap-4 xl:mt-[60px] xl:gap-6 2xl:gap-8">
      <FirstVacancyMessage />
      <AddButton variant="noNote" />
      <Icon
        id={"girl-and-dashboard"}
        className="mt-2 size-[209px] md:mt-2 xl:mt-9 2xl:mt-[38px] 3xl:mt-0 3xl:size-[256px]"
      />
    </div>
  );
};

export default NoVacancyCard;
