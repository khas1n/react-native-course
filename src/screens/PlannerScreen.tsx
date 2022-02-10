import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import { View, Text, Button } from "react-native-ui-lib";

type PlannerScreennProps = NativeStackHeaderProps;

const PlannerScreen: React.FC<PlannerScreennProps> = ({ navigation }) => {
  useEffect(() => {
    console.log("Mounting Planner Page");

    return () => {
      console.log("Unmounting Planner Page");
    };
  }, []);
  return (
    <View>
      <Text>This is Planner Screen</Text>
      <Button onPress={() => navigation.navigate("Home")} label="go to home page" />
    </View>
  );
};

export default PlannerScreen;
