import { FC, memo } from "react";
import { cn } from "../../../../utils/utils.ts";

import { StatisticsCardProps } from "./statPanel.types.ts";

const StatisticsCard: FC<StatisticsCardProps> = memo(
  ({ cardName, cardQuantity }) => {
    return (
      <li
        className={cn(
          "flex h-[77px] w-[134px] flex-col items-center justify-center rounded-2xl bg-color5 px-[29px] py-[6px] text-center even:bg-color1 md:h-[67px] md:w-[170px] md:p-1 xl:h-[128px] xl:w-[169px] xl:gap-1 xl:px-6 xl:py-4 2xl:h-[139px] 2xl:w-[192px] 2xl:gap-1 2xl:px-[35px] 2xl:py-4 3xl:h-[193px] 3xl:w-[259px] 3xl:gap-3 3xl:px-11 3xl:py-8"
        )}
      >
        <h3 className="text-sm leading-[135%] md:text-base xl:text-xl 3xl:text-[28px] 3xl:leading-normal">
          {cardName}
        </h3>
        <p className="text-xl font-semibold leading-[135%] xl:text-[28px]">
          {cardQuantity}
        </p>
      </li>
    );
  }
);

export default StatisticsCard;
