export type ValuePiece = Date | null;

export type ValueCalendar = ValuePiece | [ValuePiece, ValuePiece];

export type JobCalendarProps = {
  changeDate: (e: ValueCalendar) => void;
  dateState: ValueCalendar;
};
