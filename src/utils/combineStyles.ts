import { StyleProp } from "react-native";

export function combineStyles<T>(...styles: Array<StyleProp<T>>) {
  let combinedStyles: Array<StyleProp<T>> = [];

  styles.forEach((style) => {
    if (style) combinedStyles = combinedStyles.concat(style);
  });

  return combinedStyles;
}
