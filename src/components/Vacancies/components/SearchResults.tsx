import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchQuery,
  selectVacanciesQuantity,
} from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSelector";
import { setSearchQuery } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";
import Icon from "../../Icon/Icon";
import { IconButton } from "../../buttons/IconButton/IconButton";
import { closeSearch } from "@/store/slices/searchSlice/searchSlice";

export const SearchResults: FC<{ onClear?: () => void }> = ({ onClear }) => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);

  const vacanciesQuantity = useSelector(selectVacanciesQuantity);

  const getSearchResultsText = (count: number): string => {
    if (count === 1 || (count > 20 && count % 10 === 1)) {
      return `${count} вакансія`;
    } else if (
      [2, 3, 4].includes(count) ||
      (count > 20 && [2, 3, 4].includes(count % 10))
    ) {
      return `${count} вакансії`;
    } else {
      return `${count} вакансій`;
    }
  };

  const handleClear = () => {
    dispatch(setSearchQuery(""));
    dispatch(closeSearch());
    if (onClear) onClear();
  };

  if (!query) return null;

  return (
    <div className="mt-4 flex items-center font-nunito text-xl leading-[135%] text-textBlack xl:mt-6">
      <p>
        {getSearchResultsText(vacanciesQuantity)}
        <span className="pl-4 text-textOther">{query}</span>
      </p>
      <IconButton label="Close button" variant="default" onClick={handleClear}>
        <Icon id={"close-default"} className="h-6 w-6" />
      </IconButton>
    </div>
  );
};
