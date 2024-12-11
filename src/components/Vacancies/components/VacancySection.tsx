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
  children, 
}) => {  
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
          <div className="w-full flex gap-5 flex-wrap overflow-x-auto max-h-56" >
            { children? children : <p>Немає вакансій</p> }
          </div>
          <Icon id="arrow-right" className="w-6 h-6" />
        </div>
      </div>

    </section>
  )
};

export default VacancySection;
