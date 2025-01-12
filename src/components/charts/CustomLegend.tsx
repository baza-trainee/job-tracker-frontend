import { cn } from "../../utils/utils";

interface ChartData {
  labels: string[];
  datasets: {
    data?: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const CustomLegend: React.FC<{ data: ChartData; className?: string }> = ({
  data,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex w-full justify-between gap-6 rounded-2xl bg-backgroundTertiary px-6 py-4",
        className
      )}
    >
      {data.labels.map((label, index) => (
        <div key={index} className="flex items-center">
          <div
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index],
            }}
            className="mr-2 h-[30px] w-[70px] rounded"
          ></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
