import { forwardRef } from "react";
import { cn } from "../../../../utils/utils";
import Icon from "../../../Icon/Icon";
import { DropdownMarkupProps } from "./Dropdown.props";

export const DropdowmMarkup = forwardRef<HTMLDivElement, DropdownMarkupProps>(
  (
    {
      isDropdownOpen,
      handleOptionSelect,
      toggleDropdown,
      setFocusedOption,
      focusedOption,
      mainOptions,
      handleSubMenuToggle,
      openSubMenu,
      isInModal,
      buttonLabel,
      isTypeSelected,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-[2] inline-block w-full rounded-xl border border-textBlack bg-backgroundMain text-left font-nunito text-base leading-[135%] text-textBlack duration-300",
          isInModal && "w-full",
          isDropdownOpen
            ? isInModal
              ? "z-[20] h-fit"
              : "h-[205px]"
            : isInModal
              ? "h-[44px] hover:border-iconHover hover:bg-backgroundMain"
              : "h-[51px] hover:border-iconHover hover:bg-backgroundSecondary"
        )}
      >
        {/* Головна кнопка */}
        <button
          id="sortButton"
          type="button"
          onClick={() =>
            isDropdownOpen ? handleOptionSelect("") : toggleDropdown()
          }
          onMouseEnter={() => setFocusedOption("sortButton")}
          className={cn(
            "flex w-full items-center justify-between rounded-t-xl py-2 pl-8 pr-[22px] pt-3 text-textBlack outline-none",
            isDropdownOpen && "hover:bg-button",
            focusedOption === "sortButton" && isDropdownOpen && "bg-button",
            isInModal && "px-6 py-[11px] text-textBlackLight",
            !isTypeSelected && isInModal && "text-textBlack"
          )}
        >
          {buttonLabel}
          <Icon
            id={"arrow-down"}
            className={cn(
              "size-6",
              isDropdownOpen
                ? "rotate-180 duration-500"
                : "rotate-0 duration-500"
            )}
          />
        </button>

        {/*** Випадаючий список ***/}

        <div
          className={cn(
            "custom-size left-0 z-20 w-full rounded-b-xl bg-backgroundMain",
            isInModal && "z-[50] rounded-b-xl",
            isDropdownOpen
              ? isInModal
                ? "visible h-fit opacity-100"
                : "visible h-[158px] opacity-100"
              : "sr-only m-0 h-0 opacity-0"
          )}
        >
          <ul className={cn("rounded-b-xl", isInModal && "rounded-b-xl")}>
            {mainOptions.map((option) => (
              <li
                key={option.id}
                className={cn(
                  "relative cursor-pointer py-2 pl-8 pr-[22px] last:rounded-b-xl last:pb-3",
                  isInModal && "pl-6 last:rounded-b-xl",
                  option.subOptions && "flex justify-between",
                  focusedOption === option.id && "bg-button"
                )}
                onClick={() =>
                  option.subOptions
                    ? handleSubMenuToggle(option.id)
                    : handleOptionSelect(option.id)
                }
                onMouseEnter={() => setFocusedOption(option.id)}
              >
                {option.label}
                {option.subOptions && (
                  <Icon
                    id={"arrow-down"}
                    className={cn(
                      "h-6 w-6 rotate-[270deg]",
                      openSubMenu === option.id
                        ? "rotate-90 duration-500"
                        : "rotate-[270deg] duration-500"
                    )}
                  />
                )}

                {/***  Підсписок ***/}
                {option.subOptions && openSubMenu === option.id && (
                  <ul className="absolute left-full top-0 z-20 mt-0 w-48 rounded-xl border border-textBlack bg-backgroundMain">
                    {option.subOptions.map((subOption) => (
                      <li
                        key={subOption.id}
                        className={cn(
                          "cursor-pointer px-5 py-2 first:rounded-t-xl last:rounded-b-xl",
                          focusedOption === subOption.id && "bg-button"
                        )}
                        onClick={() => handleOptionSelect(subOption.id)}
                        onMouseEnter={() => setFocusedOption(subOption.id)}
                      >
                        {subOption.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);
