module.exports = {
    root: true,
    extends: [
        "@react-native-community",
        "plugin:prettier/recommended",
        "prettier/flowtype",
        "prettier/react",
        "prettier/standard",
    ],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error",
        "func-names": ["error", "never"],
        "global-require": 0,
    },
    globals: {
        navigator: true,
        global: true,
        console: false,
    },
};
