import { FC } from "react";
import Skeleton from "../../Sceleton/Sceleton.tsx";
import clsx from "clsx";

const VacancyCardSkeleton: FC = () => {
  return (
    <div
      className={clsx(
        "flex h-[96px] shrink-0 flex-col gap-2 rounded-xl bg-color9-transparent",
        "px-2 py-3 xl:px-3",
        "w-[232px] md:w-[200px] xl:w-[241px] 2xl:w-[278px] 3xl:w-[314px]"
      )}
    >
      <Skeleton width="80%" height="16px" />
      <Skeleton width="60%" height="12px" className="mb-2" />
      <div className="flex w-full items-center justify-start gap-2">
        <Skeleton width="24px" height="24px" className="shrink-0" />
        <Skeleton width="30%" height="14px" />
        <Skeleton width="40%" height="14px" />
      </div>
    </div>
  );
};

export default VacancyCardSkeleton;
