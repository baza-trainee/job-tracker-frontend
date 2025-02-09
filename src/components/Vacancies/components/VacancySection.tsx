import { FC, ReactNode, useRef, useState, useEffect } from "react";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

export type VacancySectionProps = {
  titleSection: string;
  colorSectionBorder: string;
  colorSectionBG: string;
  children?: ReactNode;
};

const VacancySection: FC<VacancySectionProps> = ({
  titleSection,
  colorSectionBorder,
  colorSectionBG,
  children = [],
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isScrollLeftDisabled, setIsScrollLeftDisabled] = useState(true);
  const [isScrollRightDisabled, setIsScrollRightDisabled] = useState(true);
  const [, setIsTwoRows] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);

  const validChildren = Array.isArray(children) ? children : [children];

  let row1: ReactNode[] = [];
  let row2: ReactNode[] = [];

  if (window.innerWidth >= 1920 && validChildren.length <= 10) {
    row1 = validChildren.slice(0, 5);
    row2 = validChildren.slice(5, 10);
  } else if (validChildren.length <= 6) {
    row1 = validChildren.slice(0, 4);
    row2 = validChildren.slice(4, 6);
  } else {
    row1 = validChildren.filter((_, index) => index % 2 === 0);
    row2 = validChildren.filter((_, index) => index % 2 !== 0);
  }

  const checkScrollPosition = () => {
    const container = containerRef.current;
    if (container) {
      setHasScroll(container.scrollWidth > container.clientWidth);
      setIsScrollLeftDisabled(container.scrollLeft === 0);
      setIsScrollRightDisabled(
        container.scrollLeft + container.clientWidth >= container.scrollWidth
      );
    }
  };

  const checkRowLayout = () => {
    const container = containerRef.current;

    if (container) {
      const contentWidth = container.scrollWidth; // увесь вміст секції
      const containerWidth = container.clientWidth; // видимий вміст секції

      setIsTwoRows(contentWidth > containerWidth);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    // відстеження змін розмірів екрану з запуском перевірки скролу
    const resizeObserver = new ResizeObserver(() => {
      checkScrollPosition();
      checkRowLayout();
    });

    if (container) {
      resizeObserver.observe(container);
      container.addEventListener("scroll", checkScrollPosition);
    }

    checkScrollPosition();
    checkRowLayout();

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const getScrollAmount = () => {
    if (window.innerWidth >= 1920) return 314 + 20;
    if (window.innerWidth >= 1440) return 278 + 20;
    if (window.innerWidth >= 1280) return 241 + 16;
    return 241 + 16; // Для всіх інших випадків ширини екрану
  };
  
  const handleScrollRight = () => {
    // console.log("Right arrow clicked");
    const scrollAmount = getScrollAmount();
    containerRef.current?.scrollBy({
      // left: 298,
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollLeft = () => {
    // console.log("Left arrow clicked");
    const scrollAmount = getScrollAmount();
    containerRef.current?.scrollBy({
      // left: -298, // Кількість пікселів для скролу
      left: -scrollAmount,
      behavior: "smooth", // Плавний скрол
    });
  };

  return (
    <section className="text-textBlack">
      <div
        className={clsx(
          "w-fit rounded-tl-lg rounded-tr-lg px-3 py-[6px] text-xl font-medium shadow-section_shadow",
          colorSectionBG
        )}
      >
        {titleSection}
      </div>

      <div
        className={clsx(
          "flex w-full justify-center rounded-[0px_12px_12px_12px] border-4 border-solid p-6",
          colorSectionBorder
        )}
      >
        <div className="flex w-full items-center gap-4">
          <button
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
            disabled={isScrollLeftDisabled}
            className={clsx("transition", {
              "cursor-not-allowed opacity-50": isScrollLeftDisabled,
            })}
          >
            <Icon id="arrow-left" className="h-6 w-6" />
          </button>

          <div
            ref={containerRef}
            className={clsx(
              "scrollbar flex w-full flex-col overflow-x-auto",
              { "pb-5": hasScroll },
              "gap-4 xl:gap-4 2xl:gap-5"
            )}
          >
            {/* Перший ряд, непарні картки */}
            <div className="flex flex-nowrap gap-4 xl:gap-4 2xl:gap-5">
              {row1.length > 0 ? row1 : <p>Немає вакансій</p>}
            </div>

            {/* Другий ряд, парні картки */}
            {row2.length > 0 && (
              <div className="flex flex-nowrap gap-4 xl:gap-4 2xl:gap-5">
                {row2.length > 0 ? row2 : null}
              </div>
            )}
          </div>

          <button
            onClick={handleScrollRight}
            aria-label="Scroll Right"
            disabled={isScrollRightDisabled}
            className={clsx("transition", {
              "cursor-not-allowed opacity-50": isScrollRightDisabled,
            })}
          >
            <Icon id="arrow-right" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VacancySection;
