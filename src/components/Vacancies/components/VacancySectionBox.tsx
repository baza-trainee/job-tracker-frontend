import { FC, useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../../store/hook.ts";
import clsx from "clsx";
import { VacancySectionProps } from "./VacancySection.tsx";
import { selectTheme } from "../../../store/slices/themeSlice/themeSelector.ts";

interface VacancySectionBoxProps extends VacancySectionProps {
  isSorted?: boolean;
  isArchived?: boolean;
}

const VacancySectionBox: FC<VacancySectionBoxProps> = ({
  titleSection,
  colorSectionBorder,
  colorSectionBG,
  children = [],
  isSorted = false,
  isArchived = false,
}) => {
  const validChildren = Array.isArray(children) ? children : [children];
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const darkTheme = useAppSelector(selectTheme);

  useEffect(() => {
    const element = contentRef.current;

    if (element) {
      const checkScroll = () => {
        setHasScroll(element.scrollHeight > element.clientHeight);
      };

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
      };
    }
  }, []);

  const maxHeightClass =
    isSorted || isArchived ? "max-h-[60vh]" : "max-h-[399.2px]";
  // console.log("isArchived", isArchived);
  // console.log("isSorted", isSorted);
  // console.log("status", maxHeightClass);

  const classNameSectionBackground = darkTheme
    ? `${colorSectionBG}-transparent`
    : colorSectionBG;

  return (
    <section className="VacancySectionBox flex flex-col text-textBlack">
      {/* Заголовок секції */}
      <div
        className={clsx(
          "w-fit rounded-tl-lg rounded-tr-lg px-3 py-[6px] text-xl font-medium",
          classNameSectionBackground
        )}
      >
        {titleSection}
      </div>

      {/* Контейнер карток */}
      <div
        className={clsx(
          "box-border flex w-full justify-center rounded-[0px_12px_12px_12px]",
          "border-2 border-solid p-3 md:border-4 md:px-3 md:py-6",
          colorSectionBorder
        )}
      >
        <div
          ref={contentRef}
          className={clsx(
            "scrollbar-y-sectionbox h-auto overflow-y-auto",
            { "pr-[4px] md:pr-4": hasScroll },
            maxHeightClass
          )}
        >
          <div
            className={clsx(
              "flex flex-wrap justify-start",
              "box-border w-[238px] smPlus:w-[436px] md:w-[620px] xl:w-[1016px] 2xl:w-[1164px] 3xl:w-[1660px]",
              "gap-x-3 gap-y-2 xl:gap-x-5 xl:gap-y-4 2xl:gap-y-6 3xl:gap-x-6"
            )}
          >
            {validChildren}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VacancySectionBox;
