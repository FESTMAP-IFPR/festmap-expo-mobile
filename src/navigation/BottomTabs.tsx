import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeScreen } from "../screens/HomeScreen";
// import Icon from "react-native-vector-icons/FontAwesome5";
// import { Text} from "react-native";
import { ManageEventsScreen } from "../screens/admin/EventManagement"
import { UserManagementScreen } from "../screens/admin/UserManagement";
import { useAuth } from "../contexts/auth";
import { useTheme, Avatar} from "react-native-paper";
// import { EventsScreen } from "../screens/EventsScreen";
import { EventsStackNavigator } from "./EventsStackNavigator";
import { Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();
const showBottonTabs = () => {

  const { signOut, user } = useAuth();

  const theme = useTheme();
  // const focusTabColor = (focused:  boolean) => {
  //   return focused ? theme.colors.secondary : theme.colors.secondary;
  // }
  return user?.isAdmin ? (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName="Minha Localização"
    >
      <Tab.Screen
          name="Gerenciamento de Usuários"
          component={UserManagementScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <>
              <MaterialIcons name="groups" size={40} color="white" />
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Gerenciamento de Eventos"
          component={ManageEventsScreen}
          options={{

            tabBarIcon: ({ focused }) => (
              <>
                <Entypo name="calendar" size={40} color={"white"}/>
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
    ) : (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#c3bef7",
        },
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
             <MaterialIcons name="event" size={40} color="#151515" />
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
              <Entypo name="location-pin" size={40} color={"#151515"}/>
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
              <Ionicons name="person" size={40} color="#151515" />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default showBottonTabs;
