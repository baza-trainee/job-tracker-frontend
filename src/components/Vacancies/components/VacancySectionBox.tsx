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
  const [isIOS, setIsIOS] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
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

  useEffect(() => {
    // const ua = window.navigator.userAgent;
    // /.../i — це регулярний вираз: // iPhone|iPad|iPod — означає "будь-яке з трьох" // i — означає "ігноруй регістр"
    // const isIOSDevice = /iPad|iPhone|iPod/i.test(ua) && !("MSStream" in window);

    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    const isFirefoxBrowser = ua.includes("firefox");

    setIsIOS(isIOSDevice);
    setIsFirefox(isFirefoxBrowser);
  }, []);

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
        <div className="soon-scroll-wrapper relative">
          <div
            ref={contentRef}
            className={clsx(
              "scrollbar-y-sectionbox h-auto overflow-y-auto",
              { "pr-[12px] md:pr-4": hasScroll },
              isFirefox && "scroll-soon-firefox",
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
          {/* подумати про створення хука useScrollPlatform() або зробити загальний компонент ScrollWrapper */}
          {(isIOS || isFirefox) && (
            <div className="soon-scroll__custom-ios pointer-events-none absolute right-[2px] top-0 h-full w-[6px] rounded-md bg-[#c0c0c0] opacity-70" />
          )}
        </div>
      </div>
    </section>
  );
};

export default VacancySectionBox;
