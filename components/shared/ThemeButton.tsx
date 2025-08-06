import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function ThemeButton () {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = document.documentElement.classList.contains("dark") ? "dark" : "light";
        setTheme(stored);
    }, []);

  if (!mounted) {
    return null;
  }
    return (
        <div className="component-bg-custom dark:hover:bg-gray-700 text-custom rounded-sm w-8 h-8 flex items-center justify-center text-lg">
            <FontAwesomeIcon className="" icon={theme == 'dark' ? faSun : faMoon} onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}/>   
        </div>
    )
}

export default ThemeButton;