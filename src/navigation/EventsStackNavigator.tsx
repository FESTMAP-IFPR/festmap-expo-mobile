import { DrawerContent } from "../components/DrawerContent";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { useTheme } from "react-native-paper";
import { AddEventScreen } from "../screens/AddEventScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { EventsScreen } from "../screens/events/EventsScreen";
import { EventDetailsScreen } from "../screens/events/EventDetailsScreen";
import CreateEventScreen from "../screens/events/CreateEventScreen";
import { AddressData, LocationData } from "../interfaces/interfaces";
import SelectLocationScreen from "../screens/events/SelectLocationScreen";

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
      screenOptions={{ presentation: "modal", headerShown: true }}
    >
      <Stack.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{
          headerShown: false,
        }}
      />
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
