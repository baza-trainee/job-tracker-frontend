import clsx from "clsx";

interface DatasetItem {
  label: string;
  backgroundColor: string;
}

interface CustomLegendProps {
  datasets: DatasetItem[];
  className?: string;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ datasets, className }) => {
  return (
    <div
      className={clsx(
        "flex w-fit flex-wrap gap-3 rounded-xl bg-backgroundTertiary text-textBlack md:gap-12",
        "p-3 md:px-6 2xl:py-4 3xl:py-6",
        "mt-1 md:mt-3 xl:mt-4",
        className
      )}
    >
      {datasets.map((dataset, index) => (
        <div key={index} className="flex h-fit items-center">
          <div
            style={{ backgroundColor: dataset.backgroundColor }}
            className="mr-1 h-[38px] w-[47px] rounded md:mr-[14px] md:h-[30px] md:w-[70px]"
          ></div>
          <span className="max-w-[70px] text-sm leading-none md:max-w-full md:text-base 3xl:text-xl">
            {dataset.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
