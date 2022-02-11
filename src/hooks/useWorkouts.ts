import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getWorkouts } from "../storage/workout";
import { Workout } from "../types/data";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isFocused = useIsFocused();
  const getWorkoutData = async (): Promise<void> => {
    const _workouts = await getWorkouts();
    setWorkouts(_workouts);
  };

  useEffect(() => {
    if (isFocused) {
      getWorkoutData();
    }
  }, [isFocused]);

  return workouts;
};
