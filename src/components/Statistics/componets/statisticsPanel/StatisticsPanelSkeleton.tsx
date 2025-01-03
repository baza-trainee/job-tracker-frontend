import Skeleton from "../../../Sceleton/Sceleton";

const StatisticsCardSkeleton = () => {
  return (
    <div className="flex h-[139px] w-[192px] flex-col items-center justify-center gap-2 rounded-2xl bg-color9-transparent px-[35px] py-4 text-center">
      <Skeleton width="80%" height="20px" />
      <Skeleton width="70%" height="20px" className="" />
      <Skeleton width="39px" height="32px" className="mt-3 shrink-0" />
    </div>
  );
};

const PredictionCardSkeleton = () => {
  return (
    <div className="flex h-[139px] w-[447px] flex-col gap-2 rounded-2xl bg-color9-transparent p-4 text-center">
      <Skeleton width="50%" height="18px" />
      <div className="flex flex-col gap-1">
        <Skeleton width="90%" height="20px" />
        <Skeleton width="90%" height="20px" />
        <Skeleton width="80%" height="20px" className="" />
      </div>
    </div>
  );
};

const StatisticsPanelSkeleton = () => {
  return (
    <div className="flex w-full justify-between gap-[25px]">
      <div className="flex gap-5 self-start">
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
