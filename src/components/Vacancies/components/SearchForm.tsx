import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { cn } from "../../../utils/utils";
import { selectSearchQuery } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSelector";
import { setSearchQuery } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice";
import { selectVacanciesQuantity } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSelector";

import Icon from "../../Icon/Icon";
import { IconButton } from "../../buttons/IconButton/IconButton";

const SearchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});

type SearchFormData = z.infer<typeof SearchSchema>;

export const SearchForm: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isSearching, setIsSearching] = useState(false);

  const queryFromRedux = useSelector(selectSearchQuery);
  const vacanciesQuantity = useSelector(selectVacanciesQuantity);

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
    dispatch(setSearchQuery(query));
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
  };
  const error = errors["query"];

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

  return (
    <div>
      <form
        className="relative flex items-center font-nunito text-xl leading-[135%] text-textBlack hover:fill-iconHover active:fill-textBlack"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <Input
          register={register}
          resetField={resetField}
          name="query"
          placeholder={t("vacanciesHeader.search")}
          type="text"
          className="flex-grow"
          errors={errors}
        /> */}
        <div className="relative">
          <div className={"relative flex w-full items-center"}>
            <input
              id={`input-query`}
              className={cn(
                "h-[51px] w-full rounded-xl border border-textBlack py-[10px] pl-[58px] pr-2 font-nunito text-xl font-medium text-textBlack transition placeholder:font-nunito placeholder:text-base placeholder:text-textBlackLight placeholder-shown:border-textBlack hover:border-iconHover hover:placeholder:text-iconHover focus:outline-none focus:placeholder:text-iconHover active:border-textBlack",

                // !error && "border-color5",
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
                  "absolute right-2 top-[50%] mt-auto h-6 translate-y-[-50%] cursor-pointer"
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
              className="absolute left-0 top-[46px] inline-block font-nunito text-base font-medium text-color2"
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
          <Icon id={"search"} className="h-6 w-6" />
        </button>
      </form>

      {queryFromRedux && (
        <div className="mt-6 flex items-center font-nunito text-xl leading-[135%] text-textBlack">
          <p>
            {getSearchResultsText(vacanciesQuantity)}
            <span className="pl-4 text-textOther">{queryFromRedux}</span>
          </p>
          <IconButton
            label="Close button"
            variant="default"
            onClick={handleClear}
          >
            <Icon id={"close-default"} className="h-6 w-6" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
