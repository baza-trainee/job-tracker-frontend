import { FC, useState } from "react";
import Icon from "../../Icon/Icon";

const VacancyHeader: FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    console.log("form", form);
  };
  return (
    <div className="flex w-full items-center justify-center pb-6">
      {/* <h2 className="text-2xl">Vacancy filters and search</h2> */}
      <form id="ahcnor1" className="r relative" onSubmit={handleSubmit}>
        <input
          className="flex w-[380px] items-center rounded-lg border-[1px] border-textBlack py-[10px] pl-14 text-xl leading-[135%] placeholder:text-[20px]"
          type="text"
          placeholder="Пошук"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Icon id={"search"} className="absolute left-6 top-[14px] h-6 w-6" />
      </form>
    </div>
  );
};

export default VacancyHeader;
