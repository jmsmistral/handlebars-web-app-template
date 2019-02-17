module.exports = {
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true
  },
  "extends": "airbnb",
  "rules": {
    "no-unused-vars": [1, {"argsIgnorePattern": "res|next|^err"}],
    "arrow-body-style": [2, "as-needed"],
    "no-param-reassign": [2, {"props": false}],
    "no-console": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
    }],
    "space-before-blocks": ["error", "always"],
    "comma-dangle": 0,
    "max-len": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/prefer-es6-class": 0,
    "radix": 0,
    "key-spacing": ["error", {
      "singleLine": {
        "beforeColon": false,
        "afterColon": true
      },
      "multiLine": {
        "beforeColon": true,
        "afterColon": true
      },
      "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
      }
    }]
  },
  "plugins": ["eslint-plugin-html"]
};
