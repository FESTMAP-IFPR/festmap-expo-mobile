import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity, View, Text, Image } from "react-native";

export function EventItem(item:any) {

    const navigation = useNavigation<any>();

    const goToEventDetails  = (): void => {
        navigation.navigate('EventDetailsScreen', {...item});
    }   

    let image = require("../../assets/splash.png");

    return (
    <View className=" w-full flex flex-row  bg-white justify-center items-center">
        <TouchableOpacity
            onPress={() => goToEventDetails()}
            className={" flex-1 p-2 shadow bg-white border-t border-purple-500 "}>
            <View className=" flex-row ">
                <View className="flex">
                    <Image className="w-10 h-10 rounded-full" source={image} />
                </View>
                <View className="grow pl-2">
                    <Text className="font-medium">{item.name}</Text>
                    <Text className=" text-gray-500 ">12 Aug - 15 Aug</Text>
                    <Text className=" text-gray-500 ">{item.startDate} - {item.endDate} </Text>
                    <Text className=" text-gray-500 ">{item.location}</Text>
                </View>
                <View>
                    <Text className="p-1 bg-gray-500 rounded-full text-white text-xs">1,8km</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
    )
}