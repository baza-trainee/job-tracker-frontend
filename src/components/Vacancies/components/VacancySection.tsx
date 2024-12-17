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

  const [isScrollLeftDisabled, setIsScrollLeftDisabled] = useState(true)
  const [isScrollRightDisabled, setIsScrollRightDisabled] = useState(true)
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
  }

  const checkRowLayout = () => {
    const container = containerRef.current;

    if (container) {
      const contentWidth = container.scrollWidth; // увесь вміст секції
      const containerWidth = container.clientWidth; // видимий вміст секції

      setIsTwoRows(contentWidth > containerWidth);
    }
  }

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

      <div className={clsx(
        "w-fit px-3 py-[6px] text-xl font-medium rounded-tl-lg rounded-tr-lg",
        colorSectionBG)}>
        {titleSection}
      </div>

      <div className={clsx("w-full flex justify-center p-6 border-4 border-solid rounded-[0px_12px_12px_12px]",
        colorSectionBorder)}>

        <div className="w-full flex gap-4 items-center section-contant">
          <button
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
            disabled={isScrollLeftDisabled}
            className={clsx("transition", { "opacity-50 cursor-not-allowed": isScrollLeftDisabled })}
          >
            <Icon id="arrow-left" className="w-6 h-6" />
          </button>

          <div
            ref={containerRef}
            className={clsx("w-full flex flex-col gap-5 overflow-x-auto scrollbar test", {"pb-5": hasScroll})}
          >
            {/* Перший ряд, непарні картки */}
            <div className="flex gap-5 flex-nowrap">
              {row1.length > 0 ? row1 : <p>Немає вакансій</p>}
            </div>

            {/* Другий ряд, парні картки */}
            {row2.length > 0 && (
              <div className="flex gap-5 flex-nowrap">
                {row2.length > 0 ? row2 : null}
              </div>
            )}
          </div>

          <button
            onClick={handleScrollRight}
            aria-label="Scroll Right"
            disabled={isScrollRightDisabled}
            className={clsx("transition", { "opacity-50 cursor-not-allowed": isScrollRightDisabled, })}
          >
            <Icon id="arrow-right" className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  )
};

export default VacancySection;
