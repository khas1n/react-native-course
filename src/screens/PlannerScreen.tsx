import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, Button } from "react-native-ui-lib";
import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { Sequance, SequenceType } from "../types/data";

type PlannerScreennProps = NativeStackHeaderProps;

const PlannerScreen: React.FC<PlannerScreennProps> = ({ navigation }) => {
  const handleFormSubmit = (form: ExerciseFormData) => {
    const sequenceItem: Sequance = {
      slug: form.name + Date.now(),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };

    if (form.reps) {
      sequenceItem.reps = Number(form.reps);
    }

    console.log(sequenceItem);
  };

  return (
    <View padding-20 flex>
      <ExerciseForm onSubmit={handleFormSubmit} />
    </View>
  );
};

export default PlannerScreen;
