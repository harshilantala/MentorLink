module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((oneOfRule) => {
            if (oneOfRule.use) {
              oneOfRule.use.forEach((useRule) => {
                if (useRule.options && useRule.options.postcssOptions) {
                  useRule.options.postcssOptions.plugins = [
                    require('postcss-preset-env')(),
                    require('@tailwindcss/postcss')(), // Use @tailwindcss/postcss instead of tailwindcss
                    require('autoprefixer')(),
                  ];
                }
              });
            }
          });
        }
      });
      return webpackConfig;
    },
  },
};