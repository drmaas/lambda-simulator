module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    node: true,
    es6: true,
    "jest/globals": true,
    jest: true,
  },
  plugins: ["inclusive-language"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:security/recommended",
    "plugin:jest/recommended",
  ],
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.eslint.json",
      },
      plugins: ["inclusive-language"],
      extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:prettier/recommended",
        "plugin:jest/recommended",
      ],
    },
  ],
};
