import React, { useState, useRef } from "react";

type Props = {
  focusFields: string[];
};

export function useKeyBoardNavigation({ focusFields }: Props) {
  const [focusedId, setFocusedId] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>(
    []
  );

  const handleFormKeyNavigation = (e: React.KeyboardEvent<HTMLFormElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "Tab":
        e.preventDefault();
        moveFocus(1);
        break;

      case "ArrowUp":
        e.preventDefault();
        moveFocus(-1);
        break;

      default:
        break;
    }

    function moveFocus(direction: number) {
      const currentIndex = focusFields.findIndex((id) => id === focusedId);
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < focusFields.length) {
        inputRefs.current[nextIndex]?.focus();
        setFocusedId(focusFields[nextIndex]);
      }
    }
  };

  const assignInputRef = (
    id: string,
    el: HTMLInputElement | HTMLTextAreaElement | null
  ) => {
    const index = focusFields.findIndex((itemId: string) => itemId === id);
    if (index !== -1) {
      inputRefs.current[index] = el;
    }
  };
  return { setFocusedId, handleFormKeyNavigation, assignInputRef };
}
