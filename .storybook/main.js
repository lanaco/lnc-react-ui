const path = require('path');

module.exports = {
  webpackFinal: async (config, { configType }) => {
     // Remove the existing css rule
     config.module.rules = config.module.rules.filter(
      f => f.test.toString() !== '/\\.css$/'
    );

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true, // Enable modules to help you using className
        }
      }],
      include: path.resolve(__dirname, '../src'),
    });

    return config;
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-cssresources"
  ]
}