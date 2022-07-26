import React from "react";
import { ThemeProvider } from "../src/ThemeProvider";
import { themes } from '../src/_utils/theme';
import { themes as storyBookThemes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'Lanaco Light',
    list: themes,
  },
  docs:{
    source: {
      type: "code"
    },
    // theme: storyBookThemes.dark,
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];
