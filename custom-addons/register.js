import React from "react";
import { addons, types } from "@storybook/addons";

import { ThemeSelector } from "./ThemeSelector";

const ADDON_ID = "smyaddon";

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: "Theme",
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <ThemeSelector />,
  });
});
