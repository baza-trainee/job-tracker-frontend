import { forwardRef } from "react";
import { useMediaQuery } from "react-responsive";

import { cn } from "../../../../utils/utils";

import Icon from "../../../Icon/Icon";
import { DropdownMarkupProps } from "./Dropdown.props";
import { ICON } from "@/components/Icon/icons";

export const DropdownMarkup = forwardRef<HTMLDivElement, DropdownMarkupProps>(
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
      selectedSortType,
    },
    ref
  ) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const variant = location.pathname.replace(/^\/+/, "");
    // const [mainOptionsLength, setMainOptionsLength] = useState(true);
    return (
      // <div
      //   ref={ref}
      //   className={cn(
      //     "absolute z-[2] inline-block w-full rounded-xl border border-textBlack bg-backgroundMain text-left font-nunito text-base leading-[135%] text-textBlack duration-300 smOnly:text-sm",
      //     isInModal && "w-full",
      //     isDropdownOpen
      //       ? isInModal
      //         ? "z-[20] h-fit"
      //         : "h-[203px] sm:box-content smOnly:h-fit"
      //       : isInModal
      //         ? "h-[44px] hover:border-iconHover hover:bg-backgroundMain"
      //         : "h-[51px] hover:border-iconHover hover:bg-backgroundSecondary",
      //     !isInModal && openSubMenu && "smOnly:h-[145px]"
      //   )}
      // >
      //   {/* Головна кнопка */}
      //   <button
      //     id="sortButton"
      //     type="button"
      //     onClick={() =>
      //       isDropdownOpen ? handleOptionSelect("") : toggleDropdown()
      //     }
      //     onMouseEnter={() => setFocusedOption("sortButton")}
      //     className={cn(
      //       "flex w-full items-center justify-between rounded-t-xl py-2 pl-8 pr-[22px] pt-3 text-textBlack outline-none",
      //       isDropdownOpen && "hover:bg-button",
      //       focusedOption === "sortButton" && isDropdownOpen && "bg-button",
      //       isInModal ? "px-6 py-[11px] text-textBlackLight" : "smOnly:hidden",
      //       !isTypeSelected && isInModal && "text-textBlack"
      //     )}
      //   >
      //     {buttonLabel}
      //     <Icon
      //       id={"arrow-down"}
      //       className={cn(
      //         "size-6",
      //         isDropdownOpen
      //           ? "rotate-180 duration-500"
      //           : "rotate-0 duration-500"
      //       )}
      //     />
      //   </button>

      //   {/*** Випадаючий список ***/}

      //   <div
      //     className={cn(
      //       "custom-size left-0 z-20 w-full rounded-b-xl bg-backgroundMain",
      //       isInModal ? "z-[50] rounded-b-xl" : "smOnly:rounded-xl",
      //       isDropdownOpen
      //         ? isInModal
      //           ? "visible h-fit opacity-100"
      //           : "visible h-[158px] opacity-100 smOnly:h-fit"
      //         : "sr-only m-0 h-0 opacity-0"
      //     )}
      //   >
      //     <ul
      //       className={cn(
      //         "rounded-b-xl smOnly:rounded-xl",
      //         isInModal && "rounded-b-xl smOnly:rounded-b-xl"
      //       )}
      //     >
      //       {mainOptions.map((option) => (
      //         <li
      //           key={option.id}
      //           className={cn(
      //             "relative cursor-pointer py-2 pl-8 pr-[22px] last:rounded-b-xl last:pb-3",
      //             isInModal
      //               ? "pl-6 last:rounded-b-xl"
      //               : "smOnly:py-[7px] smOnly:pl-4 smOnly:first:rounded-t-xl smOnly:last:pb-[5px]",
      //             option.subOptions && "flex justify-between smOnly:py-[5px]",
      //             focusedOption === option.id && "bg-button",
      //             openSubMenu === option.id && "smOnly:last:rounded-b-none"
      //           )}
      //           onClick={() =>
      //             option.subOptions
      //               ? handleSubMenuToggle(option.id)
      //               : handleOptionSelect(option.id)
      //           }
      //           onMouseEnter={() => setFocusedOption(option.id)}
      //         >
      //           {option.label}
      //           {option.subOptions && (
      //             <Icon
      //               id={"arrow-down"}
      //               className={cn(
      //                 "h-6 w-6 rotate-[270deg]",
      //                 openSubMenu === option.id
      //                   ? "rotate-90 duration-500 sm:rotate-180"
      //                   : "rotate-[270deg] duration-500 smOnly:rotate-0"
      //               )}
      //             />
      //           )}

      //           {/***  Підсписок ***/}
      //           {option.subOptions && openSubMenu === option.id && (
      //             <ul className="absolute left-full top-0 z-20 mt-0 w-48 rounded-xl border border-textBlack bg-backgroundMain smOnly:left-[-1px] smOnly:top-full smOnly:box-content smOnly:w-full smOnly:rounded-t-none smOnly:border-t-0">
      //               {option.subOptions.map((subOption) => (
      //                 <li
      //                   key={subOption.id}
      //                   className={cn(
      //                     "cursor-pointer px-5 py-2 first:rounded-t-xl last:rounded-b-xl smOnly:pl-8 smOnly:first:rounded-t-none",
      //                     focusedOption === subOption.id && "bg-button"
      //                   )}
      //                   onClick={() => handleOptionSelect(subOption.id)}
      //                   onMouseEnter={() => setFocusedOption(subOption.id)}
      //                 >
      //                   {subOption.label}
      //                 </li>
      //               ))}
      //             </ul>
      //           )}
      //         </li>
      //       ))}
      //     </ul>
      //   </div>
      // </div>
      <div
        ref={ref}
        className={cn(
          "absolute z-[2] inline-block w-full rounded-xl border border-textBlack bg-backgroundMain text-left font-nunito text-base leading-[135%] text-textBlack duration-300 hover:text-blackColor smOnly:text-sm",
          isInModal && "w-full",
          isDropdownOpen
            ? isInModal
              ? "z-[20] h-fit"
              : variant === "notes"
                ? "h-[166px] sm:box-content smOnly:h-fit"
                : "h-[208px] sm:box-content smOnly:h-fit"
            : isInModal
              ? "h-[36px] rounded-lg hover:border-iconHover hover:bg-backgroundMain md:h-[44px]"
              : "h-[51px] hover:border-iconHover hover:bg-backgroundSecondary",
          !isInModal && openSubMenu && "smOnly:h-[145px]"
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
            "group flex w-full items-center justify-between rounded-t-xl pb-[13px] pl-8 pr-[22px] pt-3 text-textBlack hover:fill-iconHover hover:text-blackColor",
            isDropdownOpen &&
              "hover:bg-button hover:text-textBlack dark:hover:fill-textBlack",
            !isDropdownOpen && !isInModal && "rounded-xl",
            focusedOption === "sortButton" && isDropdownOpen && "bg-button",
            isInModal
              ? "px-2 py-[5px] text-textBlackLight hover:text-textBlack md:py-[10px] smOnly:text-xs"
              : "smOnly:hidden",
            !isTypeSelected && isInModal && "text-textBlack",
            mainOptions.length === 0 && "rounded-b-xl"
          )}
        >
          {buttonLabel}
          <Icon
            id={"arrow-down"}
            className={cn(
              "size-6 fill-textBlack",
              isDropdownOpen
                ? "rotate-180 duration-500"
                : isInModal
                  ? "rotate-0 duration-500 dark:group-hover:fill-textBlack"
                  : "rotate-0 duration-500 dark:group-hover:fill-textWhite"
            )}
          />
        </button>

        {/*** Випадаючий список ***/}

        <div
          className={cn(
            "custom-size left-0 z-20 w-full rounded-b-xl bg-backgroundMain text-textBlack",
            isInModal ? "z-[50] rounded-b-xl" : "smOnly:rounded-xl",
            isDropdownOpen
              ? isInModal
                ? "visible h-fit opacity-100"
                : "visible h-fit opacity-100 smOnly:h-fit"
              : "sr-only m-0 h-0 opacity-0"
          )}
        >
          <ul
            className={cn(
              "rounded-b-xl smOnly:rounded-xl",
              isInModal && "rounded-b-xl smOnly:rounded-b-xl"
            )}
          >
            {mainOptions.map((option) => (
              <li
                key={option.id}
                className={cn(
                  "relative cursor-pointer py-2 pl-8 pr-[22px] last:rounded-b-xl last:pb-3",
                  isInModal
                    ? "pl-2 last:rounded-b-xl smOnly:text-xs mdOnly:py-[11px]"
                    : "smOnly:relative smOnly:py-[7px] smOnly:pl-8 smOnly:first:rounded-t-xl smOnly:last:pb-[5px]",
                  option.subOptions && "flex justify-between smOnly:py-[5px]",
                  focusedOption === option.id && "bg-button",
                  selectedSortType === option.id &&
                    "bg-backgroundSecondary text-blackColor",
                  openSubMenu === option.id && "smOnly:last:rounded-b-none"
                )}
                onClick={() =>
                  option.subOptions
                    ? handleSubMenuToggle(option.id)
                    : handleOptionSelect(option.id)
                }
                onMouseEnter={() => setFocusedOption(option.id)}
              >
                {!isInModal && selectedSortType === option.id && (
                  <Icon
                    id={ICON.CHECK_SMALL}
                    className="absolute left-1 top-1 size-6 fill-textBlack text-iconHover md:hidden"
                  />
                )}
                {option.label}
                {option.subOptions && (
                  <Icon
                    id={"arrow-down"}
                    className={cn(
                      "h-6 w-6 rotate-[270deg] fill-textBlack hover:fill-iconHover group-hover:fill-iconHover dark:hover:fill-textBlack",
                      openSubMenu === option.id
                        ? "rotate-90 duration-500 smOnly:rotate-180"
                        : "rotate-[270deg] duration-500 smOnly:rotate-0"
                    )}
                  />
                )}

                {/***  Підсписок ***/}
                {option.subOptions && openSubMenu === option.id && (
                  <ul className="absolute left-full top-0 z-20 mt-0 w-48 rounded-xl border border-textBlack bg-backgroundMain smOnly:left-[-1px] smOnly:top-full smOnly:box-content smOnly:w-full smOnly:rounded-t-none smOnly:border-t-0">
                    {option.subOptions.map((subOption) => (
                      <li
                        key={subOption.id}
                        className={cn(
                          "cursor-pointer px-5 py-2 text-textBlack first:rounded-t-xl last:rounded-b-xl smOnly:relative smOnly:pl-12 smOnly:first:rounded-t-none",
                          focusedOption === subOption.id && "bg-button",
                          selectedSortType === subOption.id &&
                            !isMobile &&
                            "bg-backgroundSecondary text-blackColor"
                        )}
                        onClick={() => handleOptionSelect(subOption.id)}
                        onMouseEnter={() => setFocusedOption(subOption.id)}
                      >
                        {!isInModal && selectedSortType === subOption.id && (
                          <Icon
                            id={ICON.CHECK_SMALL}
                            className="absolute left-5 top-[5px] size-6 fill-textBlack text-iconHover md:hidden"
                          />
                        )}
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
