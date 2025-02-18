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
        "mx-auto flex h-[180px] w-full flex-col flex-wrap gap-3 rounded-xl bg-backgroundTertiary p-3 md:h-[162px] md:w-[594px] md:gap-5 md:rounded-2xl md:px-6 md:py-4 xl:h-[108px] xl:w-[937px] xl:flex-row xl:justify-center xl:gap-x-7 xl:gap-y-4 2xl:h-fit 2xl:w-full 2xl:justify-between 3xl:w-[1406px] 3xl:p-8",
        className
      )}
      // md:w-[594px]
    >
      {data.labels.map((label, index) => (
        <div key={index} className="flex h-fit items-center">
          <div
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index],
            }}
            className="mr-1 h-[30px] w-[30px] rounded md:mr-2 md:w-[70px]"
          ></div>
          <span className="text-sm leading-[135%] md:text-base 3xl:text-xl">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
