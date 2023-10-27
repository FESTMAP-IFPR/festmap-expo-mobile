import { DrawerContent } from "../components/DrawerContent";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { useTheme } from "react-native-paper";
import { AddEventScreen } from "../screens/AddEventScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { EventsScreen } from "../screens/Events/EventsScreen";
import { EventDetailsScreen } from "../screens/Events/EventDetailsScreen";
import CreateEventScreen from "../screens/Events/CreateEventScreen";

const Stack = createStackNavigator();

export const EventsStackNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator initialRouteName="EventsScreen" screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
      <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
      <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};