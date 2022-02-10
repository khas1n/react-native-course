import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text } from "react-native-ui-lib";
import { Workout } from "../types/data";

interface WorkoutDetailScreenProps extends Omit<NativeStackHeaderProps, "route"> {
  route: {
    params: {
      item: Workout;
    };
  };
}

const WorkoutDetailScreen: React.FC<WorkoutDetailScreenProps> = ({ route }) => {
  return (
    <View>
      <Text>This is Workout Detil Screen {route.params.item.name}</Text>
    </View>
  );
};

export default WorkoutDetailScreen;
