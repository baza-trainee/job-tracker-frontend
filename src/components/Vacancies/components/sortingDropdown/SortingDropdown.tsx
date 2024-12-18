import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { setSortType } from "../../../../store/slices/vacanciesSlice/vacanciesSlice";
import { selectSortType } from "../../../../store/slices/vacanciesSlice/vacanciesSelector";

import { DropdownInfo } from "./DropdownInfo";
import { DropdowmMarkup } from "./DropdownMarkup";

const SortDropdown = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [focusedOption, setFocusedOption] = useState<string | null>(null); // Для збереження фокусу на пункті
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const selectedSortType = useSelector(selectSortType);

  const mainOptions = DropdownInfo();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      if (!prev) {
        if (selectedSortType) {
          setFocusedOption(selectedSortType);

          const parentOption = mainOptions.find((option) =>
            option.subOptions?.some((sub) => sub.id === selectedSortType)
          );
          if (parentOption) {
            setOpenSubMenu(parentOption.id);
          }
        } else {
          setFocusedOption("sortButton");
        }
      } else {
        setFocusedOption(null);
        setOpenSubMenu(null);
      }
      return !prev;
    });
  };

  const handleOptionSelect = (option: string) => {
    dispatch(setSortType(option));
    setDropdownOpen(false);
    setOpenSubMenu(null);
    setFocusedOption(null);
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

  const moveFocus = (direction: 1 | -1) => {
    const allOptions = [
      { id: "sortButton", label: "Button" },
      ...mainOptions.flatMap((opt) =>
        opt.subOptions && openSubMenu === opt.id
          ? [opt, ...opt.subOptions]
          : [opt]
      ),
    ];

    const currentIndex = allOptions.findIndex(
      (opt) => opt.id === focusedOption
    );

    const nextIndex =
      (currentIndex + direction + allOptions.length) % allOptions.length;

    setFocusedOption(allOptions[nextIndex].id);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setDropdownOpen(false);
      setOpenSubMenu(null);
      setFocusedOption(null);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(-1);
    }

    if (event.key === "Enter" && focusedOption) {
      event.preventDefault();

      if (focusedOption === "sortButton") {
        handleOptionSelect("");
        return;
      }

      const allOptions = mainOptions.flatMap((opt) =>
        opt.subOptions ? [opt, ...opt.subOptions] : [opt]
      );

      const selectedOption = allOptions.find((opt) => opt.id === focusedOption);

      if (!selectedOption) return;

      if (selectedOption.subOptions) {
        handleSubMenuToggle(selectedOption.id);
      } else {
        handleOptionSelect(selectedOption.id);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedOption, openSubMenu]);

  const getButtonLabel = () => {
    if (!selectedSortType || isDropdownOpen) return t("sortDropdown.sortBy");
    const allOptions = mainOptions.flatMap((opt) =>
      opt.subOptions ? [opt, ...opt.subOptions] : [opt]
    );
    const selectedOption = allOptions.find(
      (opt) => opt.id === selectedSortType
    );
    return selectedOption
      ? selectedOption.label === t("sortDropdown.techInterview")
        ? t("sortDropdown.techInterviewShort")
        : selectedOption.label === t("sortDropdown.testTask")
          ? t("sortDropdown.testTaskShort")
          : selectedOption.label
      : t("sortDropdown.sortBy");
  };

  return (
    <DropdowmMarkup
      ref={dropdownRef}
      isDropdownOpen={isDropdownOpen}
      handleOptionSelect={handleOptionSelect}
      toggleDropdown={toggleDropdown}
      setFocusedOption={setFocusedOption}
      focusedOption={focusedOption}
      getButtonLabel={getButtonLabel}
      mainOptions={mainOptions}
      handleSubMenuToggle={handleSubMenuToggle}
      openSubMenu={openSubMenu}
    />
  );
};

export default SortDropdown;
