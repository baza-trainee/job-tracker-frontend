import { FC, ReactNode, useState, useRef, useEffect } from "react";
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
    const contentRef = useRef<HTMLDivElement>(null);
    const [hasScroll, setHasScroll] = useState(false);

    useEffect(() => {
        const element = contentRef.current;

        if (element) {
            const checkScroll = () => {
                setHasScroll(element.scrollHeight > element.clientHeight);
            }

            checkScroll();

            // Використовуємо MutationObserver для відстеження змін у DOM
            const observer = new MutationObserver(() => {
                checkScroll();
            });

            // Спостерігаємо за змінами у дочірніх елементах контейнера
            observer.observe(element, {
                childList: true, // Відстежуємо додавання/видалення дочірніх елементів
                subtree: true, // Відстежуємо зміни на рівні всіх вкладених елементів
            });

            window.addEventListener("resize", checkScroll);

            return () => {
                window.removeEventListener("resize", checkScroll);
            }
        };
    }, [])

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
                <div ref={contentRef} className={clsx("h-auto max-h-[60vh] overflow-y-auto scrollbar-y", { "pr-4": hasScroll, })}>
                    <div className="flex w-[1184px] flex-wrap justify-start gap-6 ">
                        {validChildren}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VacancySectionBox;
