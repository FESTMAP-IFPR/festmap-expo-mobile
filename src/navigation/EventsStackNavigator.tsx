import { DrawerContent } from "../components/DrawerContent";
import { ProfileScreen } from "../screens/ProfileScreen";
import { useTheme } from "react-native-paper";
import { AddEventScreen } from "../screens/AddEventScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { EventsScreen } from "../screens/Events/EventsScreen";
import { EventDetailsScreen } from "../screens/Events/EventDetailsScreen";
import CreateEventScreen from "../screens/Events/CreateEventScreen";
import { AddressData, LocationData } from "../interfaces/interfaces";
import SelectLocationScreen from "../screens/Events/SelectLocationScreen";

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
      <Stack.Screen
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
      />
    </Stack.Navigator>
  );
};
