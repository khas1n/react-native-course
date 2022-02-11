import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { View, Colors, ActionBar } from "react-native-ui-lib";

import { FlatList, Alert } from "react-native";

import { Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkouts } from "../hooks/useWorkouts";

type HomeScreenProps = NativeStackHeaderProps;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const workouts = useWorkouts();

  const onPressWorkoutItemHandler = (item: Workout): void => {
    navigation.push("WorkoutDetail", { slug: item.slug });
  };

  const renderWorkoutItem = ({ item }: { item: Workout }) => <WorkoutItem item={item} onPress={() => onPressWorkoutItemHandler(item)} />;

  return (
    <View backgroundColor={Colors.grey70} flex-1>
      <FlatList renderItem={renderWorkoutItem} data={workouts} keyExtractor={(item) => item.slug} />
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
