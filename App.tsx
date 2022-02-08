import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation";

export default (): JSX.Element => {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
};
