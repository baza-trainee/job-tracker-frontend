import { FC, ReactNode, useRef} from "react";
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

  const validChildren = Array.isArray(children) ? children : [children];

  const row1 = validChildren.filter((_, index) => index % 2 === 0);
  const row2 = validChildren.filter((_, index) => index % 2 !== 0);

  const handleScrollLeft = () => {
    console.log("Left arrow clicked");
    containerRef.current?.scrollBy({
      left: -298, // Кількість пікселів для скролу
      behavior: "smooth", // Плавний скрол
    });
  };

  const handleScrollRight = () => {
    console.log("Right arrow clicked");
    containerRef.current?.scrollBy({
      left: 298,
      behavior: "smooth",
    });
  };

  return (
    <section className={clsx("text-textBlack")} >

      <div className={clsx(
          "w-fit px-3 py-[6px] text-xl font-medium rounded-tl-lg rounded-tr-lg", 
          colorSectionBG)}>
        { titleSection }
      </div>

      <div className={clsx("w-full flex justify-center p-6 border-4 border-solid rounded-[0px_12px_12px_12px]", 
          colorSectionBorder)}>
            
        <div className="w-full flex gap-4 items-center section-contant">
          <button onClick={handleScrollLeft} aria-label="Scroll Left">
            <Icon id="arrow-left" className="w-6 h-6" />
          </button>
                    
          <div ref={containerRef} className="w-full pb-5 flex flex-col gap-4 overflow-x-auto scrollbar">
            {/* Перший ряд, непарні картки */}
            <div className="flex gap-5 flex-nowrap">
              {row1.length > 0 ? row1 : <p>Немає вакансій</p>}
            </div>
            {/* Другий ряд, парні картки */}
            <div className="flex gap-5 flex-nowrap">
              {row2.length > 0 ? row2 : null}
            </div>
          </div>

          <button onClick={handleScrollRight} aria-label="Scroll Right">
            <Icon id="arrow-right" className="w-6 h-6" />
          </button>
        </div>

      </div>

    </section>
  )
};

export default VacancySection;
