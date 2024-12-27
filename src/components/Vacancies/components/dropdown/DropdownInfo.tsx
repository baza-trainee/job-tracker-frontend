import { useTranslation } from "react-i18next";
import { SortOption } from "./Dropdown.props";

export const DropdownInfo = () => {
  const { t } = useTranslation();

  const mainOptions: SortOption[] = [
    { id: "newFirst", label: t("sortDropdown.newFirst") },
    { id: "oldFirst", label: t("sortDropdown.oldFirst") },
    {
      id: "workType",
      label: t("sortDropdown.workType"),
      subOptions: [
        { id: "office", label: t("sortDropdown.office") },
        { id: "remote", label: t("sortDropdown.remote") },
        { id: "hybrid", label: t("sortDropdown.mixed") },
      ],
    },
    {
      id: "status",
      label: t("sortDropdown.status"),
      subOptions: [
        { id: "saved", label: t("sortDropdown.saved") },
        { id: "resume", label: t("sortDropdown.sent") },
        { id: "hr", label: t("sortDropdown.hrInterview") },
        {
          id: "test",
          label: t("sortDropdown.testTask"),
          shortLabel: t("sortDropdown.testTaskShort"),
        },
        {
          id: "tech",
          label: t("sortDropdown.techInterview"),
          shortLabel: t("sortDropdown.techInterviewShort"),
        },
        { id: "reject", label: t("sortDropdown.rejection") },
        { id: "offer", label: t("sortDropdown.offer") },
      ],
    },
  ];
  const buttonOption = { id: "", label: t("sortDropdown.sortBy") };

  return { mainOptions: mainOptions, buttonOption: buttonOption };
};
