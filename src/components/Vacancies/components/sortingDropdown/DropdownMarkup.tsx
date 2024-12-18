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
      getButtonLabel,
      mainOptions,
      handleSubMenuToggle,
      openSubMenu,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute -left-[248px] z-[2] inline-block w-[216px] rounded-xl border border-textBlack bg-backgroundMain text-left font-nunito text-base text-textBlack duration-300",
          isDropdownOpen
            ? "h-[210px]"
            : "h-[51px] hover:border-iconHover hover:bg-backgroundSecondary"
        )}
      >
        {/* Головна кнопка */}
        <button
          id="sortButton"
          onClick={() =>
            isDropdownOpen ? handleOptionSelect("") : toggleDropdown()
          }
          onMouseEnter={() => setFocusedOption("sortButton")}
          className={cn(
            "flex w-full items-center justify-between rounded-t-xl py-2 pl-8 pr-[22px] pt-3 text-textBlack outline-none",
            isDropdownOpen && "hover:bg-button",
            focusedOption === "sortButton" && isDropdownOpen && "bg-button"
          )}
        >
          {getButtonLabel()}
          <Icon
            id={"arrow-down"}
            className={cn(
              "h-6 w-6",
              isDropdownOpen
                ? "rotate-180 duration-500"
                : "rotate-0 duration-500"
            )}
          />
        </button>

        {/*** Випадаючий список ***/}

        <div
          className={cn(
            "custom-size absolute left-0 z-10 w-full rounded-b-xl bg-backgroundMain",
            isDropdownOpen
              ? "visible h-[162px] opacity-100"
              : "sr-only m-0 h-0 opacity-0"
          )}
        >
          <ul className="rounded-b-xl">
            {mainOptions.map((option) => (
              <li
                key={option.id}
                className={cn(
                  "relative cursor-pointer py-2 pl-8 pr-[22px] last:rounded-b-xl last:pb-3",
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
