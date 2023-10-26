import { View, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { categories } from "./constants";
import { useState } from "react";

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState<number>();

    return (
        <View className="mt-4">
        <Text className="mb-3 ml-3">Categorias</Text>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="overflow-visible"
            contentContainerStyle={{
                paddingHorizontal:15
            }}
            >
                {
                    categories.map((category,index) => {
                        let isActive = category.id == activeCategory;
                        let btnClass = isActive? ' bg-purple-600 ' : ' bg-gray-200 ';
                        let textClass = isActive? ' font-semibold text-gray-800 ': ' text-gray-500 '; 
                        return (
                            <View key={index} className="flex justify-center items-center mr-6">
                                <TouchableOpacity
                                    onPress={() => setActiveCategory(category.id)}
                                    className={" flex-col justify-center  items-center p-3 rounded-full shadow bg-gray-200 " + btnClass}
                                >
                                    <Image style={{width: 40, height: 40}} 
                                        source={category.image}
                                    />
                                    <Text className={" text-sm " + textClass}>{category.name}</Text>
                                </TouchableOpacity>
                            </View>  
                        )
                    })
                }        
            </ScrollView>
        </View>
    )
}