import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeScreen } from "../screens/HomeScreen";
// import Icon from "react-native-vector-icons/FontAwesome5";
// import { Text} from "react-native";
import { useTheme, Avatar} from "react-native-paper";
// import { EventsScreen } from "../screens/EventsScreen";
import { EventsStackNavigator } from "./EventsStackNavigator";
import { Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();
const showBottonTabs = () => {

  const theme = useTheme();
  // const focusTabColor = (focused:  boolean) => {
  //   return focused ? theme.colors.primary : theme.colors.secondary;
  // }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
      initialRouteName="Minha localização"
    >
      <Tab.Screen
        name="Eventos próximos"
        component={EventsStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
             <MaterialIcons name="event" size={40} color="white" />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Minha localização"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Entypo name="location-pin" size={40} color={"white"}/>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Meu perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Ionicons name="person" size={40} color="white" />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default showBottonTabs;
