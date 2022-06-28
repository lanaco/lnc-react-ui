import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React from 'react'
import { themes } from '../_utils/theme';

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

export const ThemeProvider = ({ children }) => {
  return (
    <Wrapper>
      <EmotionThemeProvider theme={themes[1]}>
        {children}
      </EmotionThemeProvider>
    </Wrapper>
  )
}
