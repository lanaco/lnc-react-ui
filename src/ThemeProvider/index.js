import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React from 'react'
import { themes } from '../_utils/theme';
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  & * {
    box-sizing: border-box;
    font-family: "Nunito";
  }
  & i {
    font-family: "Font Awesome 5 Free";
  }
`

export const ThemeProvider = ({ theme, children }) => {
  return (
    <Wrapper>
      <EmotionThemeProvider theme={themes.find(item => item.name == theme)}>
        {children}
      </EmotionThemeProvider>
    </Wrapper>
  )
}

ThemeProvider.defaultProps = {
  theme: "Main"
};

ThemeProvider.propTypes = {
  theme: PropTypes.string,
};