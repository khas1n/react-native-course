import React, { useState } from "react";
import { Card, Text, Button, View, Incubator, Colors, Keyboard, Picker } from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
const { KeyboardAwareInsetsView } = Keyboard;
const { TextField } = Incubator;

export type WorkoutFormData = {
  name: string;
};

type WorkoutFormProps = {
  onSubmit: (form: WorkoutFormData) => void;
};
const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  return (
    <>
      <ScrollView>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextField marginB-20 value={value} fieldStyle={styles.withFrame} label="Workout Name" onChangeText={onChange} />
            )}
          />
          <Button
            label="Create Workout"
            onPress={handleSubmit((data) => {
              onSubmit(data as WorkoutFormData);
            })}
            size={Button.sizes.medium}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.grey40,
    paddingBottom: 4,
  },
  withFrame: {
    borderWidth: 1,
    borderColor: Colors.grey40,
    padding: 4,
    borderRadius: 2,
  },
});

export default WorkoutForm;
