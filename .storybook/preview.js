import React from "react";
import { ThemeProvider } from "../src/ThemeProvider";
import { themes } from '../src/_utils/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs:{
    source: {
      type: "code"
    }
  },
  themes: {
    default: 'twitter',
    list: themes,
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];
