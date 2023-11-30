import { useTheme } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { EventDetailsScreen } from "../screens/events/EventDetailsScreen";

import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ presentation: "modal", headerShown: true }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
