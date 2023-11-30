import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, List, Text } from "react-native-paper";

import { TextInput } from "react-native-paper";
import { findAddressSearch } from "../../services/findAndressSugestiton";
import { AddressData, LocationData } from "../../interfaces/interfaces";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { convertAddressText } from "../../utils/convertAddressText";
import { debounce } from "lodash";

export interface AndressLocationData {
  endereco?: AddressData;
  localizacao?: LocationData;
}

export default function SelectLocationScreen() {
  const [suggestionLocation, setSuggestionLocation] = useState("");
  const [locationList, setLocationList] = useState<AndressLocationData[]>([]);
  const navigation = useNavigation<any>();

  const onChangeSuggestion = (text: any) => {
    if (!text || text.length < 8) return;
    findAddressSearch(text).then((response) => {
      if (!response || !response.features) return;
      const locations = response.features.map((location: any) => {
        return trasnformLocationSearchInLocationData(location);
      });

      setLocationList(locations);
    });
  };

  const debounceOnChangeSuggestion = debounce((text) => {
    onChangeSuggestion(text);
  }, 500);

  const trasnformLocationSearchInLocationData = (location: {
    address?: string;
    text?: string;
    context: any[];
    "": any;
    properties: { housenumber: any };
    geometry: { coordinates: any };
  }) => {
    return {
      endereco: {
        pais:
          location.context.find(
            (context: any) => context.id.split(".")[0] == "country"
          ).text ?? "",
        estado: location.context.find(
          (context: any) => context.id.split(".")[0] == "region"
        )?.text,
        cidade:
          location.context.find(
            (context: any) => context.id.split(".")[0] == "place"
          )?.text ?? "",
        bairro:
          location.context.find(
            (context: any) => context.id.split(".")[0] == "neighbourhood"
          )?.text ?? "",
        rua: location.text,
        numero: location.address ?? location.properties.housenumber ?? "",
        cep:
          location.context.find(
            (context: any) => context.id.split(".")[0] == "postcode"
          )?.text ?? "",
      },
      localizacao: {
        type: "Point",
        coordinates: location.geometry.coordinates,
      },
    };
  };

  const onSelectedAddress = (item: AndressLocationData) => {
    // go to CreateEventScreen
    navigation.navigate("CreateEventScreen", {
      endereco: item.endereco,
      localizacao: item.localizacao,
    });
  };

  return (
    <SafeAreaView>
      <View className="mt-10 flex flex-col gap-2 p-4 bg-gray-100 justify-start h-full">
        <Text> Localização </Text>
        <TextInput
          mode="outlined"
          label="Buscar endereço e numero"
          placeholderTextColor={"#E5ECF4"}
          value={suggestionLocation}
          onChangeText={(text) => {
            setSuggestionLocation(text);
            debounceOnChangeSuggestion(text);
          }}
        />
        <ScrollView className="flex-1">
          <FlatList
            data={locationList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => onSelectedAddress(item)}>
                  <View className="flex flex-row justify-start space-x-5 items-center border border-purple-400 m-2 p-4 rounded bg-white">
                    <MaterialIcons name="my-location" size={24} color="black" />
                    <View className="flex flex-col justify-start px-3">
                      <Text className="flex flex-wrap flex-shrink">
                        {convertAddressText(item?.endereco)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>

        <View className="flex flex-col items-center gap-2 justify-between space-x-2s">
          <Text className="text-black">ou</Text>
          <Button mode="contained" className="rounded" onPress={() => {}}>
            Buscar pelo mapa
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
