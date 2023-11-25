import { useNavigation, useRoute } from "@react-navigation/core";
import { View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EventData } from "../../interfaces/interfaces";
import { Text } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import calculateDistance from "../../utils/calculateDistance";
import { AntDesign, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import * as Icon from "react-native-feather";

export function EventDetailsScreen() {
  const [event, setEvent] = useState<EventData | null>(null);
  const [settings, setSettings] = useState<boolean>(false);

  let image = require("../../../assets/splash.png");

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [distance, setDistance] = useState(0);

  const navigation = useNavigation();

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
          <View className="relative flex">
            <Image className="w-full h-72" source={image} />
            <TouchableOpacity
              className="absolute top-10 left-4 bg-white rounded-full p-2 shadow"
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon.ArrowLeft strokeWidth={3} className="text-primary" />
            </TouchableOpacity>
            <TouchableOpacity
              className="absolute top-10 right-4 bg-white rounded-full p-2 shadow"
              onPress={() => {
                setSettings(!settings);
              }}
            >
              <AntDesign name="ellipsis1" size={24} color="black" />
            </TouchableOpacity>
            {settings && (
              <>
                <TouchableOpacity
                  className="absolute top-24 right-4 bg-white rounded-full p-2 shadow"
                  onPress={() => {}}
                >
                  <Icon.Edit strokeWidth={3} className="text-primary" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="absolute top-36 right-4 bg-white rounded-full p-2 shadow"
                  onPress={() => {}}
                >
                  <Icon.X strokeWidth={3} className="text-primary" />
                </TouchableOpacity>
              </>
            )}
          </View>
          <View className="bg-white -mt-12 text-opacity-80 pt-2 flex flex-1 flex-col justify-start rounded-t-[40] border-0 ">
            <View className=" flex flex-col justify-center items-center px-5 py-6">
              <Text
                style={{ includeFontPadding: false }}
                className="leading-none text-3xl font-semibold text-center font-erif"
              >
                {event.nome}
              </Text>
              <Text className=" text-base text-slate-500 ">
                <Text className="font-bold"> por </Text>
                {`Rafael Pereira `}
              </Text>
            </View>
            <View className="w-full flex flex-col gap-2 border-t border-gray-300 p-5">
              <View className="border rounded-lg border-slate-300 p-2  flex  flex-row items-center gap-2">
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
              <View className="border rounded-lg border-slate-300 p-2  flex  flex-row  items-center gap-2">
                <SimpleLineIcons
                  name="location-pin"
                  size={32}
                  color={"#8B5CF6"}
                />
                <View className="flex flex-start border-0 border-l-2 pl-2 border-l-gray-300">
                  <Text className="text-gray-500 text-lg text-left">
                    Foz do Iguaçu
                  </Text>
                </View>
              </View>
              <View className="border rounded-lg border-slate-300 p-2  flex  flex-row items-center gap-2">
                <SimpleLineIcons
                  name="screen-smartphone"
                  size={32}
                  color={"#8B5CF6"}
                />
                <View className="flex flex-start border-0 border-l-2 pl-2 border-l-gray-300">
                  <Text className="text-gray-500 text-lg text-left">
                    45999864448
                  </Text>
                </View>
              </View>
              <Text className="text-purple-900 text-xl font-semibold">
                Detalhes do evento
              </Text>
              <Text className="text-gray-500 mt-2">
                {event.descricao}
                Texto texto texto texto texto{" "}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
