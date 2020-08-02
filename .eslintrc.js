module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/typescript"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "react-hooks", "import"],
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: ["error", "always"],
    "comma-dangle": ["error", "never"],

    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "windows"],

    "import/order": ["error", { "newlines-between": "always" }],
    "import/extensions": ["error", "never"],

    "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,

    "react-hooks/rules-of-hooks": 2
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    react: {
      version: "detect"
    }
  }
};
