import { containsKey, storeData, getData, removeItem } from ".";
import data from "../../data.json";
import { Workout } from "../types/data";

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getData("workout-data");
  return workouts;
};

export const initWorkouts = async (): Promise<boolean> => {
  const hasWorkouts = await containsKey("workout-data");
  if (!hasWorkouts) {
    console.log("Storing data");
    await storeData("workout-data", data);
    return true;
  }

  return false;
};

export const clearWorkouts = async () => {
  await removeItem("workout-data");
};

export const storeWorkout = async (newWorkout: Workout): Promise<boolean> => {
  const workouts = await getWorkouts();
  await storeData("workout-data", [newWorkout, ...workouts]);
  return true;
};

export const getWorkoutBySlug = async (slug: string): Promise<Workout | undefined> => {
  const workouts = await getWorkouts();
  return workouts.find((w) => w.slug === slug);
};
