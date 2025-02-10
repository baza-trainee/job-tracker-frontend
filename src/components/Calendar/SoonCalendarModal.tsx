import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";

type SoonCalendarModalProps = {
  onSelectDate?: (date: string) => void;
};

export const SoonCalendarModal: React.FC<SoonCalendarModalProps> = ({
  onSelectDate,
}) => {
  const { i18n } = useTranslation();

  const handleDateChange = (selectedDate: Date) => {
    // const formattedDate = selectedDate.toISOString().split("T")[0]; // Перетворюємо в "YYYY-MM-DD"
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Додаємо +1, бо місяці у JS від 0 до 11
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`; // Отримуємо YYYY-MM-DD у локальному часі
    console.log("Обрана дата:", formattedDate);

    if (onSelectDate) {
      onSelectDate(formattedDate);
    }
  };

  return (
    <div className="statistics-calendar box-border h-[514px] w-[468px] rounded-[20px] bg-backgroundTertiary px-6 py-4">
      <Calendar
        view="month"
        locale={i18n.language}
        onChange={(date) => {
          console.log("Клік на дату (день):", date);
          handleDateChange(date as Date);
        }}
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
