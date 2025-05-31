import { FC, ReactNode, useRef, useState, useEffect } from "react";
// import { useAppSelector } from "../../../store/hook.ts";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";
// import { selectTheme } from "../../../store/slices/themeSlice/themeSelector.ts";

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
  const [hasScroll, setHasScroll] = useState(false);
  const [row1, setRow1] = useState<ReactNode[]>([]);
  const [row2, setRow2] = useState<ReactNode[]>([]);
  // const darkTheme = useAppSelector(selectTheme);

  const validChildren = Array.isArray(children) ? children : [children];

  const layoutConfig = [
    { min: 1920, max: Infinity, maxLength: 10, rowSize: 5 },
    { min: 1280, max: 1920, maxLength: 8, rowSize: 4 },
    { min: 768, max: 1280, maxLength: 6, rowSize: 3 },
    { min: 600, max: 768, maxLength: 4, rowSize: 2 },
  ];

  function updateLayout() {
    const width = window.innerWidth;
    const length = validChildren.length;

    const config = layoutConfig.find(
      ({ min, max }) => width >= min && width < max
    );

    if (config) {
      if (length <= config.maxLength) {
        // Стандартний flex-розподіл, коли картки вміщаються
        setRow1(validChildren.slice(0, config.rowSize));
        setRow2(validChildren.slice(config.rowSize, config.maxLength));
      } else {
        // Альтернативний режим (парні/непарні), коли карток багато
        setRow1(validChildren.filter((_, index) => index % 2 === 0));
        setRow2(validChildren.filter((_, index) => index % 2 !== 0));
      }
    } else {
      // Для мобільних (менше 768) та нестандартних випадків – парні/непарні
      setRow1(validChildren.filter((_, index) => index % 2 === 0));
      setRow2(validChildren.filter((_, index) => index % 2 !== 0));
    }
  }

  // Функція для відслідковування активності/задізейбленності стрілочок
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

  // Викликаємо оновлення макету при зміні розміру екрану
  useEffect(() => {
    const handleResize = () => {
      updateLayout();
      checkScrollPosition();
    };

    updateLayout(); // виклик один раз при першому рендері після завантаження

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [children]);

  // useEffect(() => {
  //   const container = containerRef.current;

  //   if (container) {
  //     const resizeObserver = new ResizeObserver(() => {
  //       checkScrollPosition();
  //     });

  //     resizeObserver.observe(container);
  //     container.addEventListener("scroll", checkScrollPosition);

  //     checkScrollPosition();

  //     return () => {
  //       resizeObserver.unobserve(container);
  //       container.removeEventListener("scroll", checkScrollPosition);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // MutationObserver — реагує на додавання/видалення DOM-елементів
    const mutationObserver = new MutationObserver(() => {
      // Використовуємо requestAnimationFrame — чекаємо, поки DOM оновиться
      requestAnimationFrame(() => {
        checkScrollPosition();
      });
    });

    mutationObserver.observe(container, {
      childList: true, // Спостерігати за змінами у дочірніх елементах
      subtree: true, // У тому числі вкладених елементів (наприклад картки в рядках)
    });

    // ResizeObserver — реагує на зміну розміру контейнера (якщо щось розтягується)
    const resizeObserver = new ResizeObserver(() => {
      checkScrollPosition();
    });

    resizeObserver.observe(container);

    // Слухаємо скролл вручну (Scroll listener — для зміни стану кнопок (вліво/вправо))
    container.addEventListener("scroll", checkScrollPosition);

    // Перша перевірка (ініціальна)
    checkScrollPosition();

    // Очищення після демонтажу
    return () => {
      mutationObserver.disconnect();
      resizeObserver.unobserve(container);
      container.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // Кількість пікселів для ширини кроків по горизонтального скроллу (ширина картки + відступ)
  const getScrollAmount = () => {
    if (window.innerWidth >= 1920) return 312.8 + 20;
    if (window.innerWidth >= 1440) return 276 + 20;
    if (window.innerWidth >= 1280) return 239 + 16;
    if (window.innerWidth >= 768) return 198.67 + 12;
    if (window.innerWidth >= 576) return 212 + 12;
    return 232 + 12;
  };

  const handleScrollRight = () => {
    // console.log("Right arrow clicked");
    const scrollAmount = getScrollAmount();
    containerRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth", // Плавний скролл
    });
  };

  const handleScrollLeft = () => {
    // console.log("Left arrow clicked");
    const scrollAmount = getScrollAmount();
    containerRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  // const classNameSectionBackground = darkTheme
  //   ? `${colorSectionBG}-transparent`
  //   : colorSectionBG;

  return (
    <section className="text-textBlack">
      <div
        className={clsx(
          "w-fit rounded-tl-lg rounded-tr-lg px-3 py-[6px] text-xl font-medium shadow-section_shadow",
          // classNameSectionBackground
          colorSectionBG
        )}
      >
        {titleSection}
      </div>
      <div
        className={clsx(
          "box-border flex w-full justify-center rounded-[0px_12px_12px_12px] border-2 border-solid md:border-2 xl:border-4",
          "px-1 py-6 smPlus:px-4 xl:p-6",
          colorSectionBorder
        )}
      >
        <div className="box-border flex w-full items-center gap-1 smPlus:w-[500px] smPlus:gap-2 md:w-full xl:gap-4">
          <button
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
            disabled={isScrollLeftDisabled}
            className={clsx("transition", {
              // "opacity-50": isScrollLeftDisabled,
            })}
          >
            <Icon
              id="arrow-left"
              className={clsx(
                "h-3 w-3 fill-textBlack duration-300 hover:fill-iconHover active:fill-iconHover smPlus:h-6 smPlus:w-6",
                {
                  "fill-color6 hover:fill-color6 dark:hover:fill-color6":
                    isScrollLeftDisabled,
                }
              )}
            />
          </button>

          <div
            ref={containerRef}
            className={clsx(
              "scrollbar box-border flex w-full flex-col overflow-x-auto",
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
              // "opacity-50": isScrollRightDisabled,
            })}
          >
            <Icon
              id="arrow-right"
              className={clsx(
                "h-3 w-3 fill-textBlack duration-300 hover:fill-iconHover active:fill-iconHover dark:hover:fill-iconHover smPlus:h-6 smPlus:w-6",
                {
                  "fill-color6 hover:fill-color6 dark:hover:fill-color6":
                    isScrollRightDisabled,
                }
              )}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VacancySection;
