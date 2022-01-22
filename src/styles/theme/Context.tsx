import React from "react";

import {
  COLORS,
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
  ColorMode,
} from "./constants";

interface Context {
  colorMode?: ColorMode;
  setColorMode: (a: ColorMode) => void;
}
export const ThemeContext = React.createContext<Context | null>(null);
export const ThemeProvider: React.FC = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState<ColorMode>();

  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    ) as ColorMode;
    rawSetColorMode(initialColorValue);
  }, []);

  const contextValue = React.useMemo<Context>(() => {
    function setColorMode(newValue: ColorMode) {
      const root = window.document.documentElement;
      localStorage.setItem(COLOR_MODE_KEY, newValue);
      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;
        root.style.setProperty(cssVarName, colorByTheme[newValue]);
      });
      rawSetColorMode(newValue);
    }

    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeToggle: () => [ColorMode, Function] = () => {
  const { colorMode, setColorMode } = React.useContext<Context | null>(
    ThemeContext
  )!;

  function toggleColorMode(newMode?: ColorMode | boolean) {
    if (newMode === true || newMode === void 0) {
      const next = colorMode === "dark" ? "light" : "dark";
      setColorMode(next);
    } else if (newMode === false) {
      setColorMode("dark");
    } else {
      setColorMode(newMode);
    }
  }

  return [colorMode!, toggleColorMode];
};
