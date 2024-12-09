import { FC, ReactNode} from "react";
import clsx from "clsx";
// import VacancyCard from "./VacancyCard.tsx";

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
    <section 
        className={clsx("text-textBlack")}
    >

      <div className={clsx(
          "w-fit px-3 py-[6px] text-xl font-medium rounded-tl-lg rounded-tr-lg", 
          colorSectionBG)}>
        { titleSection }
      </div>

      <div className={clsx("w-full flex justify-center p-6 border-4 border-solid rounded-[0px_12px_12px_12px]", 
          colorSectionBorder)}>
        <div className="w-[1172px] grid grid-cols-4 gap-5" >
          { children? children : <p>Немає вакансій</p> }
        </div>
      </div>


    </section>
  )
};

export default VacancySection;
