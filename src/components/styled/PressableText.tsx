import React from "react";
import { Pressable, PressableProps } from "react-native";
import { Text } from "react-native-ui-lib";

interface PressableTextProps extends PressableProps {
  text: string;
}
const PressableText: React.FC<PressableTextProps> = (props) => {
  return (
    <Pressable {...props}>
      <Text style={{ textDecorationLine: "underline" }}>{props.text}</Text>
    </Pressable>
  );
};

export { PressableText };
