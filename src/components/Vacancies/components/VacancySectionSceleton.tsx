import { FC } from "react";
import Skeleton from "../../Sceleton/Sceleton.tsx";
import VacancyCardSkeleton from "./VacancyCardSceleton";

const VacancySectionSkeleton: FC = () => {
    return (
        <section>
            <div className="w-[100px] h-[40px] rounded-tl-lg rounded-tr-lg px-3 py-[6px] bg-color9">
                {/* <Skeleton width="100%" height="28px" className="rounded-md" /> */}
            </div>

            <div className="flex w-full justify-center rounded-[0px_12px_12px_12px] border-4 border-solid p-6 border-color9">
                <div className="section-content flex w-full items-center gap-4">

                    {/* Стрілка вліво (скелетон) */}
                    <Skeleton width="24px" height="24px" className="rounded-full" />

                    <div className="w-full flex flex-nowrap gap-5">
                        <VacancyCardSkeleton />
                    </div>

                    {/* Стрілка вправо (скелетон) */}
                    <Skeleton width="24px" height="24px" className="rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default VacancySectionSkeleton;
