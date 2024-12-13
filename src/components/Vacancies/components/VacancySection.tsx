import { FC, ReactNode} from "react";
import clsx from "clsx";
import Icon from "../../Icon/Icon.tsx";

type VacancySectionProps = {
    titleSection: string;
    colorSectionBorder: string;
    colorSectionBG: string;
    children?: ReactNode;
  // vacancies: Vacancy[];
};

const VacancySection: FC<VacancySectionProps> = ({ 
  titleSection, 
  colorSectionBorder, 
  colorSectionBG,
  children = [], 
}) => {  

  const validChildren = Array.isArray(children) ? children : [children];

  const row1 = validChildren.filter((_, index) => index % 2 === 0);
  const row2 = validChildren.filter((_, index) => index % 2 !== 0);

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
          <Icon id="arrow-left" className="w-6 h-6" />
          {/* <div className="w-full flex gap-5 flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" > */}
          <div className="w-full flex flex-col gap-4 overflow-x-auto scrollbar">

            <div className="flex gap-5 flex-nowrap">
              {row1.length > 0 ? row1 : <p>Немає вакансій</p>}
            </div>

            {/* Другий ряд */}
            <div className="flex gap-5 flex-nowrap">
              {row2.length > 0 ? row2 : null}
            </div>
            
            {/* { children? children : <p>Немає вакансій</p> } */}
          </div>
          <Icon id="arrow-right" className="w-6 h-6" />
        </div>

      </div>

    </section>
  )
};

export default VacancySection;
