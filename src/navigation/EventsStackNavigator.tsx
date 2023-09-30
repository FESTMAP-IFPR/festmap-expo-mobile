import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { EventsScreen } from "../screens/EventsScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { useTheme } from "react-native-paper";
import { AddEventScreen } from "../screens/AddEventScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const EventsStackNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator initialRouteName="EventsScreen" screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
    </Stack.Navigator>
  );
};
