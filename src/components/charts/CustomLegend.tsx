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
        "flex w-full flex-col flex-wrap rounded-xl bg-backgroundTertiary p-3 md:rounded-2xl md:px-6 2xl:py-4",
        className
      )}
    >
      {data.labels.map((label, index) => (
        <div key={index} className="flex h-fit items-center">
          <div
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index],
            }}
            className="mr-1 h-[30px] w-[30px] rounded md:mr-2 md:w-[70px]"
          ></div>
          <span className="max-w-24 text-sm leading-none md:max-w-full md:text-base 3xl:text-xl">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
