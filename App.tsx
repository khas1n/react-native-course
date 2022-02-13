import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation";
import useCacheResources from "./src/hooks/useCacheResources";

import theme from "./src/theme";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default (): JSX.Element => {
  const isLoaded = useCacheResources();
  const colorScheme = "light";
  // const colorScheme = useColorScheme();

  if (isLoaded) {
    theme();
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  } else {
    return <></>;
  }
};
