/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    primaryButtonText: "#fff",
    linkButtonText: "#007bff",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    plusIcon: "#fff",
    plusIconBackgound: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    iconButton: "#3C3C434D",
  },
  dark: {
    text: "#ECEDEE",
    primaryButtonText: "#fff",
    linkButtonText: "#5ac8fa",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    plusIcon: "#9BA1A6",
    plusIconBackgound: "#fff",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    iconButton: "#3C3C434D",
  },
};
