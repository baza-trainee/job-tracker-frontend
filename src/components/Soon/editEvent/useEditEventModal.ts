import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Event as EventData } from "@/types/event.types.ts";
import { useForm } from "react-hook-form";
import type { SingleValue } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector, useAppDispatch } from "../../../store/hook.ts";
import { selectEventData } from "../../../store/slices/modalSlice/selectors.ts";
import {
  openConfirmation,
  closeButton,
} from "../../../store/slices/modalSlice/modalSlice.ts";
import { getEventSchema } from "../../../schemas/eventModalSchema.ts";
import { TypesModal } from "../../modal/ModalMain.types.ts";

type FormValues = {
  soonEventName: string;
  soonEventNotes: string;
  hours: number | null;
  minutes: number | null;
  date: string;
};

interface OptionType {
  value: number;
  label: string;
}

const useEditEventModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const eventData: EventData | null = useAppSelector(selectEventData) ?? null;

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(getEventSchema()),
    defaultValues: {
      soonEventName: "",
      soonEventNotes: "",
      hours: null,
      minutes: null,
      date: "",
    },
  });

  const [menuOpenHours, setMenuOpenHours] = useState(false);
  const [menuOpenMinutes, setMenuOpenMinutes] = useState(false);
  const [inputChanged, setInputChanged] = useState(false);

  useEffect(() => {
    if (!eventData) return;
    const [hours, minutes] = eventData.time.split(":").map(Number);

    reset({
      soonEventName: eventData.name || "",
      soonEventNotes: eventData.text || "",
      hours: isNaN(hours) ? null : hours,
      minutes: isNaN(minutes) ? null : minutes,
      date: eventData.date || "",
    });
    setInputChanged(false);
  }, [eventData, reset]);

  const handleConfirmation = (typeConfirmation: TypesModal) => {
    const currentFormData = watch(); // Отримуємо поточні значення форми
    dispatch(
      openConfirmation({
        typeConfirmation,
        dataConfirmation: { ...currentFormData, id: eventData?.id },
      })
    );
  };

  useEffect(() => {
    dispatch(
      closeButton({
        isButtonOpen: inputChanged,
        resetForm: () => handleConfirmation("closeModalsaveEditEvent"),
      })
    );
  }, [inputChanged, dispatch, handleConfirmation]);

  const confirmDelete = () => handleConfirmation("deleteEvent");
  const confirmSave = () => handleConfirmation("saveEditEvent");

  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, "0"),
  }));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, "0"),
  }));

  useEffect(() => {
    register("hours", { required: true });
    register("minutes", { required: true });
  }, [register]);

  const handleInputClick = (type: "hours" | "minutes") => {
    const isHours = type === "hours";
    const isOpen = isHours ? menuOpenHours : menuOpenMinutes;
    const setMenu = isHours ? setMenuOpenHours : setMenuOpenMinutes;

    setMenu(!isOpen);
  };

  const handleInputChange = () => {
    setInputChanged(true);
  };

  const handleHourInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleInputChange();
    let value = e.currentTarget.value.replace(/\D/g, "");
    if (value.length > 2) value = value.slice(0, 2);
    if (+value > 23) return;
    setValue("hours", Number(value), { shouldValidate: true });
  };

  const handleMinuteInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleInputChange();
    let value = e.currentTarget.value.replace(/\D/g, "");
    if (value.length > 2) value = value.slice(0, 2);
    if (+value > 59) return;
    setValue("minutes", Number(value), { shouldValidate: true });
  };

  const handleHourSelectChange = (selectedOption: SingleValue<OptionType>) => {
    handleInputChange();
    setMenuOpenHours(false);
    setValue("hours", selectedOption ? selectedOption.value : null, {
      shouldValidate: true,
    });
    trigger("hours");
  };

  const handleMinuteSelectChange = (
    selectedOption: SingleValue<OptionType>
  ) => {
    handleInputChange();
    setMenuOpenMinutes(false);
    setValue("minutes", selectedOption ? selectedOption.value : null, {
      shouldValidate: true,
    });
  };

  const handleDateChange = (date: string) => {
    setValue("date", date);
    handleInputChange();
  };

  return {
    t,
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    watch,
    trigger,
    errors,
    confirmDelete,
    confirmSave,
    hourOptions,
    minuteOptions,
    menuOpenHours,
    setMenuOpenHours,
    menuOpenMinutes,
    setMenuOpenMinutes,
    inputChanged,
    handleInputClick,
    handleHourInputChange,
    handleMinuteInputChange,
    handleHourSelectChange,
    handleMinuteSelectChange,
    handleDateChange,
    handleInputChange,
  };
};

export default useEditEventModal;
