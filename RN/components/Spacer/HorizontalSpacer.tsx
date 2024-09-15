import { StyleSheet, View } from "react-native";

export interface HorizontalSpacerProps {
  height: 4 | 8 | 16 | 24 | 32 | 64;
}

export function HorizontalSpacer({ height }: HorizontalSpacerProps) {
  let spacer;
  switch (height) {
    case 4:
      spacer = styles.spacer4;
      break;
    case 8:
      spacer = styles.spacer8;
      break;
    case 16:
      spacer = styles.spacer16;
      break;
    case 24:
      spacer = styles.spacer24;
      break;
    case 32:
      spacer = styles.spacer32;
      break;
    case 64:
      spacer = styles.spacer64;
      break;
  }
  return <View style={spacer} />;
}

const styles = StyleSheet.create({
  spacer4: {
    height: 4,
  },
  spacer8: {
    height: 8,
  },
  spacer16: {
    height: 16,
  },
  spacer24: {
    height: 24,
  },
  spacer32: {
    height: 32,
  },
  spacer64: {
    height: 64,
  },
});
