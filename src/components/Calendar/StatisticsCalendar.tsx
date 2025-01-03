// import React, { useState } from "react";
import Calendar from "react-calendar";
import Icon from "../Icon/Icon";
// import "./StatisticsCalendar.css";
// import { JobCalendarProps } from "./JobCalendarProps";


// export const StatisticsCalendar = ({ changeDate, dateState }: JobCalendarProps) => {
export const StatisticsCalendar = () => {
    return (
        <div className="statistics-calendar">
            <Calendar
                // onChange={changeDate}
                // value={dateState}
                className="custom-calendar"
                nextLabel={<Icon id={"arrow-right"} className="h-6 w-6" />}
                prevLabel={<Icon id={"arrow-left"} className="h-6 w-6" />}
            />
        </div>
    );
};

export default StatisticsCalendar;
