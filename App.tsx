import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation";
import useCacheResources from "./src/hooks/useCacheResources";

import theme from "./src/theme";

export default (): JSX.Element => {
  const isLoaded = useCacheResources();
  if (isLoaded) {
    theme();
    return (
      <>
        <Navigation />
        <StatusBar style="auto" />
      </>
    );
  } else {
    return <></>;
  }
};
