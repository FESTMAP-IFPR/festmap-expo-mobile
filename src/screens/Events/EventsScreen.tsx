import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { getEventList, getEventListByFilter } from "../../services/event";
import { EventItem } from "../../components/EventItem";
import { EventData } from "../../interfaces/interfaces";
import { Button } from "react-native-paper";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useAuth } from "../../contexts/auth";
import { Switch } from "react-native-paper";

export const EventsScreen = (props: any) => {
  const theme = useTheme();
  const { user } = useAuth();

  const [eventName, setEventName] = useState<string>();
  const [addressName, setAddressName] = useState<string>();
  const [onlyMyEvents, setOnlyMyEvents] = useState<boolean>(false);

  const { navigation } = props;
  const [events, setEvents] = useState<EventData[]>([]);
  const handleOpenNewEvent = () => {
    navigation.navigate("CreateEventScreen");
  };

  // useEffect(() => {
  //   Alert.alert("useEffect");
  //   navigation.addListener("focus", () => {
  //     getEventList()
  //       .then((data) => setEvents(data))
  //       .catch((err) => Alert.alert(err))
  //       .finally(() => {
  //         console.log(events);
  //       });
  //     return;
  //   });
  // }, []);

  const [debouncedEventName, setDebouncedEventName] = useState<string>("");
  const [debouncedAddressName, setDebouncedAddressName] = useState<string>("");
  const [debouncedOnlyMyEvents, setDebouncedOnlyMyEvents] =
    useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleDebounceEventName(eventName);
      handleDebounceAddressName(addressName);
      handleDebounceOnlyMyEvents(onlyMyEvents);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [eventName, addressName, onlyMyEvents]);

  const handleDebounceEventName = (text: string | undefined) => {
    if (!text || text == "" || text === debouncedEventName) return;
    setDebouncedEventName(text);
  };

  const handleDebounceAddressName = (text: string | undefined) => {
    if (!text || text == "" || text === debouncedAddressName) return;
    setDebouncedAddressName(text);
  };

  const handleDebounceOnlyMyEvents = (value: boolean) => {
    if (value === debouncedOnlyMyEvents) return;
    console.log("Entrou aquiii");
    setDebouncedOnlyMyEvents(value);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let data;
        if (
          debouncedEventName ||
          debouncedAddressName ||
          debouncedOnlyMyEvents
        ) {
          data = await getEventListByFilter(
            debouncedEventName,
            debouncedAddressName,
            debouncedOnlyMyEvents ? user?._id : null
          );
        } else {
          data = await getEventList();
        }
        setEvents(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, [debouncedEventName, debouncedAddressName, debouncedOnlyMyEvents]);

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
      <View className="flex-row items-center space-x-2 px-4 pb-2 ">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-purple-300  bg-white">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Eventos"
            placeholderTextColor={"#E5ECF4"}
            className="ml-2 flex-1"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height={20} width={20} stroke={"gray"} />
            <TextInput
              value={addressName}
              placeholderTextColor={"#E5ECF4"}
              className="text-gray-600"
              placeholder="Foz Do Iguaçu, PR"
              onChangeText={(text) => setAddressName(text)}
            ></TextInput>
          </View>
        </View>
      </View>
      <View className="flex-col items-end  my-2">
        <View className="flex flex-row gap-2  items-center rounded-full p-2">
          <Text className="text-black">Somente meus eventos</Text>
          <Switch
            value={onlyMyEvents}
            onValueChange={() => setOnlyMyEvents(!onlyMyEvents)}
          />
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
