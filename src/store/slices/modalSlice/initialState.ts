import { TypesModal } from "@/components/modal/ModalMain.types";
import { Vacancy } from "@/types/vacancies.types";
import { Note } from "@/types/notes.types";
import { Event } from "@/types/event.types";

export interface ModalProps {
  isModalOpen?: boolean;
  typeModal?: TypesModal; // string
  isConfirmationOpen?: boolean;
  typeConfirmation?: TypesModal | null; // string
  idCardVacancy?: string;
  vacancyData?: Vacancy | null;
  noteData?: Note | null;
  eventData?: Event | null;
  profileData?: any | null;
  dataConfirmation?: any | null; // alex
  borderColorModal?: string | null;
  backgroundColorModal?: string | null;
  resetForm?: () => void;
  isButtonOpen?: boolean;
}
