import { useTranslation } from "react-i18next";
import { VacancyInputProps } from "./AddVacancy.props";

const AddVacancyInfo = () => {
  const { t } = useTranslation();
  {
    /* TODO: Компаня, Позиція, Лінк на вакансію, Канал зв'яку, Локація*/
  }
  const vacancyInput: VacancyInputProps[] = [
    {
      id: "company",
      name: "company",
      placeholder: t("addVacancy.placeholders.company"),
      label: t("addVacancy.form.company"),
    },
    {
      id: "vacancy",
      name: "vacancy",
      placeholder: t("addVacancy.placeholders.position"),
      label: t("addVacancy.form.position"),
    },
    {
      id: "link",
      name: "link",
      placeholder: t("addVacancy.placeholders.link"),
      label: t("addVacancy.form.link"),
    },
    {
      id: "communication",
      name: "communication",
      placeholder: t("addVacancy.placeholders.communication"),
      label: t("addVacancy.form.communication"),
    },
    {
      id: "location",
      name: "location",
      placeholder: t("addVacancy.placeholders.location"),
      label: t("addVacancy.form.location"),
    },
  ];

  const vacancyInputRadio: VacancyInputProps[] = [
    {
      id: "remote",
      name: "work_type",
      label: t("addVacancy.form.distance"),
      value: "remote",
    },
    {
      id: "office",
      name: "work_type",
      label: t("addVacancy.form.office"),
      value: "office",
    },
    {
      id: "hybrid",
      name: "work_type",
      label: t("addVacancy.form.hybrid"),
      value: "hybrid",
    },
  ];

  const vacancyCheckboxCalendar: VacancyInputProps[] = [
    {
      id: "sendSummary",
      name: "sendSummary",
      label: t("addVacancy.form.sendSummary"),
    },
    {
      id: "HR",
      name: "HR",
      label: t("addVacancy.form.HR"),
    },
    {
      id: "testTask",
      name: "testTask",
      label: t("addVacancy.form.testTask"),
    },
    {
      id: "technicalInterview",
      name: "technicalInterview",
      label: t("addVacancy.form.technicalInterview"),
    },
    {
      id: "rejection",
      name: "rejection",
      label: t("addVacancy.form.rejection"),
    },
    {
      id: "offer",
      name: "offer",
      label: t("addVacancy.form.offer"),
    },
  ];

  return { vacancyInput, vacancyInputRadio, vacancyCheckboxCalendar };
};

export default AddVacancyInfo;
