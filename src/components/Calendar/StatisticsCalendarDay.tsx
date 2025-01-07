// import React, { useState } from "react";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";
// import "./StatisticsCalendar.css";
// import { JobCalendarProps } from "./JobCalendarProps";


// export const StatisticsCalendarDay = ({ changeDate, dateState }: JobCalendarProps) => {
export const StatisticsCalendarDay = () => {
    return (
        <div className="statistics-calendar w-[356px] box-border">
            <Calendar
                // onChange={changeDate}
                // value={dateState}
                view="month" // Відображає місяць і календарні дні
                className="custom-calendar"
                nextLabel={<Icon id={"arrow-right"} className="size-6" />}
                prevLabel={<Icon id={"arrow-left"} className="size-6" />}
                // tileClassName="text-center py-4 px-6" // Стиль клітинок
            />
        </div>
    );
};

export default StatisticsCalendarDay;
