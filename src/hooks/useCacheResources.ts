import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { initWorkouts } from "../storage/workout";

export default (): boolean => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await initWorkouts();
        await Font.loadAsync({
          poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
          "poppins-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
      }
    }
    loadResourcesAndDataAsync();
  }, [isLoadingComplete]);

  return isLoadingComplete;
};
