import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList } from "react-native";

import { View, Text, Button, Card, Colors, ActionBar } from "react-native-ui-lib";
import slugify from "slugify";
import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import ExerciseItem from "../components/ExerciseItem";
import Dialog from "../components/styled/Dialog";
import WorkoutForm, { WorkoutFormData } from "../components/WorkoutForm";
import { storeWorkout } from "../storage/workout";
import { Difficulty, Sequence, SequenceType, Workout } from "../types/data";

type PlannerScreennProps = NativeStackHeaderProps;

const PlannerScreen: React.FC<PlannerScreennProps> = ({ navigation }) => {
  const [seqItems, setSeqItems] = useState<Sequence[]>([]);
  const handleExerciseSubmit = (form: ExerciseFormData) => {
    const sequenceItem: Sequence = {
      slug: slugify(form.name + " " + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };

    if (form.reps) {
      sequenceItem.reps = Number(form.reps);
    }

    console.log(sequenceItem);
    setSeqItems([...seqItems, sequenceItem]);
  };

  const computeDiff = (exercisesCount: number, workoutDuration: number): Difficulty => {
    const intensity = workoutDuration / exercisesCount;

    if (intensity <= 60) {
      return "hard";
    } else if (intensity <= 100) {
      return "normal";
    } else {
      return "easy";
    }
  };

  const handleWorkoutSubmit = async (form: WorkoutFormData) => {
    if (seqItems.length > 0) {
      const duration = seqItems.reduce((acc, item) => {
        return acc + item.duration;
      }, 0);

      const workout: Workout = {
        name: form.name,
        slug: slugify(form.name + " " + Date.now(), { lower: true }),
        difficulty: computeDiff(seqItems.length, duration),
        sequence: [...seqItems],
        duration,
      };

      console.log(workout);
      await storeWorkout(workout);
    }
  };

  return (
    <>
      <View flex paddingH-20>
        <Card padding-20 marginT-20 marginB-20>
          <ExerciseForm onSubmit={handleExerciseSubmit} />
        </Card>
        <FlatList
          data={seqItems}
          renderItem={({ item, index }) => (
            <ExerciseItem item={item}>
              <Button
                link
                onPress={() => {
                  const items = [...seqItems];
                  items.splice(index, 1);
                  setSeqItems(items);
                }}
                label="Remove"
                textSubtitle
                textBold
              />
            </ExerciseItem>
          )}
          keyExtractor={(item) => item.slug}
        />
      </View>
      <Dialog
        height={320}
        activator={({ handleOpen }) => {
          return (
            <View>
              <ActionBar
                keepRelative
                backgroundColor={seqItems.length ? Colors.primary : Colors.backgroundPrimaryLight}
                actions={[
                  {
                    label: "Create Workout",
                    onPress: () => {
                      if (!seqItems.length) return;
                      handleOpen();
                    },
                    linkColor: Colors.black,
                    color: seqItems.length ? Colors.white : Colors.textNeutralLight,
                  },
                ]}
              />
            </View>
          );
        }}>
        {({ handleClose }) => (
          <WorkoutForm
            onSubmit={async (data) => {
              await handleWorkoutSubmit(data);
              handleClose();
              navigation.push("Root");
            }}
          />
        )}
      </Dialog>
    </>
  );
};

export default PlannerScreen;
