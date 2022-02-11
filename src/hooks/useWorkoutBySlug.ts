import { useState, useEffect } from "react";
import { getWorkoutBySlug } from "../storage/workout";
import { Workout } from "../types/data";

export const useWorkoutBySlug = (slug: Workout["slug"]) => {
  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    const getWorkoutDataBySlug = async (): Promise<void> => {
      const _workout = await getWorkoutBySlug(slug);
      setWorkout(_workout);
    };
    getWorkoutDataBySlug();
  }, [slug]);

  return workout;
};
