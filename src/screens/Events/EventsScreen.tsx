import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
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
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { getEventListByFilter } from "../../services/event";
import { EventItem } from "../../components/EventItem";
import { EventData } from "../../interfaces/interfaces";
import { useAuth } from "../../contexts/auth";
import { Switch } from "react-native-paper";
import calculateDistance from "../../utils/calculateDistance";

export const EventsScreen = (props: any) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const [eventName, setEventName] = useState<string>();
  const [addressName, setAddressName] = useState<string>();
  const [onlyMyEvents, setOnlyMyEvents] = useState<boolean>(false);

  const { navigation } = props;
  const [events, setEvents] = useState<EventData[]>([]);
  const handleOpenNewEvent = () => {
    navigation.navigate("CreateEventScreen");
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.log("Error getting current location:", error);
    }
  };

  const calculateDistanceBetweenEventAndCurrentLocation = (
    event: EventData
  ) => {
    if (
      !location ||
      !event ||
      !event.localizacao ||
      !event.localizacao.coordinates ||
      !event.localizacao.coordinates[0] ||
      !event.localizacao.coordinates[1]
    )
      return undefined;

    let resultDistance = calculateDistance(
      location.coords.latitude,
      location.coords.longitude,
      event.localizacao.coordinates[1],
      event.localizacao.coordinates[0]
    );

    return resultDistance;
  };

  useEffect(() => {
    getCurrentLocation();
    navigation.addListener("focus", () => {
      fetchEvents();
    });
  }, []);

  const [debouncedEventName, setDebouncedEventName] = useState<string>();
  const [debouncedAddressName, setDebouncedAddressName] = useState<string>();
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
    if (text === debouncedEventName) return;
    setDebouncedEventName(text);
  };

  const handleDebounceAddressName = (text: string | undefined) => {
    if (text === debouncedAddressName) return;
    setDebouncedAddressName(text);
  };

  const handleDebounceOnlyMyEvents = (value: boolean) => {
    if (value === debouncedOnlyMyEvents) return;
    setDebouncedOnlyMyEvents(value);
  };

  const handleEvents = (events: EventData[]) => {
    return events
      ?.filter((event) => {
        return (
          event &&
          event.localizacao &&
          event.localizacao.coordinates &&
          event.localizacao.coordinates.length > 0
        );
      })
      .map((event) => {
        return {
          ...event,
          distancia: calculateDistanceBetweenEventAndCurrentLocation(event),
        };
      });
  };

  const fetchEvents = async () => {
    try {
      let data: EventData[];
      data = await getEventListByFilter(
        debouncedEventName,
        debouncedAddressName,
        debouncedOnlyMyEvents ? user?._id : null
      );
      setEvents(handleEvents(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [debouncedEventName, debouncedAddressName, debouncedOnlyMyEvents]);

  return (
    <SafeAreaView className="bg-purple-50  h-[600px]">
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
      {/* events */}
      <FlatList
        className="flex flex-grow"
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={events}
        renderItem={({ item }) => {
          return <EventItem {...item} />;
        }}
      ></FlatList>
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
