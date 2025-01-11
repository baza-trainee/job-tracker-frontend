import { cn } from "../../utils/utils";

const CustomTooltip: React.FC<{
  title: string;
  percent: string;
  className?: string;
}> = ({ title, percent, className }) => {
  return (
    <div
      className={cn(
        "absolute -top-1/3 left-1/3 z-10 flex flex-col items-center rounded-xl rounded-bl-none border border-iconHover bg-backgroundTertiary px-3 py-2 font-nunito text-sm font-bold leading-[135%]",
        className
      )}
    >
      <div>{title}</div>
      <div>{percent}</div>
    </div>
  );
};

export default CustomTooltip;
