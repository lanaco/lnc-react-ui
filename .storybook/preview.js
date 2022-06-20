import React from 'react'
import theme, { themes } from "../src/_utils/theme";
import { ThemeProvider } from "@emotion/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={themes[1]}>
      <Story />
    </ThemeProvider>
  ),
]