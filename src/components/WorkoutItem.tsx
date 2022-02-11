import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, View, Text, Colors } from "react-native-ui-lib";
import { Workout } from "../types/data";
import { formatSec } from "../utils/time";

interface WorkoutItemProps {
  item: Workout;
  onPress?: () => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ item, onPress }) => (
  <View backgroundColor="#fff">
    <ListItem
      // @ts-expect-error need to bypass
      activeBackgroundColor={Colors.grey60}
      activeOpacity={0.3}
      height={77.5}
      onPress={onPress}>
      <ListItem.Part middle column containerStyle={styles.itemContainer}>
        <ListItem.Part marginB-5>
          <Text textTitle textBold style={{ flex: 1, marginRight: 10 }} numberOfLines={1}>
            {item.name}
          </Text>
          <Text grey10 textSubtitle uppercase={true} style={{ marginTop: 2 }}>
            {item.difficulty}
          </Text>
        </ListItem.Part>
        <ListItem.Part>
          <Text>Duration : {formatSec(item.duration)}</Text>
        </ListItem.Part>
      </ListItem.Part>
    </ListItem>
  </View>
);

export default WorkoutItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.grey50,
    padding: 20,
  },
});
