import { useRoute } from "@react-navigation/core";
import { View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EventData } from "../../interfaces/interfaces";
import { Text } from "react-native";

export function EventDetailsScreen() {
  const { params } = useRoute();

  let event: EventData = { ...params };

  let imageEvent = event.image ? event.image : "";

  let image = require("../../../assets/splash.png");

  if (!event) return <View></View>;

  return (
    <View>
      <ScrollView className="flex flex-col h-screen">
        <View className="flex flex-col justify-between items-stretch h-screen">
          <View className="flex">
            <Image className="w-full h-72" source={image} />
          </View>
          <View className="bg-white -mt-12 pt-2 flex flex-1 flex-col justify-start bottom-0 px-5 rounded-t-[40] border-0 ">
            <View className="flex flex-row justify-between">
              <Text className=" text-3xl font-bold">{event.nome}</Text>
              <View className=" ">
                <Text className="p-2 bg-gray-500 rounded-full text-white">
                  1,8 km
                </Text>
              </View>
            </View>
            <View className="flex flex-col gap-2 flex-wrap">
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
