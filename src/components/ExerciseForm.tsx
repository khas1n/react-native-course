import React, { useState } from "react";
import { Card, Text, Button, View, Incubator, Colors, Keyboard, Picker } from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const { KeyboardAwareInsetsView } = Keyboard;
const { TextField } = Incubator;
import dropdown from "../../assets/icons/chevronDown.png";

export type ExerciseFormData = {
  name: string;
  duration: string;
  type: string;
  reps?: number;
};

type ExerciseFormProps = {
  onSubmit: (form: ExerciseFormData) => void;
};

const selectionItems: { label: string; value: string }[] = [
  { label: "Exercise", value: "exercise" },
  { label: "Break", value: "break" },
  { label: "Stretch", value: "stretch" },
];

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <Card padding-20>
        <Text textBold>Exercise Form</Text>
        <View paddingV-20>
          <View row>
            <View flex marginR-5>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextField marginB-20 value={value} fieldStyle={styles.withFrame} label="Name" onChangeText={onChange} />
                )}
              />
            </View>
            <View flex marginL-5>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="duration"
                render={({ field: { onChange, value } }) => (
                  <TextField marginB-20 value={value} fieldStyle={styles.withFrame} label="Duration" onChangeText={onChange} />
                )}
              />
            </View>
          </View>
          <View row>
            <View flex marginR-5>
              <Controller
                control={control}
                name="reps"
                render={({ field: { onChange, value } }) => (
                  <TextField marginB-20 value={value} fieldStyle={styles.withFrame} label="Repetitions" onChangeText={onChange} />
                )}
              />
            </View>
            <View flex marginL-5>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                name="type"
                render={({ field: { onChange, value } }) => (
                  <Picker title="Type" useNativePicker value={value} onChange={onChange} rightIconSource={dropdown}>
                    {selectionItems.map((option) => (
                      <Picker.Item key={option.value} value={option.value} label={option.label} />
                    ))}
                  </Picker>
                )}
              />
            </View>
          </View>
          <Button
            label="Submit"
            onPress={handleSubmit((data) => {
              onSubmit(data as ExerciseFormData);
            })}
            size={Button.sizes.medium}
          />
        </View>
        <KeyboardAwareInsetsView />
      </Card>
    </ScrollView>
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

export default ExerciseForm;
