import { FC } from "react";
import Skeleton from "../../Sceleton/Sceleton.tsx";

const VacancyCardSkeleton: FC = () => {
  return (
    <div className="w-[278px] h-[96px] shrink-0 p-3 rounded-xl bg-color9-transparent flex flex-col gap-2">
      <Skeleton width="80%" height="16px" />
      <Skeleton width="60%" height="12px" className="mb-2" />      
      <div className="w-full flex items-center justify-start gap-2">
        <Skeleton width="24px" height="24px" className="shrink-0" />
        <Skeleton width="30%" height="14px" />
        <Skeleton width="40%" height="14px" />
      </div>
    </div>
  );
};

export default VacancyCardSkeleton;
