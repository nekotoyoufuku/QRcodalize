import { useRef, useEffect } from "react";
import { AppState } from "react-native";

export const useAppState = ({ onAppActive }: { onAppActive: () => void }) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        onAppActive();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
};
