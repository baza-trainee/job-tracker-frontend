import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";
import { useAppSelector } from "../../store/hook.ts";
import { selectEventData } from "../../store/slices/modalSlice/selectors.ts";
import clsx from "clsx";

type SoonCalendarModalProps = {
  onSelectDate?: (date: string) => void;
};

export const SoonCalendarModal: React.FC<SoonCalendarModalProps> = ({
  onSelectDate,
}) => {
  const { i18n } = useTranslation();
  const eventData = useAppSelector(selectEventData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (eventData?.date) {
      const parsedDate = new Date(eventData.date);
      setSelectedDate(parsedDate);
    }
  }, [eventData]);

  const handleDateChange = (selectedDate: Date) => {
    setSelectedDate(selectedDate);

    // const formattedDate = selectedDate.toISOString().split("T")[0]; // Перетворюємо в "YYYY-MM-DD"
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Додаємо +1, бо місяці у JS від 0 до 11
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`; // Отримуємо YYYY-MM-DD у локальному часі
    // console.log("Обрана дата:", formattedDate);

    if (onSelectDate) {
      onSelectDate(formattedDate);
    }
  };

  return (
    <div
      className={clsx(
        "statistics-calendar soon-calendar-modal",
        "box-border h-[385px] w-[356px] rounded-[20px] bg-backgroundTertiary p-2 3xl:h-[514px] 3xl:w-[468px] 3xl:px-6 3xl:py-4"
      )}
    >
      <Calendar
        view="month"
        locale={i18n.language}
        onChange={(date) => {
          // console.log("Клік на дату (день):", date);
          handleDateChange(date as Date);
        }}
        value={selectedDate}
        className="statistics-calendar__day"
        nextLabel={<Icon id={"arrow-right"} className="size-6" />}
        prevLabel={<Icon id={"arrow-left"} className="size-6" />}
        formatMonthYear={(locale, date) =>
          `${date.toLocaleDateString(locale, { month: "long" })} ${date.getFullYear()}`
        }
      />
    </div>
  );
};

export default SoonCalendarModal;
