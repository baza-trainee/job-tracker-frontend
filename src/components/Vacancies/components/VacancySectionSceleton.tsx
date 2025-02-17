import { FC } from "react";
import Skeleton from "../../Sceleton/Sceleton.tsx";
import VacancyCardSkeleton from "./VacancyCardSceleton";

const VacancySectionSkeleton: FC = () => {
  return (
    <section>
      <div className="h-[40px] w-[100px] rounded-tl-lg rounded-tr-lg bg-color9 px-3 py-[6px]">
        {/* <Skeleton width="100%" height="28px" className="rounded-md" /> */}
      </div>

      <div className="flex w-full justify-center rounded-[0px_12px_12px_12px] border-4 border-solid border-color9 p-6">
        <div className="section-content flex w-full items-center gap-4">
          {/* Стрілка вліво (скелетон) */}
          <Skeleton
            width="24px"
            height="24px"
            className="hidden rounded-full md:block"
          />

          <div className="flex w-full flex-nowrap gap-5">
            <VacancyCardSkeleton />
          </div>

          {/* Стрілка вправо (скелетон) */}
          <Skeleton
            width="24px"
            height="24px"
            className="hidden rounded-full md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default VacancySectionSkeleton;
