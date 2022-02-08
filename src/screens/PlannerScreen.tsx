import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, Button } from "react-native-ui-lib";

type PlannerScreennProps = NativeStackHeaderProps;

const PlannerScreen: React.FC<PlannerScreennProps> = ({ navigation }) => {
  return (
    <View>
      <Text>This is Planner Screen</Text>
      <Button onPress={() => navigation.push("Home")} label="go to home page" />
    </View>
  );
};

export default PlannerScreen;
