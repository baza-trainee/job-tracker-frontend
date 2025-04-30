import Skeleton from "../../../Sceleton/Sceleton";

const StatisticsCardSkeleton = () => {
  return (
    <div className="flex h-[77px] w-[calc(50%-6px)] flex-col items-center justify-center gap-1 rounded-2xl bg-color9-transparent px-[29px] py-[6px] text-center md:h-[67px] md:w-[170px] md:p-1 xl:h-[128px] xl:w-[169px] xl:gap-1 xl:px-6 xl:py-4 2xl:h-[139px] 2xl:w-[192px] 2xl:gap-1 2xl:px-[35px] 2xl:py-4 3xl:h-[193px] 3xl:w-[259px] 3xl:gap-3 3xl:px-11 3xl:py-8">
      <Skeleton width="80%" height="20%" />
      <Skeleton width="70%" height="20%" className="mdOnly:hidden" />
      <Skeleton width="30px" height="25%" className="mt-2 shrink-0 xl:mt-3" />
    </div>
  );
};

const PredictionCardSkeleton = () => {
  return (
    <div className="flex h-[97px] w-full flex-col gap-2 rounded-2xl bg-color9-transparent p-2 md:h-[142px] md:w-[348px] md:gap-1 md:p-4 xl:h-[128px] xl:w-[395px] xl:gap-2 2xl:h-[139px] 2xl:w-[447px] 2xl:gap-2 2xl:p-4 3xl:h-[193px] 3xl:w-[608px] 3xl:gap-3 3xl:px-8 3xl:py-6">
      <Skeleton width="55%" height="15%" />
      <div className="flex flex-1 flex-col gap-1 3xl:gap-2">
        <Skeleton width="100%" height="22%" />
        <Skeleton width="100%" height="22%" />
        <Skeleton width="80%" height="22%" className="" />
      </div>
    </div>
  );
};

const StatisticsPanelSkeleton = () => {
  return (
    <div className="flex w-full flex-wrap gap-y-2 md:justify-between">
      <div className="flex flex-wrap gap-x-3 gap-y-2 smPlus:w-full md:gap-2 xl:w-auto xl:gap-3 2xl:gap-5 2xl:self-start 3xl:gap-8 mdOnly:w-1/2">
        <StatisticsCardSkeleton />
        <StatisticsCardSkeleton />
        <StatisticsCardSkeleton />
        <StatisticsCardSkeleton />
      </div>

      <PredictionCardSkeleton />
    </div>
  );
};
export default StatisticsPanelSkeleton;
