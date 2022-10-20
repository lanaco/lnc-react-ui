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
  docs:{
    source: {
      type: "code"
    },
  },
  globals: {
    themes: {}
  }
};

export const decorators = [
  (Story, context) => {
    return <ThemeProvider theme={context?.globals?.theme}>
      <Story />
    </ThemeProvider>
  },
];
