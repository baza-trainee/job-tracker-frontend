import { FC } from "react";
import Skeleton from "../../Sceleton/Sceleton.tsx";

const VacancyCardSkeleton: FC = () => {
  return (
    <div className="w-[278px] h-[94px] shrink-0 p-3 rounded-xl bg-gray-200 flex items-center gap-2">
      <Skeleton width="40px" height="40px" className="shrink-0" />
      <div className="w-full flex flex-col gap-2">
        <Skeleton width="60%" height="16px" />
        <Skeleton width="80%" height="12px" />
      </div>
    </div>
  );
};

export default VacancyCardSkeleton;