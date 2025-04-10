import Skeleton from "@/components/Sceleton/Sceleton";

import { FC } from "react";

const NoteCardSceleton: FC = () => {
  return (
    <div className="w-full font-nunito text-base leading-[135%]">
      <div className="h-10 w-[118px] truncate rounded-t-xl bg-backgroundSecondary px-3 py-[6px] font-medium md:w-[141px] md:text-xl xl:w-[149px] xl:px-4"></div>
      <div className="flex h-auto flex-col justify-between rounded-xl rounded-tl-none border-4 border-backgroundSecondary p-3">
        <div className="mb-6 flex flex-col gap-1">
          <Skeleton width="100%" height="17px" />
          <Skeleton width="100%" height="17px" />
          <Skeleton width="100%" height="17px" />
          <Skeleton width="100%" height="17px" />
          <Skeleton width="100%" height="17px" />
          <Skeleton width="100%" height="17px" />
          <Skeleton width="60%" height="17px" />
        </div>

        <div className="flex items-end justify-between">
          <Skeleton width="75px" height="16px" />
          <div className="flex gap-3">
            <Skeleton width="24px" height="24px" />
            <Skeleton width="24px" height="24px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCardSceleton;
