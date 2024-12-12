import { FC, useState } from "react";
import Icon from "../../Icon/Icon";
import { LinkButton } from "../../buttons/LinkButton/LinkButton";
import { useTranslation } from "react-i18next";
import { Button } from "../../buttons/Button/Button";

type VacancyHeaderProps = {
  isArchive: boolean;
};

const VacancyHeader: FC<VacancyHeaderProps> = ({ isArchive }) => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    console.log("form", form);
  };
  const handleButtonClick = () => {
    console.log("click");
  };

  return (
    <div className="flex w-full items-center justify-between pb-6">
      <form id="ahcnor1" className="r relative" onSubmit={handleSubmit}>
        <input
          className="flex w-[380px] items-center rounded-lg border-[1px] border-textBlack py-[10px] pl-14 text-xl leading-[135%] placeholder:text-[20px]"
          type="text"
          placeholder={t("vacanciesHeader.search")}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Icon id={"search"} className="absolute left-6 top-[14px] h-6 w-6" />
      </form>
      <div className="flex gap-8">
        <Button variant="ghost" size="small" onClick={handleButtonClick}>
          <div className="flex items-center gap-3">
            <span className="w-[92px] text-base leading-[135%]">
              {t("vacanciesHeader.sortBy")}
            </span>
            <Icon id={"arrow-down"} className="h-6 w-6" />
          </div>
        </Button>
        {!isArchive && (
          <LinkButton variant="ghost" size="small" href="/archive">
            <div className="flex items-center gap-3">
              <span className="w-[125px] text-base leading-[135%]">
                {t("vacanciesHeader.archive")}
              </span>
              <Icon id={"archive-outline"} className="h-6 w-6" />
            </div>
          </LinkButton>
        )}

        <Button variant="ghost" size="big" onClick={handleButtonClick}>
          <div className="flex items-center gap-3">
            <span className="w-[130px] text-base leading-[135%]">
              {t("vacanciesHeader.addVacancy")}
            </span>
            <Icon id={"plus"} className="h-6 w-6" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default VacancyHeader;
