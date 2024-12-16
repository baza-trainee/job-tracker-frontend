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

  type SortOption = {
    id: string;
    label: string;
    subOptions?: SortOption[]; // Поле `subOptions` необов'язкове
  };

  const mainOptions: SortOption[] = [
    { id: "newFirst", label: t("sortDropdown.newFirst") },
    { id: "oldFirst", label: t("sortDropdown.oldFirst") },
    {
      id: "workType",
      label: t("sortDropdown.workType"),
      subOptions: [
        { id: "office", label: t("sortDropdown.office") },
        { id: "remote", label: t("sortDropdown.remote") },
        { id: "mixed", label: t("sortDropdown.mixed") },
      ],
    },
    {
      id: "status",
      label: t("sortDropdown.status"),
      subOptions: [
        { id: "saved", label: t("sortDropdown.saved") },
        { id: "sent", label: t("sortDropdown.sent") },
        { id: "hrInterview", label: t("sortDropdown.hrInterview") },
        { id: "testTask", label: t("sortDropdown.testTask") },
        { id: "techInterview", label: t("sortDropdown.techInterview") },
        { id: "rejection", label: t("sortDropdown.rejection") },
        { id: "offer", label: t("sortDropdown.offer") },
      ],
    },
  ];

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleOptionSelect = (option: string | null) => {
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

  // const handleKeyDown = (event: KeyboardEvent) => {
  //   if (event.key === "Escape") {
  //     // Закриваємо меню по натисканню ESC
  //     setDropdownOpen(false);
  //     setOpenSubMenu(null);
  //   }

  //   if (event.key === "ArrowDown") {
  //     // Перемикання вниз
  //     event.preventDefault();
  //     moveFocus(1);
  //   }

  //   if (event.key === "ArrowUp") {
  //     // Перемикання вверх
  //     event.preventDefault();
  //     moveFocus(-1);
  //   }

  //   if (event.key === "Enter" && focusedOption) {
  //     event.preventDefault(); // Запобігаємо стандартному дії Enter
  //     const allOptions = mainOptions.flatMap((opt) =>
  //       opt.subOptions ? [opt, ...opt.subOptions] : [opt]
  //     );

  //     const selectedOption = allOptions.find((opt) => opt.id === focusedOption);

  //     if (!selectedOption) return;

  //     if (selectedOption.subOptions) {
  //       // Якщо є підменю, відкриваємо його
  //       handleSubMenuToggle(selectedOption.id);
  //     } else {
  //       // Якщо це основна опція, обираємо її
  //       handleOptionSelect(selectedOption.id);
  //     }
  //   }
  // };

  // const moveFocus = (direction: 1 | -1) => {
  //   const allOptions = mainOptions.flatMap((opt) =>
  //     opt.subOptions ? [opt, ...opt.subOptions] : [opt]
  //   );
  //   const currentIndex = allOptions.findIndex(
  //     (opt) => opt.id === focusedOption
  //   );
  //   const nextIndex =
  //     (currentIndex + direction + allOptions.length) % allOptions.length;
  //   setFocusedOption(allOptions[nextIndex].id);
  // };

  const moveFocus = (direction: 1 | -1) => {
    // Отримуємо всі елементи списку (з урахуванням відкритого сабменю)
    const allOptions = [
      { id: "sortButton", label: "Button" }, // Додаємо кнопку як перший елемент
      ...mainOptions.flatMap((opt) =>
        opt.subOptions && openSubMenu === opt.id
          ? [opt, ...opt.subOptions]
          : [opt]
      ),
    ];

    const currentIndex = allOptions.findIndex(
      (opt) => opt.id === focusedOption
    );

    // Рахуємо новий індекс з урахуванням циклічного перемикання
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
        // Якщо фокус на кнопці, то скидаємо вибір і закриваємо меню
        handleOptionSelect(null); // Скидає сортування до "Сортувати"
        return;
      }

      const allOptions = mainOptions.flatMap((opt) =>
        opt.subOptions ? [opt, ...opt.subOptions] : [opt]
      );

      const selectedOption = allOptions.find((opt) => opt.id === focusedOption);

      if (!selectedOption) return;

      if (selectedOption.subOptions) {
        // Якщо є підменю, відкриваємо/закриваємо
        handleSubMenuToggle(selectedOption.id);
      } else {
        // Якщо це основна опція, обираємо її
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

  // Динамічний текст кнопки
  const getButtonLabel = () => {
    if (!selectedSortType || isDropdownOpen) return t("sortDropdown.sortBy");
    const allOptions = mainOptions.flatMap((opt) =>
      opt.subOptions ? [opt, ...opt.subOptions] : [opt]
    );
    const selectedOption = allOptions.find(
      (opt) => opt.id === selectedSortType
    );
    return selectedOption ? selectedOption.label : t("sortDropdown.sortBy");
  };

  return (
    <div
      ref={dropdownRef}
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
          isDropdownOpen ? handleOptionSelect(null) : toggleDropdown()
        }
        onMouseEnter={() => setFocusedOption("sortButton")}
        className={cn(
          "flex w-full items-center justify-between rounded-t-xl px-4 py-2 pt-3 text-textBlack outline-none",
          isDropdownOpen && "hover:bg-button",
          focusedOption === "sortButton" && isDropdownOpen ? "bg-button" : ""
        )}
      >
        {getButtonLabel()}

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
        <div className="absolute left-0 z-10 w-full rounded-b-xl bg-backgroundMain">
          <ul className="rounded-b-xl">
            {mainOptions.map((option) => (
              <li
                key={option.id}
                className={`relative cursor-pointer ${
                  option.subOptions ? "flex justify-between" : ""
                } px-4 py-2 last:rounded-b-xl last:pb-3 hover:bg-button ${focusedOption === option.id ? "bg-button" : ""}`}
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

                {/* Підсписок */}
                {option.subOptions && openSubMenu === option.id && (
                  <ul className="absolute left-full top-0 z-20 mt-0 w-48 rounded-xl border border-textBlack bg-backgroundMain">
                    {option.subOptions.map((subOption) => (
                      <li
                        key={subOption.id}
                        className={`cursor-pointer px-4 py-2 first:rounded-t-xl last:rounded-b-xl hover:bg-button ${
                          focusedOption === subOption.id ? "bg-button" : ""
                        }`}
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
      )}
    </div>
  );
};

export default SortDropdown;
