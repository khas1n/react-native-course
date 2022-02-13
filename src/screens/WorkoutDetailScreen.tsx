import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button, Card } from "react-native-ui-lib";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { Sequence, Workout } from "../types/data";

import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import Dialog from "../components/styled/Dialog";
import { formatSec } from "../utils/time";
import { FontAwesome } from "@expo/vector-icons";
import WorkoutItemCard from "../components/WorkoutItemCard";
import { useCountDown } from "../hooks/useCountDown";
interface WorkoutDetailScreenProps extends Omit<NativeStackHeaderProps, "route"> {
  route: {
    params: {
      slug: Workout["slug"];
    };
  };
}

const WorkoutDetailScreen: React.FC<WorkoutDetailScreenProps> = ({ route }) => {
  const SLUG = route.params.slug;
  const workout = useWorkoutBySlug(SLUG);
  const [trackerIdx, setTrackerIdx] = useState(-1);
  const [sequence, setSequence] = useState<Sequence[]>([]);

  const { countDown, isRunning, stop, start } = useCountDown(trackerIdx);
  const startupSeq = ["3", "2", "1", "Go"].reverse();

  const addItemToSequence = (idx: number) => {
    if (workout) {
      let newSequence = [];

      if (idx > 0) {
        newSequence = [...sequence, workout.sequence[idx]];
      } else {
        newSequence = [workout.sequence[idx]];
      }
      setTrackerIdx(idx);
      setSequence(newSequence);
      start(newSequence[idx].duration + startupSeq.length);
    }
  };

  useEffect(() => {
    if (!workout) {
      return;
    }
    if (trackerIdx === workout.sequence.length - 1) {
      return;
    }
    if (countDown === 0) {
      addItemToSequence(trackerIdx + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  if (!workout) {
    return (
      <Placeholder Animation={Fade}>
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
    );
  }

  const hasReachedEnd = sequence.length === workout.sequence.length && countDown === 0;

  return (
    <View padding-20>
      <WorkoutItemCard item={workout}>
        <Dialog
          activator={({ handleOpen }) => {
            return (
              <View right marginT-20>
                <Button textBold onPress={handleOpen} link label="Check Sequance" />
              </View>
            );
          }}>
          {() => (
            <>
              {workout.sequence.map((si, idx) => (
                <View style={styles.sequanceItem} key={si.slug}>
                  <Text>
                    {si.name} | {si.type} | {formatSec(si.duration)}
                  </Text>
                  {workout.sequence.length - 1 !== idx && <FontAwesome name="arrow-down" size={20} />}
                </View>
              ))}
            </>
          )}
        </Dialog>
      </WorkoutItemCard>
      <Card marginB-15 marginT-20 padding-20>
        <View style={styles.centerUI}>
          <View flex center>
            {sequence.length === 0 ? (
              <FontAwesome name="play-circle-o" size={100} onPress={() => addItemToSequence(0)} />
            ) : isRunning ? (
              <FontAwesome name="stop-circle-o" size={100} onPress={() => stop()} />
            ) : (
              <FontAwesome
                name="play-circle-o"
                size={100}
                onPress={() => {
                  if (hasReachedEnd) {
                    addItemToSequence(0);
                  } else {
                    start(countDown);
                  }
                }}
              />
            )}
          </View>
          {trackerIdx !== -1 && (
            <View flex center>
              <Text style={{ fontSize: 65, flex: 1, alignItems: "center" }}>
                {countDown < 0
                  ? 0
                  : countDown > sequence[trackerIdx].duration
                  ? startupSeq[countDown - sequence[trackerIdx].duration - 1]
                  : countDown}
              </Text>
            </View>
          )}
        </View>
        <View center>
          <Text textBold style={{ fontSize: 56, textAlign: "center" }}>
            {sequence.length === 0 ? "Prepare" : hasReachedEnd ? "Great Job!" : sequence[trackerIdx].name}
          </Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  sequanceItem: {
    alignItems: "center",
  },
  centerUI: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default WorkoutDetailScreen;
