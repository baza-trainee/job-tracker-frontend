import { FC } from "react";

import { cn } from "../../../../utils/utils.ts";

type StatisticsCardProps = {
  cardName: string;
  cardQuantity: any;
};

const StatisticsCard: FC<StatisticsCardProps> = ({
  cardName,
  cardQuantity,
}) => {
  return (
    <li
      className={cn(
        "flex h-[139px] w-[192px] flex-col items-center justify-center gap-1 rounded-2xl bg-color5 px-[35px] py-4 text-center even:bg-color1"
      )}
    >
      <h3 className="text-xl leading-[135%]">{cardName}</h3>
      <p className="text-[32px] font-semibold leading-[135%]">{cardQuantity}</p>
    </li>
  );
};

export default StatisticsCard;
