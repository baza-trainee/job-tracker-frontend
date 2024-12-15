import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "clsx";

import { setSortType } from "../../../store/slices/sortiSlice/sortSlice";
import { selectSortType } from "../../../store/slices/sortiSlice/sortSelector";
import { useTranslation } from "react-i18next";
import Icon from "../../Icon/Icon";

const SortDropdown = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [focusedOption, setFocusedOption] = useState<string | null>(null); // Для збереження фокусу на пункті
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const selectedSortType = useSelector(selectSortType);

  const mainOptions = [
    { id: "1", label: t("sortDropdown.newFirst") },
    { id: "2", label: t("sortDropdown.oldFirst") },
    {
      id: "3",
      label: t("sortDropdown.workType"),
      subOptions: [
        { id: "3-1", label: t("sortDropdown.office") },
        { id: "3-2", label: t("sortDropdown.remote") },
        { id: "3-3", label: t("sortDropdown.mixed") },
      ],
    },
    {
      id: "4",
      label: t("sortDropdown.status"),
      subOptions: [
        { id: "4-1", label: t("sortDropdown.saved") },
        { id: "4-2", label: t("sortDropdown.sent") },
        { id: "4-3", label: t("sortDropdown.hrInterview") },
        { id: "4-4", label: t("sortDropdown.testTask") },
        { id: "4-5", label: t("sortDropdown.techInterview") },
        { id: "4-6", label: t("sortDropdown.rejection") },
        { id: "4-7", label: t("sortDropdown.offer") },
      ],
    },
  ];

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleOptionSelect = (option: string) => {
    dispatch(setSortType(option));
    setDropdownOpen(false);
    setOpenSubMenu(null);
  };

  const handleSubMenuToggle = (menuId: string) => {
    setOpenSubMenu((prev) => (prev === menuId ? null : menuId));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
      setOpenSubMenu(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      // Закриваємо меню по натисканню ESC
      setDropdownOpen(false);
      setOpenSubMenu(null);
    }

    if (event.key === "ArrowDown") {
      // Перемикання вниз
      event.preventDefault();
      moveFocus(1);
    }

    if (event.key === "ArrowUp") {
      // Перемикання вверх
      event.preventDefault();
      moveFocus(-1);
    }

    if (event.key === "Enter" && focusedOption) {
      // Вибір пункту за Enter
      const focusedMainOption = mainOptions.find(
        (opt) => opt.id === focusedOption
      );
      if (focusedMainOption?.subOptions) {
        handleSubMenuToggle(focusedOption);
      } else {
        handleOptionSelect(focusedMainOption?.label || "");
      }
    }
  };

  const moveFocus = (direction: 1 | -1) => {
    const allOptions = mainOptions.flatMap((opt) =>
      opt.subOptions ? [opt, ...opt.subOptions] : [opt]
    );
    const currentIndex = allOptions.findIndex(
      (opt) => opt.id === focusedOption
    );
    const nextIndex =
      (currentIndex + direction + allOptions.length) % allOptions.length;
    setFocusedOption(allOptions[nextIndex].id);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedOption]);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "relative inline-block w-[216px] rounded-xl border border-textBlack text-left font-nunito text-base text-textBlack",
        isDropdownOpen ? "h-[210px]" : "h-[51px]"
      )}
    >
      {/* Головна кнопка */}
      <button
        onClick={toggleDropdown}
        className={cn(
          "flex w-full items-center justify-between px-4 pb-2 pt-3 text-textBlack"
        )}
      >
        {selectedSortType
          ? isDropdownOpen
            ? t("sortDropdown.sortBy")
            : selectedSortType
          : t("sortDropdown.sortBy")}

        <Icon
          id={"arrow-down"}
          className={cn(
            "h-6 w-6",
            isDropdownOpen ? "rotate-180 duration-500" : "rotate-0 duration-500"
          )}
        />
      </button>

      {/* Випадаючий список */}
      {isDropdownOpen && (
        <div className="absolute left-0 z-10 w-full bg-backgroundMain">
          <ul className="pb-1">
            {mainOptions.map((option) => (
              <li
                key={option.id}
                className={`relative ${
                  focusedOption === option.id ? "bg-gray-100" : ""
                }`}
              >
                <div
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    option.subOptions ? "flex justify-between" : ""
                  }`}
                  onClick={() =>
                    option.subOptions
                      ? handleSubMenuToggle(option.id)
                      : handleOptionSelect(option.label)
                  }
                  onMouseEnter={() => setFocusedOption(option.id)}
                >
                  {option.label}
                  {option.subOptions && (
                    <Icon
                      id={"arrow-down"}
                      className={cn(
                        "h-6 w-6",
                        openSubMenu === option.id
                          ? "rotate-180 duration-500"
                          : "rotate-0 duration-500"
                      )}
                    />
                  )}
                </div>

                {/* Підсписок */}
                {option.subOptions && openSubMenu === option.id && (
                  <ul className="absolute left-full top-0 z-20 mt-0 w-48 rounded border border-gray-300 bg-white shadow-lg">
                    {option.subOptions.map((subOption) => (
                      <li
                        key={subOption.id}
                        className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                          focusedOption === subOption.id ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleOptionSelect(subOption.label)}
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
      )}
    </div>
  );
};

export default SortDropdown;
