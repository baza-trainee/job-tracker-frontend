import { useTranslation } from "react-i18next";
import { SortOption } from "./Dropdown.props";

export const DropdownNotesInfo = () => {
  const { t } = useTranslation();

  const mainOptions: SortOption[] = [
    { id: "newFirst", label: t("notesSortDropdown.newFirst") },
    { id: "oldFirst", label: t("notesSortDropdown.oldFirst") },
    {
      id: "alphabetically",
      label: t("notesSortDropdown.alphabetically"),
    },
  ];
  const buttonOption = { id: "", label: t("notesSortDropdown.sortBy") };

  return { mainOptions: mainOptions, buttonOption: buttonOption };
};
