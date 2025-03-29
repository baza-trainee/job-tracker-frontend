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
import { useTranslation } from "react-i18next";
import {
  selectNotesQuantity,
  selectNotesSearchQuery,
} from "@/store/slices/filteredNotesSlice/filteredNotesSelector";
import { useLocation } from "react-router-dom";
import { setNotesSearchQuery } from "@/store/slices/filteredNotesSlice/filteredNotesSlice";

export const SearchResults: FC<{ onClear?: () => void }> = ({ onClear }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const location = useLocation();

  const variant = location.pathname.replace(/^\/+/, "");

  let query;
  let vacanciesQuantity = 0;
  let clearQuery: () => void;

  switch (variant) {
    case "vacancies":
      query = useSelector(selectSearchQuery);
      vacanciesQuantity = useSelector(selectVacanciesQuantity);
      clearQuery = () => dispatch(setSearchQuery(""));

      break;
    case "archive":
      query = useSelector(selectSearchQuery);
      vacanciesQuantity = useSelector(selectVacanciesQuantity);
      clearQuery = () => dispatch(setSearchQuery(""));

      break;
    case "notes":
      query = useSelector(selectNotesSearchQuery);
      vacanciesQuantity = useSelector(selectNotesQuantity);
      clearQuery = () => dispatch(setNotesSearchQuery(""));
      break;

    default:
      console.log("default");
  }

  const getSearchResultsText = (count: number): string => {
    if (count === 1 || (count > 20 && count % 10 === 1)) {
      return `${count} ${t("vacanciesHeader.searchResult")}`;
    } else if (
      [2, 3, 4].includes(count) ||
      (count > 20 && [2, 3, 4].includes(count % 10))
    ) {
      return `${count} ${t("vacanciesHeader.searchResult234")}`;
    } else {
      return `${count} ${t("vacanciesHeader.searchResults")}`;
    }
  };

  const handleClear = () => {
    clearQuery();
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
