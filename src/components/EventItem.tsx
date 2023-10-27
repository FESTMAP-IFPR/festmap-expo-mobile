import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { EventData } from "../interfaces/interfaces";

export function EventItem(item:EventData) {

    const navigation = useNavigation<any>();

    const goToEventDetails  = (): void => {
        navigation.navigate('EventDetailsScreen', {...item});
    }   

    let image = require("../../assets/splash.png");

    if(!item) {
        return (
            <View>

            </View>
    )
    }

    return (
    <View className=" w-full flex flex-row p-1 bg-purple-200 justify-center items-center ">
        <TouchableOpacity
            onPress={() => goToEventDetails()}
            className={" flex-1 p-2 shadow bg-white border rounded-lg border-purple-500 "}>
            <View className=" flex-row ">
                <View className="flex">
                    <Image className="w-10 h-10 rounded-full" source={image} />
                </View>
                <View className="grow pl-2">
                    <Text className="font-medium text-black">{item.nome}</Text>
                    <Text className=" text-gray-500 ">12 Aug - 15 Aug</Text>
                    {/* <Text className=" text-gray-500 ">{item.data_hora_inicio?.toLocaleDateString()} - {item.data_hora_fim?.toLocaleDateString()} </Text> */}
                    <Text className=" text-gray-500 ">{item.categoria}</Text>
                </View>
                <View>
                    <Text className="p-1 bg-gray-500 rounded-full text-white text-xs">1,8km</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
    )
}