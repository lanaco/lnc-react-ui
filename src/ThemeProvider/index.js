import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { themes } from "../_utils/theme";
import PropTypes from "prop-types";
import { getColorRgbaValue, getSizeValueWithUnits } from "../_utils/utils";
import { getDisabledBg, getDisabledColor } from "./_themeutils";
import { createGlobalStyle } from "styled-components";
import { useContext } from "react";

const GlobalStyle = createGlobalStyle`
* {
  --size-small: ${(props) => getSizeValueWithUnits(props.theme, "small")};
  --size-medium: ${(props) => getSizeValueWithUnits(props.theme, "medium")};
  --size-large: ${(props) => getSizeValueWithUnits(props.theme, "large")};
  --disabled-text: ${(props) => getDisabledColor(props.theme)};
  --disabled-bg: ${(props) => getDisabledBg(props.theme)};

  box-sizing: border-box;
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  -webkit-tap-highlight-color: transparent;

  & i {
    font-family: "Font Awesome 5 Free";
  }

  & .lnc-doc {
    & th {
      background-color: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Background",
          "default",
          "enabled",
          "background"
        )} !important;
        color: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Text",
            "default",
            "enabled",
            "text"
          )} !important;
    }
    & td {
      background-color: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Background",
          "default",
          "enabled",
          "background"
        )} !important;
        color: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Text",
            "default",
            "enabled",
            "text"
          )} !important;
    }
  }

  & .sbdocs {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Background",
        "default",
        "enabled",
        "background"
      )} !important;
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Text",
        "default",
        "enabled",
        "text"
      )} !important;
  }
}
  body {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Background",
        "default",
        "enabled",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Text", "default", "enabled", "text")};
  }
`;

const ThemeContext = React.createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return typeof theme == "string"
      ? themes?.find((item) => item.name == theme)
      : theme;
  });

  useEffect(() => {
    if (typeof theme == "string")
      setCurrentTheme(themes?.find((item) => item.name == theme));
    else setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    console.log("current", currentTheme);
  }, [currentTheme]);

  const switchTheme = (name) => {
    if (typeof theme == "string")
      setCurrentTheme(themes?.find((item) => item.name == theme));
    else setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, switchTheme: switchTheme }}
    >
      <EmotionThemeProvider theme={currentTheme}>
        <GlobalStyle theme={currentTheme} />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.defaultProps = {
  theme: "Lanaco Light",
};

ThemeProvider.propTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ThemeProvider;
