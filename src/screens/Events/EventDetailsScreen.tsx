import { useRoute } from "@react-navigation/core";
import { View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EventData } from "../../interfaces/interfaces";
import { Text } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import calculateDistance from "../../utils/calculateDistance";
import { AntDesign } from "@expo/vector-icons";

export function EventDetailsScreen() {
  const [event, setEvent] = useState<EventData | null>(null);

  let image = require("../../../assets/splash.png");

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [distance, setDistance] = useState(0);

  const route = useRoute();

  useEffect(() => {
    const { params } = route;
    setEvent({ ...params });
    getCurrentLocation();
  }, []);

  useEffect(() => {
    calculateDistanceBetweenEventAndCurrentLocation();
  }, [location]);

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

  const calculateDistanceBetweenEventAndCurrentLocation = () => {
    console.log("calculating distance");
    console.log(location);
    console.log(event);
    if (
      !location ||
      !event ||
      !event.localizacao ||
      !event.localizacao.coordinates ||
      !event.localizacao.coordinates[0] ||
      !event.localizacao.coordinates[1]
    )
      return 0;

    let resultDistance = calculateDistance(
      location.coords.latitude,
      location.coords.longitude,
      event.localizacao.coordinates[0],
      event.localizacao.coordinates[1]
    );

    setDistance(resultDistance);
  };

  if (!event) return <View></View>;

  return (
    <View>
      <ScrollView className="flex flex-col h-screen">
        <View className="flex flex-col justify-between items-stretch h-screen">
          <View className="flex">
            <Image className="w-full h-72" source={image} />
          </View>
          <View className="bg-white -mt-12 text-opacity-80 pt-2 flex flex-1 flex-col justify-start rounded-t-[40] border-0 ">
            <View className=" flex flex-col justify-center items-center px-5 py-6">
              <Text
                style={{ includeFontPadding: false }}
                className="leading-none text-3xl font-semibold text-center font-erif"
              >
                {event.nome}
              </Text>
              <Text className=" text-base text-gray-500  text-gray">
                <Text className="font-bold"> por </Text>
                {`Rafael Pereira `}
              </Text>
            </View>
            <View className="flex flex-col gap-2 flex-wrap border-t border-gray-300 p-5">
              <View className="flex  flex-row  items-center gap-2">
                <AntDesign name="clockcircleo" size={32} color={"#8B5CF6"} />
                <View className="flex flex-start border-0 border-l-2 pl-2 border-l-gray-300">
                  <Text className="text-gray-500 text-lg text-left">
                    <Text className="font-bold">Inicio</Text> : 11-12-23 13:00
                  </Text>
                  <Text className="text-gray-500 text-lg text-left">
                    <Text className="font-bold">Fim</Text> : 11-12-23 13:00
                  </Text>
                </View>
              </View>
              <Text className="text-purple-900 text-xl font-semibold">
                Esporte
              </Text>
              <Text className="text-gray-500 mt-2">{event.descricao}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
