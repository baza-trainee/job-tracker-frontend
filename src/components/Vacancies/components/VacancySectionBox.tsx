import { FC, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { VacancySectionProps } from "./VacancySection.tsx";

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

  return (
    <section className="VacancySectionBox flex flex-col text-textBlack">
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
          "box-border flex w-full justify-center rounded-[0px_12px_12px_12px] border-4 border-solid px-3 py-6",
          colorSectionBorder
        )}
      >
        <div
          ref={contentRef}
          className={clsx("scrollbar-y h-auto max-h-[60vh] overflow-y-auto", {
            "pr-2 md:pr-4": hasScroll,
          })}
        >
          <div
            className={clsx(
              "flex flex-wrap justify-start",
              "box-border w-[232px] md:w-[624px] xl:w-[1024px] 2xl:w-[1172px] 3xl:w-[1666px]",
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
