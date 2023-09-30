import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeScreen } from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useTheme } from "react-native-paper";
import { EventsScreen } from "../screens/EventsScreen";
import { EventsStackNavigator } from "./EventsStackNavigator";

const Tab = createBottomTabNavigator();
const showBottonTabs = () => {

  const theme = useTheme();

  const focusTabColor = (focused:  boolean) => {
    return focused ? theme.colors.primary : theme.colors.secondary;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="EventsStackScreen"
        component={EventsStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                name="stream"
                size={20}
                color={focusTabColor(focused)}
              />
              <Text
                allowFontScaling={false}
                style={{
                  color: focusTabColor(focused),
                  width: 50,
                  fontSize: 11,
                  textAlign: "center",
                }}
              >
                {/* Texto Aqui */}
                Next Events
              </Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                name="map-marker-alt"
                size={20}
                color={focusTabColor(focused)}
              />
              <Text
                allowFontScaling={false}
                style={{
                  color: focusTabColor(focused),
                  width: 50,
                  fontSize: 11,
                  textAlign: "center",
                }}
              >
                {/* Texto Aqui */}
                Location
              </Text>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                name="user"
                size={20}
                color={focusTabColor(focused)}
              />
              <Text
                allowFontScaling={false}
                style={{
                  color: focusTabColor(focused),
                  width: 50,
                  fontSize: 11,
                  textAlign: "center",
                }}
              >
                {/* Texto Aqui */}
                Profile
              </Text>
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default showBottonTabs;
