import { FC } from "react";

// import { cn } from "../../../utils/utils.ts";

import StatisticsCard from "./StatisticsCard.tsx";
import PanelList from "./panelList.tsx";
import { cn } from "../../../../utils/utils.ts";

// type StatisticsCardProps = {
//   cardName: string;
//   cardQuantity: number;
// };

const StatisticsPanel: FC = ({}) => {
  return (
    <ul className={cn("flex gap-5")}>
      {PanelList().map((item, index) => {
        return (
          <StatisticsCard
            key={index}
            cardName={item.cardName}
            cardQuantity={item.cardQuantity}
          />
        );
      })}
    </ul>
  );
};

export default StatisticsPanel;
