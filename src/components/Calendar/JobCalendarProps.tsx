export type ValuePiece = Date | null;

export type ValueCalendarProps = ValuePiece | [ValuePiece, ValuePiece];

export type JobCalendarProps = {
  changeDate: (e: ValueCalendarProps) => void;
  dateState: ValueCalendarProps;
};
