import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import showBottonTabs from "./BottomTabs";
import { SignUpScreen } from "../screens/SignUpScreen";
import { useAuth } from "../contexts/auth";
import { ActivityIndicator, View } from "react-native";

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
  return (
    <NavigationContainer>
      {signed ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
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
