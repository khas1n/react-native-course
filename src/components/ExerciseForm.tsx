import React from "react";
import { Text, Button, View, Incubator, Colors, Picker } from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
const { TextField } = Incubator;

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
    <>
      <Text textBold>Exercise Form</Text>
      <ScrollView>
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
                  <Picker label="Type" title="Type" fieldStyle={styles.withFrame} value={value} onChange={onChange} migrate>
                    {selectionItems.map((option) => (
                      <Picker.Item key={option.value} value={option.value} label={option.label} />
                    ))}
                  </Picker>
                )}
              />
            </View>
          </View>
          <Button
            label="Add Exercise"
            onPress={handleSubmit((data) => {
              onSubmit(data as ExerciseFormData);
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

export default ExerciseForm;
