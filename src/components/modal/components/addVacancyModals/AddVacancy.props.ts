import {
  UseFormRegister,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

export type VacancyInputProps = {
  id: string;
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  value?: string;
  date?: string;
  type?: React.HTMLInputTypeAttribute | "vacancy";
};

export type AddVacancyStageProps = {
  register: UseFormRegister<any>;
  getValues?: UseFormGetValues<any>;
  setValue?: UseFormSetValue<any>;
};