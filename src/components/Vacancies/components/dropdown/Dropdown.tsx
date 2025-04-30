import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { useAppDispatch } from "@/store/hook";

import { hideDropdown } from "@/store/slices/searchSlice/searchSlice";
import { selectDropdownShown } from "@/store/slices/searchSlice/searchSelector";

import { DropdowmMarkup } from "./DropdownMarkup";
import { SortDropdownProps } from "./Dropdown.props";

const Dropdown: FC<SortDropdownProps> = ({
  options,
  setValue,
  isInModal,
  name,
  selector,
  register,
  getValues,
}) => {
  const isDropdownShown = useSelector(selectDropdownShown);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [focusedOption, setFocusedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const dispatch = useAppDispatch();

  const mainOptions = options.mainOptions;
  const buttonOptions = options.buttonOption;

  const selectedSortType = getValues
    ? getValues(name)
    : selector && useSelector(selector);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      if (!prev) {
        if (selectedSortType) {
          const parentOption = mainOptions.find((option) =>
            option.subOptions?.some((sub) => sub.id === selectedSortType)
          );
          if (parentOption) {
            setOpenSubMenu(parentOption.id);
          } else {
            setOpenSubMenu(null);
          }
        } else {
          setFocusedOption("sortButton");
          setOpenSubMenu(null);
        }
      } else {
        setFocusedOption(null);
        setOpenSubMenu(null);
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (isDropdownShown && !isInModal) {
      toggleDropdown();
    }
  }, [isDropdownShown]);

  const handleOptionSelect = (option: string) => {
    if (!isInModal && isMobile) {
      if (setValue) {
        option === selectedSortType ? setValue("") : setValue(option);
      }
    } else {
      if (setValue) {
        name !== "" ? setValue(name, option) : setValue(option);
      }
    }
    setDropdownOpen(false);
    setFocusedOption(null);
    dispatch(hideDropdown());
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
      dispatch(hideDropdown());
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
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedOption, openSubMenu, isDropdownOpen]);

  const getButtonLabel = () => {
    if (!selectedSortType || isDropdownOpen) return options.buttonOption.label;
    const allOptions = mainOptions.flatMap((opt) =>
      opt.subOptions ? [opt, ...opt.subOptions] : [opt]
    );

    const selectedOption = allOptions.find(
      (opt) => opt.id === selectedSortType
    );

    return selectedOption
      ? selectedOption.shortLabel
        ? selectedOption.shortLabel
        : selectedOption.label
      : options.buttonOption.label;
  };

  const buttonLabel = getButtonLabel();
  const isTypeSelected = buttonLabel === buttonOptions.label;

  return (
    <>
      {register && <input type="hidden" {...register(name)} />}
      <DropdowmMarkup
        id={name}
        ref={dropdownRef}
        isDropdownOpen={isDropdownOpen}
        handleOptionSelect={handleOptionSelect}
        toggleDropdown={toggleDropdown}
        setFocusedOption={setFocusedOption}
        focusedOption={focusedOption}
        mainOptions={mainOptions}
        handleSubMenuToggle={handleSubMenuToggle}
        openSubMenu={openSubMenu}
        isInModal={isInModal}
        buttonLabel={buttonLabel}
        isTypeSelected={isTypeSelected}
        selectedSortType={selectedSortType}
      />
    </>
  );
};

export default Dropdown;
