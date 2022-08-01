import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { themes } from "../_utils/theme";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Wrapper = styled.div`
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
