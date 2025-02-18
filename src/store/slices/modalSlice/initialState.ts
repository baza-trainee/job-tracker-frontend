import { TypesModal } from "@/components/modal/ModalMain.types";
import { Vacancy } from "@/types/vacancies.types";
import { Event } from "@/types/event.types";

export interface ModalProps {
  isModalOpen?: boolean;
  typeModal?: TypesModal; // string
  isConfirmationOpen?: boolean;
  typeConfirmation?: TypesModal | null; // string
  idCardVacancy?: string;
  vacancyData?: Vacancy | null;
  eventData?: Event | null;
  dataConfirmation?: any | null; // alex
  borderColorModal?: string | null;
  backgroundColorModal?: string | null;
}
