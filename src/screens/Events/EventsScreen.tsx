import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { getEventList } from "../../services/event";
import { EventItem } from "../../components/EventItem";
import { EventData } from "../../interfaces/interfaces";

export const EventsScreen = (props: any) => {
  const theme = useTheme();

  const { navigation } = props;
  const [events, setEvents] = useState<EventData[]>([]);
  const handleOpenNewEvent = () => {
    navigation.navigate("CreateEventScreen");
  };

  useEffect(() => {
    Alert.alert("useEffect");
    navigation.addListener("focus", () => {
      getEventList()
        .then((data) => setEvents(data))
        .catch((err) => Alert.alert(err))
        .finally(() => {
          console.log(events);
        });
    });
  }, []);

  return (
    <SafeAreaView className="bg-purple-50 ">
      {/* search Bar */}
      <View className="flex-row items-center justify-between space-x-2 m-2 p-2">
        <View>
          <Text className="text-2xl font-bold">Eventos</Text>
        </View>
        <View className="flex-row gap-2 p-2">
          <View className="p-3 bg-gray-300 rounded-full">
            <Icon.Sliders
              height={20}
              width={20}
              strokeWidth={2.5}
              stroke={"white"}
            />
          </View>
          <TouchableOpacity onPress={handleOpenNewEvent}>
            <View className="p-3 bg-green-500 rounded-full">
              <Icon.Plus
                height={20}
                width={20}
                strokeWidth={2.5}
                stroke={"white"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300 ">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Eventos" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height={20} width={20} stroke={"gray"} />
            <Text className="text-gray-600">Foz Do Iguaçu, PR</Text>
          </View>
        </View>
      </View>
      {/* main */}
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          {/* categories */}
          {/* <Categories/> */}
        </ScrollView>
      </View>
      <View className=" min-h-screen bg-purple-200">
        {/* events */}
        <FlatList
          className=" h-full"
          data={events}
          renderItem={({ item }) => {
            return <EventItem {...item} />;
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.primaryContainer,
    },
    containerButtons: {
      flexGrow: 1,
      alignItems: "center",
      width: "30%",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#000",
    },
  });
