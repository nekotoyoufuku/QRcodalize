// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "module-resolver"],
  rules: {
    "prettier/prettier": "error",
  },
};
