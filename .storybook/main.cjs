const path = require("path");

module.exports = {
  webpackFinal: async (config, { configType }) => {
    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== "/\\.css$/"
    );

    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
      exclude: /\.module\.css$/,
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ],
      include: /\.module\.css$/,
    });

    return config;
  },

  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-cssresources",
    "@storybook/addon-docs",

    //useless addon doesen't change context gobals on switch
    // 'storybook-addon-themes',
    "storybook-dark-mode",
    "../custom-addons/register.js", //addon for themes
  ],
};
