import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { themes } from "../_utils/theme";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { getSizeValueWithUnits, hexToRgba } from "../_utils/utils";
import { getDisabledBg, getDisabledColor } from "./_themeutils";

const Wrapper = styled.div`
  --size-small: ${(props) => getSizeValueWithUnits(props.theme, "small")};
  --size-medium: ${(props) => getSizeValueWithUnits(props.theme, "medium")};
  --size-large: ${(props) => getSizeValueWithUnits(props.theme, "large")};
  --disabled-text: ${props => getDisabledColor(props.theme)};
  --disabled-bg: ${props => getDisabledBg(props.theme)};

  & * {
    box-sizing: border-box;
    font-family: ${(props) => props.theme?.typography?.fontFamily};
  }
  & i {
    font-family: "Font Awesome 5 Free";
  }
`;

export const ThemeProvider = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = useState(
    themes?.find((item) => item.name == theme)
  );

  useEffect(() => {
    setCurrentTheme(themes?.find((item) => item.name == theme));
  }, [theme]);

  return (
    <Wrapper theme={currentTheme}>
      <EmotionThemeProvider theme={currentTheme}>
        {children}
      </EmotionThemeProvider>
    </Wrapper>
  );
};

ThemeProvider.defaultProps = {
  theme: "Lanaco Light",
};

ThemeProvider.propTypes = {
  theme: PropTypes.string,
};
