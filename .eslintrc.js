module.exports = {
  extends: ["airbnb-typescript-prettier"],
  rules: {
    "no-useless-escape": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/ban-ts-ignore": "warn",
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    "import/order": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
  },
};
