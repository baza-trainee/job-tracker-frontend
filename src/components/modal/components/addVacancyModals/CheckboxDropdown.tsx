export type CheckboxDropdownProps = {
  id: string;
  label: string;
  shortLabel?: string;
  link: string;
  subOptions?: CheckboxDropdownProps[];
};

export const CheckboxDropdown = () => {
  const mainOptions: CheckboxDropdownProps[] = [
    {
      id: "first",
      label: "Junior Developer Resume 2024",
      link: "https://example.com/my-resume.pdf",
    },
    {
      id: "second",
      label: "Trainee Developer Resume 2024",
      link: "https://example.com/my-resume.pdf",
    },
  ];
  const buttonOption = { id: "", label: "Обрати резюме" };

  return { mainOptions: mainOptions, buttonOption: buttonOption };
};
