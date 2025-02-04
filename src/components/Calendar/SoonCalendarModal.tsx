import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";


type SoonCalendarModalProps = {
    // onDateChange: (date: Date) => void;
};

export const SoonCalendarModal: React.FC<SoonCalendarModalProps> = ({
    // onDateChange,
}) => {
    const { i18n } = useTranslation();

    return (
        <div className="statistics-calendar w-[468px] h-[514px] box-border bg-backgroundTertiary px-6 py-4 rounded-[20px]">
            <Calendar
                view="month"
                locale={i18n.language}
                // onChange={(date) => {
                    // console.log("Клік на дату (день):", date);
                    // onDateChange(date as Date);
                // }}
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

