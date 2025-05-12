import { useEffect, useState } from "react";

export const useIsDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    // Початкове значення
    setIsDark(html.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  return isDark;
};
