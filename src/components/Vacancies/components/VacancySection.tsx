import { FC, ReactNode, useRef, useState, useEffect } from "react";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

type VacancySectionProps = {
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

  if (validChildren.length <= 6) {
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

  const handleScrollLeft = () => {
    // console.log("Left arrow clicked");
    containerRef.current?.scrollBy({
      left: -298, // Кількість пікселів для скролу
      behavior: "smooth", // Плавний скрол
    });
  };

  const handleScrollRight = () => {
    // console.log("Right arrow clicked");
    containerRef.current?.scrollBy({
      left: 298,
      behavior: "smooth",
    });
  };

  return (
    <section className="text-textBlack">
      <div
        className={clsx(
          "w-fit rounded-tl-lg rounded-tr-lg px-3 py-[6px] text-xl font-medium",
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
        <div className="section-contant flex w-full items-center gap-4">
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
              "scrollbar flex w-full flex-col gap-5 overflow-x-auto",
              { "pb-5": hasScroll }
            )}
          >
            {/* Перший ряд, непарні картки */}
            <div className="flex flex-nowrap gap-5">
              {row1.length > 0 ? row1 : <p>Немає вакансій</p>}
            </div>

            {/* Другий ряд, парні картки */}
            {row2.length > 0 && (
              <div className="flex flex-nowrap gap-5">
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
