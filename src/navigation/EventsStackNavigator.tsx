import { DrawerContent } from "../components/DrawerContent";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { useTheme } from "react-native-paper";
import { AddEventScreen } from "../screens/AddEventScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { EventsScreen } from "../screens/Events/EventsScreen";
import { EventDetailsScreen } from "../screens/Events/EventDetailsScreen";
import CreateEventScreen from "../screens/Events/CreateEventScreen";
import SelectLocationScreen from "../screens/Events/SelectLocationScreen";
import { AddressData, LocationData } from "../interfaces/interfaces";

const Stack = createStackNavigator();

export type EventsStackParamList = {
  EventsScreen: undefined;
  AddEventScreen: undefined;
  CreateEventScreen?: {
    endereco?: AddressData;
    localizacao?: LocationData;
  };
  EventDetailsScreen: undefined;
  SelectLocationScreen: undefined;
};

export const EventsStackNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="EventsScreen"
      screenOptions={{ presentation: "modal" }}
    >
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="AddEventScreen" component={AddEventScreen} />
      <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
      <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
      />
    </Stack.Navigator>
  );
};
