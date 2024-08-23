module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    //"no-console": import.meta.env.PROD ? "warn" : "off",
    //"no-debugger": import.meta.env.PROD ? "warn" : "off",
    "prettier/prettier": ["error", { endOfLine: "crlf" }],
    "linebreak-style": 0,
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
