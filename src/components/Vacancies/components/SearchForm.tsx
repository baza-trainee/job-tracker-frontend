import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { selectSearchQuery } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSelector";
import { setSearchQuery } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";
import { closeSearch } from "@/store/slices/searchSlice/searchSlice";
import { selectNotesSearchQuery } from "@/store/slices/filteredNotesSlice/filteredNotesSelector";
import { setNotesSearchQuery } from "@/store/slices/filteredNotesSlice/filteredNotesSlice";
import { cn } from "../../../utils/utils";

import Icon from "../../Icon/Icon";
import { SearchResults } from "./SearchResults";

const SearchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});

type SearchFormData = z.infer<typeof SearchSchema>;

export const SearchForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDesctop = useMediaQuery({ minWidth: 1280 });

  const [isSearching, setIsSearching] = useState(false);

  let action: (arg0: string) => any;
  let selector = selectSearchQuery;

  const location = useLocation();

  const variant = location.pathname.replace(/^\/+/, "");

  switch (variant) {
    case "vacancies":
      selector = selectSearchQuery;
      action = (query: string) => setSearchQuery(query);

      break;
    case "archive":
      selector = selectSearchQuery;
      action = (query: string) => setSearchQuery(query);

      break;
    case "notes":
      selector = selectNotesSearchQuery;
      action = (query: string) => setNotesSearchQuery(query);
      break;

    default:
      break;
  }

  const queryFromRedux = useSelector(selector);

  const {
    register,
    resetField,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(SearchSchema),
    mode: "onSubmit",
  });

  const handleSearch = (query: string) => {
    dispatch(action(query));
  };

  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    try {
      setIsSearching(true);
      const trimmedQuery = data.query.trim();
      if (trimmedQuery && trimmedQuery !== queryFromRedux) {
        handleSearch(trimmedQuery);
      }
      setIsSearching(false);
    } catch (error) {
      console.error("Search error:", error);
      setIsSearching(false);
      setFocus("query", { shouldSelect: false });
    }
  };

  const handleClear = () => {
    if (queryFromRedux) {
      handleSearch("");
    }
    resetField("query");
    if (!isDesctop) {
      dispatch(closeSearch());
    }
  };
  const error = errors["query"];

  return (
    <div className="w-full">
      <form
        className="relative flex w-full items-center font-nunito text-xl leading-[135%] text-textBlack hover:fill-iconHover active:fill-textBlack"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-full">
          <div className="relative flex items-center sm:w-full md:w-[280px] xl:w-[355px] 2xl:w-[380px] 3xl:w-[516px]">
            <input
              id={`input-query`}
              className={cn(
                "h-[41px] w-full rounded-lg border border-textBlack py-[10px] pl-[58px] pr-2 font-nunito text-xl font-medium text-textBlack transition placeholder:font-nunito placeholder:text-base placeholder:text-textBlackLight placeholder-shown:border-textBlack hover:border-iconHover hover:placeholder:text-iconHover focus:outline-none focus:placeholder:text-iconHover active:border-textBlack xl:h-[51px] xl:rounded-xl",

                error &&
                  "border-color2 placeholder-shown:border-color2 focus:border-color2 active:border-color2"
              )}
              placeholder={t("vacanciesHeader.search")}
              type={"text"}
              {...register("query")}
              aria-describedby={`inputError-query`}
            />
            {error && (
              <button
                onClick={() => handleClear()}
                type="button"
                className={
                  "absolute right-2 top-[50%] z-30 mt-auto h-6 translate-y-[-50%] cursor-pointer"
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  type="butt"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icons/cancel_24px">
                    <path
                      id="icon"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 10.59L15.59 7L17 8.41L13.41 12L17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59Z"
                      fill="#FC8972"
                    />
                  </g>
                </svg>
              </button>
            )}
          </div>
          {error && (
            <span
              id={`inputError-query`}
              className="absolute left-0 top-[38px] inline-block font-nunito text-base font-medium text-color2 md:top-10 xl:top-[46px]"
            >
              {t(String(error?.message))}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="absolute left-6"
          disabled={isSearching}
        >
          <Icon id={"search"} className="size-6" />
        </button>
      </form>
      {isDesctop && <SearchResults onClear={() => resetField("query")} />}
    </div>
  );
};
