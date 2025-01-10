import { useTranslation } from "react-i18next";
import { VacancyInputProps } from "./AddVacancy.props";
import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice";
import { SortOption } from "../../../Vacancies/components/dropdown/Dropdown.props";

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
    vacancyFieldKeys.map((fieldKey: any) => ({
      id: fieldKey,
      name: fieldKey,
      placeholder: t(`addVacancy.placeholders.${fieldKey}`),
      label: t(`addVacancy.form.${fieldKey}`),
    })) || [];

  /* TODO: Формат: Дистанційно - Офіс - Змішаний */
  const workTypeKeys = ["remote", "office", "hybrid"];
  const workTypeOptions: VacancyInputProps[] =
    workTypeKeys.map((typeKey: any) => ({
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
  const buttonResumeOption = { id: "", label: "Оберіть відправлене резюме" };
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
    rejectionReasonKeys.map((reject: any) => ({
      id: reject,
      label: reject,
    })) || [];

  const buttonRejectOption = { id: "", label: "Оберіть причину відмови" };

  return {
    vacancyFields,
    workTypeOptions,
    buttonResumeOption,
    resumeOptions,
    buttonRejectOption,
    rejectOptions,
    isLoading,
    isError,
  };
};

export default AddVacancyInfo;
