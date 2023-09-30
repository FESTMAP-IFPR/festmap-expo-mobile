
import * as React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/auth";
import Navigation from "./src/navigation/Navigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#8A44FF",
    primaryContainer: "#1F1F1F",
    secondary: "#C3BEF7",
    accent: "#8A44FF",
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#8A44FF",
    primaryContainer: "#1F1F1F",
    secondary: "#C3BEF7",
    accent: "#8A44FF",
    blackCustom: "#151515",
  },
}

export default function App() {
  return (
    <PaperProvider theme={darkTheme}>
      <AuthProvider>
       <NavigationContainer theme={darkTheme}>
        <Navigation />
      </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
