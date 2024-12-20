import { FC, ReactNode, useState, useRef } from "react";
import clsx from "clsx";

type VacancySectionProps = {
    titleSection: string;
    colorSectionBorder: string;
    colorSectionBG: string;
    children?: ReactNode;
};

const VacancySectionBox: FC<VacancySectionProps> = ({
    titleSection,
    colorSectionBorder,
    colorSectionBG,
    children = [],
}) => {
    const validChildren = Array.isArray(children) ? children : [children];

    // const [hasScroll, setHasScroll] = useState(false);

    return (
        <section className="text-textBlack flex flex-col">
            {/* Заголовок секції */}
            <div
                className={clsx(
                    "w-fit rounded-tl-lg rounded-tr-lg px-3 py-[6px] text-xl font-medium",
                    colorSectionBG
                )}
            >
                {titleSection}
            </div>

            {/* Контейнер карток */}
            <div
                className={clsx(
                    "flex w-full justify-center rounded-[0px_12px_12px_12px] border-4 border-solid p-6",
                    colorSectionBorder
                )}
            >
                <div className="h-auto max-h-[60vh] overflow-y-auto scrollbar-y pr-4">
                    <div className="flex w-[1184px] flex-wrap justify-start gap-6 ">
                        {validChildren}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VacancySectionBox;
