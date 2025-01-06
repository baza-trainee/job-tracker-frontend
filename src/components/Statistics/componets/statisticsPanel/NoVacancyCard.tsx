import Icon from "../../../Icon/Icon";
import FirstVacancyMessage from "../../../Sceleton/FirstVacancyMessage";
import AddVacancyButton from "../../../buttons/AddVacancyButton/AddVacancyButton";

const NoVacanceCard = () => {
  return (
    <div className="mt-[60px] flex flex-col items-center gap-8">
      <FirstVacancyMessage />
      <AddVacancyButton />
      <Icon id={"girl-and-dashboard"} className="mt-[38px] size-[209px]" />
    </div>
  );
};

export default NoVacanceCard;
