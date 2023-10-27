import { useRoute } from "@react-navigation/core";
import { View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EventData } from "../../interfaces/interfaces";
import { Text } from "react-native";

export function EventDetailsScreen() {
    const { params } = useRoute();

    let event: EventData = { ...params};

    let imageEvent = event.image ? event.image : '';

    let image = require("../../../assets/splash.png");

    if(!event)
        return (
            <View>
            </View>
    )

    return (
        <View>
            <ScrollView>
                <View className="relative">
                    <Image className="w-full h-72" source={image} />
                </View>
                <View 
                    style={{borderTopLeftRadius: 40,  borderTopRightRadius: 40}}
                    className="bg-white -mt-12 pt-6">
                    <View className="px-5">
                        <View className="flex flex-row justify-between">
                            <Text className="flex-1 text-3xl font-bold">{event.nome}</Text>
                            <View className="flex justify-end ">
                                <Text className="p-2 bg-gray-500 rounded-full text-white">1,8 km</Text>
                            </View>
                        </View>
                        <View className="flex-row itemns-center space-x-1">
                            <View className="flex-row items-center space-x-1">
                                
                            </View>
                        </View>
                        <Text className="text-purple-900 text-xl font-semibold">Esporte</Text>
                        <Text className="text-gray-500 mt-2"> 21 Aug,12:00pm  - 22 Aug, 19:00pm</Text>
                        <Text className="text-gray-500 mt-2">{event.descricao}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}