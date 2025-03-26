import { createNewStatuses } from "@/store/slices/statusVacancy/vacancyStatusSlice";
import Icon from "../../../Icon/Icon";
import FirstVacancyMessage from "../../../Sceleton/FirstVacancyMessage";
import AddVacancyButton from "../../../buttons/AddVacancyButton/AddVacancyButton";
import { vacancyStatusesInfo } from "@/store/slices/statusVacancy/vacancyStatusOperation";
import { useAppDispatch } from "@/store/hook";
import { useTranslation } from "react-i18next";

const NoVacancyCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <div className="mt-4 flex flex-col items-center gap-3 md:mt-8 md:gap-4 xl:mt-[60px] xl:gap-6 2xl:gap-8">
      <FirstVacancyMessage />
      {/* <AddVacancyButton /> */}
      <AddVacancyButton
        buttonText={t("vacanciesHeader.addVacancy")}
        modalType="addVacancy"
        onClick={() => {
          dispatch(createNewStatuses(vacancyStatusesInfo));
        }}
      />
      <Icon
        id={"girl-and-dashboard"}
        className="mt-2 size-[209px] md:mt-2 xl:mt-9 2xl:mt-[38px] 3xl:mt-0 3xl:size-[256px]"
      />
    </div>
  );
};

export default NoVacancyCard;
