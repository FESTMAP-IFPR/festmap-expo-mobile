import React, { useContext } from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import showBottonTabs from "./BottomTabs";
import { SignUpScreen } from "../screens/SignUpScreen";
import { useAuth } from "../contexts/auth";
import { ActivityIndicator, View } from "react-native";
import { AddEventScreen } from "../screens/AddEventScreen";
import { EventsStackNavigator } from "./EventsStackNavigator";

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }
  return <>{signed ? <AppNavigation /> : <AuthNavigation />}</>;
};

export default Navigation;

export const AuthNavigation = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="LoginScreen"
  >
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
  </Stack.Navigator>
);

export const AppNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AppScreens">{showBottonTabs}</Stack.Screen>
  </Stack.Navigator>
);

export const verticalAnimation = {
  gestureDirection: "vertical",
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};
