import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { View, Text, Colors, Card, Constants } from "react-native-ui-lib";
import { Workout } from "../types/data";
import { formatSec } from "../utils/time";

interface WorkoutItemProps {
  item: Workout;
  children?: React.ReactNode;
  childStyles?: StyleProp<ViewStyle>;
}

const WorkoutItemCard: React.FC<WorkoutItemProps> = ({ item, children, childStyles = {} }) => (
  <Card>
    <View padding-20>
      <Text textTitle textBold color={Colors.grey10}>
        {item.name}
      </Text>
      <View row>
        <Text>Dificulty: </Text>
        <Text textBold>{item.difficulty}</Text>
      </View>

      <Text>Duration : {formatSec(item.duration)}</Text>
      {children && <View style={childStyles}>{children}</View>}
    </View>
  </Card>
);

const styles = StyleSheet.create({
  roundedDialog: {
    backgroundColor: Colors.white,
    marginBottom: Constants.isIphoneX ? 0 : 20,
    borderRadius: 12,
  },
});

export default WorkoutItemCard;
