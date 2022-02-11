import { ButtonProps, TextProps, ThemeManager, Typography } from "react-native-ui-lib";
import { Animated, StyleProp, TextStyle } from "react-native";
import { combineStyles } from "./utils/combineStyles";

// Note for setting theme https://github.com/wix/react-native-ui-lib/issues/1725

const extractFontFamily = (props: any) => {
  let fontFamily = "poppins";
  if ((props as any).textBold) {
    fontFamily = "poppins-bold";
  }
  return fontFamily;
};

export default () => {
  ThemeManager.setComponentForcedTheme("Button", (props: ButtonProps): ButtonProps => {
    const fontFamily = extractFontFamily(props);
    return {
      ...props,
      labelStyle: combineStyles<TextStyle>(
        {
          fontFamily,
        },
        props.labelStyle
      ),
    };
  });

  ThemeManager.setComponentForcedTheme("Text", (props: TextProps) => {
    const fontFamily = extractFontFamily(props);
    return {
      ...props,
      style: combineStyles<StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>>({ fontFamily }, props.style),
    };
  });

  Typography.loadTypographies({
    textBold: { fontFamily: "poppins-bold" },
    textTitle: { fontSize: 16, lineHeight: 24, fontFamily: "poppins" },
    textSubtitle: { fontSize: 12, lineHeight: 16, fontFamily: "poppins" },
  });
};
