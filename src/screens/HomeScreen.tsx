import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, Button } from "react-native-ui-lib";

type HomeScreenProps = NativeStackHeaderProps;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>This is home Screen</Text>
      <Button onPress={() => navigation.push("Planner")} label="go to planner page" />
    </View>
  );
};

export default HomeScreen;
