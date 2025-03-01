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
  // const [, setIsTwoRows] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [row1, setRow1] = useState<ReactNode[]>([]);
  const [row2, setRow2] = useState<ReactNode[]>([]);

  const validChildren = Array.isArray(children) ? children : [children];

  // let row1: ReactNode[] = [];
  // let row2: ReactNode[] = [];

  const layoutConfig = [
    { min: 1920, max: Infinity, maxLength: 10, rowSize: 5 },
    { min: 1280, max: 1920, maxLength: 8, rowSize: 4 },
    { min: 768, max: 1280, maxLength: 6, rowSize: 3 },
  ];

  function updateLayout() {
    const width = window.innerWidth;
    const length = validChildren.length;

    const config = layoutConfig.find(
      ({ min, max }) => width >= min && width < max
    );

    if (config) {
      if (length <= config.maxLength) {
        // 📌 Стандартний flex-розподіл, коли картки вміщаються
        setRow1(validChildren.slice(0, config.rowSize));
        setRow2(validChildren.slice(config.rowSize, config.maxLength));
      } else {
        // 📌 Альтернативний режим (парні/непарні), коли карток багато
        setRow1(validChildren.filter((_, index) => index % 2 === 0));
        setRow2(validChildren.filter((_, index) => index % 2 !== 0));
      }
    } else {
      // 📌 Для мобільних (менше 768) та нестандартних випадків – парні/непарні
      setRow1(validChildren.filter((_, index) => index % 2 === 0));
      setRow2(validChildren.filter((_, index) => index % 2 !== 0));
    }
  }

  // Викликаємо оновлення макету при зміні розміру екрану
  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, [children]);

  //одноразово викличемо функцію, щоб встановити початкове розташування карток
  // updateLayout();

  //слухач за зміною розміру екрану
  // window
  //   .matchMedia("(min-width: 0px)")
  //   .addEventListener("change", updateLayout);

  // if (window.innerWidth >= 1920 && validChildren.length <= 10) {
  //   row1 = validChildren.slice(0, 5);
  //   row2 = validChildren.slice(5, 10);
  // } else if (
  //   window.innerWidth >= 1280 &&
  //   window.innerWidth < 1920 &&
  //   validChildren.length <= 8
  // ) {
  //   row1 = validChildren.slice(0, 4);
  //   row2 = validChildren.slice(4, 8);
  // } else if (
  //   window.innerWidth >= 768 &&
  //   window.innerWidth < 1280 &&
  //   validChildren.length <= 6
  // ) {
  //   row1 = validChildren.slice(0, 3);
  //   row2 = validChildren.slice(3, 6);
  // } else {
  //   row1 = validChildren.filter((_, index) => index % 2 === 0);
  //   row2 = validChildren.filter((_, index) => index % 2 !== 0);
  // }

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

  // const checkRowLayout = () => {
  //   const container = containerRef.current;

  //   if (container) {
  //     const contentWidth = container.scrollWidth; // увесь вміст секції
  //     const containerWidth = container.clientWidth; // видимий вміст секції

  //     setIsTwoRows(contentWidth > containerWidth);
  //   }
  // };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const resizeObserver = new ResizeObserver(() => {
        checkScrollPosition();
      });

      resizeObserver.observe(container);
      container.addEventListener("scroll", checkScrollPosition);

      checkScrollPosition();

      return () => {
        resizeObserver.unobserve(container);
        container.removeEventListener("scroll", checkScrollPosition);
      };
    }

    // // відстеження змін розмірів екрану з запуском перевірки скролу
    // const resizeObserver = new ResizeObserver(() => {
    //   checkScrollPosition();
    //   checkRowLayout();
    // });

    // if (container) {
    //   resizeObserver.observe(container);
    //   container.addEventListener("scroll", checkScrollPosition);
    // }

    // checkScrollPosition();
    // checkRowLayout();

    // return () => {
    //   if (container) {
    //     resizeObserver.unobserve(container);
    //     container.removeEventListener("scroll", checkScrollPosition);
    //   }
    // };
  }, []);

  const getScrollAmount = () => {
    if (window.innerWidth >= 1920) return 314 + 20;
    if (window.innerWidth >= 1440) return 278 + 20;
    if (window.innerWidth >= 1280) return 241 + 16;
    if (window.innerWidth >= 768) return 200 + 12;
    return 232 + 12; // Виправити, коли буде дизайн на малі екрани, перевірити, чи працює взагалі
  };

  // const getScrollAmount = () => {
  //   let scrollAmount;
  //   if (window.innerWidth >= 1920) scrollAmount = 314 + 20;
  //   else if (window.innerWidth >= 1440) scrollAmount = 278 + 20;
  //   else if (window.innerWidth >= 1280) scrollAmount = 241 + 16;
  //   else if (window.innerWidth >= 768) scrollAmount = 200 + 12;
  //   else if (window.innerWidth < 768) scrollAmount = 232 + 12;
  //   else scrollAmount = 232 + 12;

  //   console.log("Scroll Amount:", scrollAmount);
  //   console.log("innerWidth:", window.innerWidth);
  //   return scrollAmount;
  // };

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
      // left: -298, // Кількість пікселів для скроллу
      left: -scrollAmount,
      behavior: "smooth", // Плавний скролл
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
      {/* виправити, почекати дизайн для екранів менше 768 (px-1 py-6 md:p-6) */}
      <div
        className={clsx(
          "box-border flex w-full justify-center rounded-[0px_12px_12px_12px] border-2 border-solid px-1 py-6 md:border-2 md:px-4 xl:border-4 xl:p-6",
          colorSectionBorder
        )}
      >
        {/* виправити, почекати дизайн для екранів менше 768 (gap-1 md:gap-4) */}
        <div className="box-border flex w-full items-center gap-1 md:gap-2 xl:gap-4">
          <button
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
            disabled={isScrollLeftDisabled}
            className={clsx("transition", {
              "cursor-not-allowed opacity-50": isScrollLeftDisabled,
            })}
          >
            {/* виправити, почекати дизайн для екранів менше 768 (h-4 w-4 md:h-6 md:w-6) */}
            <Icon id="arrow-left" className="h-3 w-3 md:h-6 md:w-6" />
          </button>

          <div
            ref={containerRef}
            className={clsx(
              "scrollbar box-border flex w-full flex-col overflow-x-auto",
              // "mdOnly:max-w-[624px]", // виправити, необхідність цього стилю під питанням
              { "pb-5": hasScroll },
              "gap-4 md:gap-3 xl:gap-4 2xl:gap-5"
            )}
          >
            {/* Перший ряд, непарні картки */}
            <div className="box-border flex flex-nowrap gap-3 md:gap-3 xl:gap-4 2xl:gap-5">
              {row1.length > 0 ? row1 : <p>Немає вакансій</p>}
            </div>

            {/* Другий ряд, парні картки */}
            {row2.length > 0 && (
              <div className="box-border flex flex-nowrap gap-3 md:gap-3 xl:gap-4 2xl:gap-5">
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
            {/* виправити, почекати дизайн для екранів менше 768 (h-4 w-4 md:h-6 md:w-6) */}
            <Icon id="arrow-right" className="h-3 w-3 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VacancySection;
