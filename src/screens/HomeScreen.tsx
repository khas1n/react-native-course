import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { View, Colors, ActionBar } from "react-native-ui-lib";

import { FlatList, Alert } from "react-native";

import data from "../../data.json";
import { Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";

type HomeScreenProps = NativeStackHeaderProps;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const onPressWorkoutItemHandler = (item: Workout): void => {
    navigation.push("WorkoutDetail", { item });
  };
  const renderWorkoutItem = ({ item }: { item: Workout }) => <WorkoutItem item={item} onPress={() => onPressWorkoutItemHandler(item)} />;

  return (
    <View backgroundColor={Colors.grey70} flex-1>
      <FlatList renderItem={renderWorkoutItem} data={data as Workout[]} keyExtractor={(item) => item.slug} />
      <View>
        <ActionBar
          backgroundColor={Colors.primary}
          actions={[{ label: "+ Add Workout", onPress: () => Alert.alert("hide"), white: true }]}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
