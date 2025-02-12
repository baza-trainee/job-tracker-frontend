import { FC, memo } from "react";
import { cn } from "../../../../utils/utils.ts";

import { StatisticsCardProps } from "./statPanel.types.ts";

const StatisticsCard: FC<StatisticsCardProps> = memo(
  ({ cardName, cardQuantity }) => {
    return (
      <li
        className={cn(
          "flex h-[77px] w-[134px] flex-col items-center justify-center rounded-2xl bg-color5 px-[29px] py-[6px] text-center even:bg-color1 md:h-[139px] md:w-[192px] md:gap-1 md:px-[35px] md:py-4"
        )}
      >
        <h3 className="text-sm leading-[135%] md:text-xl">{cardName}</h3>
        <p className="text-xl font-semibold leading-[135%] md:text-[32px]">
          {cardQuantity}
        </p>
      </li>
    );
  }
);

export default StatisticsCard;
