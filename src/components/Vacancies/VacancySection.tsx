import { FC} from "react";
import clsx from "clsx";
// import VacancyCard from "./VacancyCard";

type VacancySectionProps = {
    titleSection: string;
    colorSectionBorder: string;
    colorSectionBG: string;
  // vacancies: Vacancy[];
}

const VacancySection: FC<VacancySectionProps> = ({ titleSection, colorSectionBorder, colorSectionBG }) => {
  
    return (
    <section 
        className={clsx("text-textBlack")}
    >

      <div className={clsx("w-fit px-3 py-[6px] text-xl font-medium items-center rounded-tl-lg rounded-tr-lg", colorSectionBG)}>
        { titleSection }
      </div>

      <div className={clsx("p-6 border-4 border-solid rounded-[0px_12px_12px_12px]", colorSectionBorder)} >
        <p>Картки</p>
      </div>

    </section>
  )
}

export default VacancySection;
