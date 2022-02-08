import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import PlannerScreen from "../screens/PlannerScreen";

const Stack = createNativeStackNavigator();

export default (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Planner" component={PlannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
