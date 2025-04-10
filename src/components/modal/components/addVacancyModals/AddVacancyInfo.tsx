import { useTranslation } from "react-i18next";
import { VacancyInputProps } from "./AddVacancy.props";
import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice";
import { SortOption } from "../../../Vacancies/components/dropdown/Dropdown.props";
import { nanoid } from "nanoid";

const AddVacancyInfo = () => {
  const { t } = useTranslation();

  /* TODO: Компаня, Позиція, Лінк на вакансію, Канал зв'яку, Локація*/
  const vacancyFieldKeys = [
    "company",
    "vacancy",
    "link",
    "communication",
    "location",
  ];
  const vacancyFields: VacancyInputProps[] =
    vacancyFieldKeys.map((fieldKey: string) => ({
      id: fieldKey,
      name: fieldKey,
      placeholder: t(`addVacancy.placeholders.${fieldKey}`),
      label: t(`addVacancy.form.${fieldKey}`),
    })) || [];

  /* TODO: Формат: Дистанційно - Офіс - Змішаний */
  const workTypeKeys = ["remote", "office", "hybrid"];
  const workTypeOptions: VacancyInputProps[] =
    workTypeKeys.map((typeKey: string) => ({
      id: typeKey,
      name: "work_type",
      label: t(`addVacancy.form.${typeKey}`),
      value: typeKey,
    })) || [];

  /* TODO: Статус - Відправ реюме, HR, Тест завдання, Тех співбесіда, Відмова, Офер*/
  // 1 - запит на отримання резюме
  const { data, isLoading, isError } = useGetAllUserDataQuery();
  // 2 - масив з резюме
  const resumeOptions: SortOption[] =
    data?.resumes.map((resume: any) => ({
      id: resume.id,
      label: resume.name,
    })) || [];
  const buttonResumeOption = { id: "", label: t("addVacancy.titleResumeList") };
  // 3 - масив з причинами відмови
  const rejectionReasonKeys = [
    "SOFT_SKILLS",
    "TECH_SKILLS",
    "ENGLISH",
    "EXPERIENCE",
    "STOPPED",
    "NO_ANSWER",
    "OTHER",
  ];
  const rejectOptions: SortOption[] =
    rejectionReasonKeys.map((reject: string) => ({
      id: reject,
      label: t(`statisticsRejectDiagram.${reject}`),
    })) || [];

  const buttonRejectOption = { id: "", label: t("addVacancy.titleRejectList") };

  // 4 - масив з додатковими етапами
  const stagesKeys = ["hr", "test", "tech"];
  const stagesOptions: SortOption[] =
    stagesKeys.map((stage: string) => ({
      id: nanoid(10),
      name:stage,
      label: t(`addVacancy.form.${stage}`),
    })) || [];

  const buttonStagesOption = { id: "", label: t("addVacancy.titleAddStage") };

  return {
    vacancyFields,
    workTypeOptions,
    buttonResumeOption,
    resumeOptions,
    buttonRejectOption,
    rejectOptions,
    stagesOptions,
    buttonStagesOption,
    isLoading,
    isError,
  };
};

export default AddVacancyInfo;
