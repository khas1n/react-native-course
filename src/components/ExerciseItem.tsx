import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, View } from "react-native-ui-lib";
import { Sequence } from "../types/data";

export default function ExerciseItem({ item, children }: { item: Sequence; children?: ReactNode }) {
  return (
    <Card paddingH-20 paddingV-10 marginB-20>
      <Text>
        {item.name + " "}
        {item.reps ? `- ${item.reps}` : ""} - {item.duration} sec | {item.type}
      </Text>
      <View flex left>
        {children}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({});
