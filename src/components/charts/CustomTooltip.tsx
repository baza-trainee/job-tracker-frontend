import { cn } from "../../utils/utils";

const CustomTooltip: React.FC<{
  title: string;
  percent: string;
  className?: string;
  position: { x: number; y: number };
  visible: boolean;
}> = ({ title, percent, className, position, visible }) => {
  return (
    <div
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translate(-50%, -50%)",
        opacity: visible ? 1 : 0,
        transition:
          "top 0.3s ease-in-out, left 0.3s ease-in-out, opacity 0.7s ease-in-out", 
      }}
      className={cn(
        "pointer-events-none absolute z-50 flex cursor-default flex-col items-center gap-1 rounded-xl rounded-bl-none border border-iconHover bg-backgroundMain px-3 py-2 font-nunito text-sm font-bold transition-transform",
        className
      )}
    >
      <div>{title}</div>
      <div>{percent}</div>
    </div>
  );
};

export default CustomTooltip;
